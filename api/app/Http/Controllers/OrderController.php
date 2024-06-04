<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\OrderEntry;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $perPage = $request->perPage ?? 20;
        $keyword = $request->keyword;
        $status = $request->status;

        $orders = Order::with('department', 'status')
            ->when(in_array($user->role, ['admin', 'staff']), function ($q) use ($user) {
                return $q->where('department_id', $user->department_id);
            })
            ->when($keyword && $keyword != 'null', function ($q) use ($keyword) {
                return $q->whereHas('department', function ($query) use ($keyword) {
                    $query->where('label', 'LIKE', "%{$keyword}%");
                });
            })
            ->when($status, function ($q) use ($status) {
                return $q->where('status_id', $status);
            })
            ->orderBy('date_needed', 'ASC')
            ->paginate($perPage);

        return response()->json(['orders' => $orders]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $user = Auth::user();

        $validatedData = $request->validated();
        $validatedData['user_id'] = Auth::id();
        $validatedData['from'] = $user->name;
        $validatedData['department_id'] = $user->department_id;

        // Separate the entries from the main order data
        $entries = $validatedData['entries'];
        unset($validatedData['entries']); // Remove entries from the main order data

        // Calculate the total amount
        $totalAmount = array_reduce($entries, function ($carry, $entry) {
            return $carry + $entry['amount'];
        }, 0);

        // Add the calculated total amount to the validated data
        $validatedData['total_amount'] = $totalAmount;

        // Create the order
        $order = Order::create($validatedData);

        // Create order entries
        foreach ($entries as $entryData) {
            $remarks = $entryData['remarks'] ?? null; // Get the remarks if present, otherwise set it to null

            $orderEntry = new OrderEntry([
                'quantity' => $entryData['quantity'],
                'unit_id' => $entryData['unit_id'],
                'description' => $entryData['description'],
                'uniCost' => $entryData['uniCost'],
                'amount' => $entryData['amount'],
                'remarks' => $remarks, // Use the remarks obtained above
            ]);

            $order->orderEntries()->save($orderEntry); // Associate the order entry with the order
        }

        return response()->json(['order' => $order]);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with('department', 'unit', 'status', 'requestFor', 'orderEntries')->findOrFail($id);
        return response()->json(['order' => $order]);
    }




    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);

        // Check user role and set status accordingly
        if (auth()->user()->role === 'headadmin') {
            $order->status_id = 9; // Approved
        } elseif (auth()->user()->role === 'admin') {
            $order->status_id = 2; // Approved for Checking
        } elseif (auth()->user()->role === 'subadmin1') {
            $order->status_id = 3; // For approval by Purchaser
        } elseif (auth()->user()->role === 'subadmin2') {
            $order->status_id = 4; // For Approval by Property Custodian 
        } elseif (auth()->user()->role === 'subadmin') {
            $order->status_id = 5; // Pending by GSD 
        } elseif (auth()->user()->role === 'subadmin3') {
            $order->status_id = 6; // Pending by Cash Management 
        } elseif (auth()->user()->role === 'subadmin4') {
            $order->status_id = 7; // Pending by Director for Admin
        } else {
            $order->status_id = 8; // Pending by Director for Finance
        }

        $order->save();

        return response()->json(['message' => 'Order status updated successfully']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }
}
