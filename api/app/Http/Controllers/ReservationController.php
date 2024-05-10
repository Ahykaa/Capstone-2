<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Models\Reservation;
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
            ->orderBy('event_date', 'DESC')
            ->paginate($perPage);

        return response()->json(['reservations' => $reservations]);
    }

    public function store(StoreReservationRequest $request)
    {

        $validatedData = $request->validated();
        $reservation = Reservation::create($validatedData);
        return response()->json($reservation, 201);
    }
}
