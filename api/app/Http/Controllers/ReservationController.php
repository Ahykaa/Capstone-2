<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Models\Reservation;
use App\Models\ReservationEntry;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->perPage ?? 20;
        $keyword = $request->keyword;

        $reservations = Reservation::query()
            ->when($keyword != 'null', function ($q) use ($keyword) {
                return $q->where('representative', 'LIKE', "%{$keyword}%")
                    ->orWhere('facilities', 'LIKE', "%{$keyword}%");
            })
            ->orderByRaw("ABS(DATEDIFF(event_date, '" . Carbon::now() . "'))")
            ->paginate($perPage);

        return response()->json(['reservations' => $reservations]);
    }

    public function store(StoreReservationRequest $request)
    {
        $user = Auth::user();

        $validatedData = $request->validated();

        // Add any other necessary modifications to the validated data

        // Separate the entries from the main reservation data
        $entries = $validatedData['entries'];
        unset($validatedData['entries']); // Remove entries from the main reservation data

        // Calculate the total amount using array_reduce
        $totalAmount = array_reduce($entries, function ($carry, $entry) {
            return $carry + $entry['amount'];
        }, 0);

        // Add the calculated total amount to the validated data
        $validatedData['total_amount'] = $totalAmount;

        // Create the reservation
        $reservation = Reservation::create($validatedData);

        // Create reservation entries
        foreach ($entries as $entryData) {
            // Assuming you have a ReservationEntry model similar to OrderEntry
            $reservationEntry = new ReservationEntry([
                'quantity' => $entryData['quantity'],
                'particulars' => $entryData['particulars'],
                'rate' => $entryData['rate'],
                'amount' => $entryData['amount'],
                // Add other fields as necessary
            ]);

            $reservation->reservationEntries()->save($reservationEntry); // Associate the reservation entry with the reservation
        }

        return response()->json(['reservation' => $reservation]);
    }

    public function show($id)
    {
        $reservation = Reservation::with('reservationEntries')->findOrFail($id);
        return response()->json(['reservation' => $reservation]);
    }
}
