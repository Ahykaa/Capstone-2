<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Reservation;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function show(Request $request)
{
    $orders = Order::query()->get();
    $statusCounts = $orders->groupBy('status')->map->count();
    $totalAmount = $orders->sum('amount');
    
    $reservationsData = Reservation::select('event_date', 'event_time', 'representative')->get();

    return [
        'status_counts' => $statusCounts,
        'total_amount' => $totalAmount,
        'reservations_data' => $reservationsData,
    ];
}

}
