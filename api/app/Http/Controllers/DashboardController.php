<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function show(Request $request)
    {
        $query = Order::query();

        if ($request->filled(['start_date', 'end_date'])) {
            $query->whereBetween('order_at', [$request->start_date, $request->end_date]);
        }

        $orders = $query->get();
        $statusCounts = $orders->groupBy('status')->map->count();
        $totalAmount = $orders->sum('amount');

        return [
            'status_counts' => $statusCounts,
            'total_amount' => $totalAmount,
        ];
    }
}
