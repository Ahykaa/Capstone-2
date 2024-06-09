<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Reservation;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function show(Request $request)
{
    $orders = Order::all();
        
    $statusCountsPerDepartment = $orders->groupBy('department_id')->map(function ($group) {
        $statusCounts = $group->groupBy('status_id')->map->count();
        $pendingCount = $group->whereIn('status_id', [1, 2, 3, 4, 5, 6, 7, 8])->count();
        $statusCounts['pending'] = $pendingCount; // Add aggregated pending count
        return $statusCounts;
    });

    $totalAmount = $orders->sum('amount');
    
    $reservationsData = Reservation::select('event_date', 'event_time', 'representative')->get();

    return [
        'status_counts_per_department' => $statusCountsPerDepartment,
        'total_amount' => $totalAmount,
        'reservations_data' => $reservationsData,
    ];
}

}
