<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Order;
use App\Models\OrderEntry;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function show(Request $request)
    {
        // Get the authenticated user's department ID
        $userDepartmentId = Auth::user()->department_id;

        // Fetch orders filtered by the authenticated user's department ID
        $orders = Order::where('department_id', $userDepartmentId)->get();
        
        // Group orders by department_id and calculate status counts per department
        $statusCountsPerDepartment = $orders->groupBy('department_id')->map(function ($group) {
            $statusCounts = $group->groupBy('status_id')->map->count();
            $pendingCount = $group->whereIn('status_id', [1, 2, 3, 4, 5, 6, 7, 8])->count();
            $statusCounts['pending'] = $pendingCount; // Add aggregated pending count
            return $statusCounts;
        });

        // Fetch order entries filtered by the authenticated user's department ID
        $orderEntries = OrderEntry::whereIn('order_id', $orders->pluck('id'))->get();

        // Calculate total amount from order entries
        $totalAmount = $orderEntries->sum('amount');

        // Calculate approved amount from order entries
        $approvedAmount = $orderEntries->whereIn('order_id', Order::where('status_id', 9)->pluck('id'))->sum('amount');
        
        // Fetch the authenticated user's department
        $userDepartment = Department::find($userDepartmentId);

        // Calculate total budget and remaining budget for the authenticated user's department
        $remainingBudget = $userDepartment->budget - $approvedAmount;
        
        // Calculate total utilized budget for the authenticated user's department
        $utilizedBudget = $approvedAmount;

        // Fetch reservations data
        $reservationsData = Reservation::select('event_date', 'event_time', 'representative')->get();

        // Return JSON response
        return response()->json([
            'status_counts_per_department' => $statusCountsPerDepartment,
            'total_amount' => $totalAmount,
            'approved_amount' => $approvedAmount,
            'remaining_budget' => $remainingBudget,
            'utilized_budget' => $utilizedBudget,
            'reservations_data' => $reservationsData,
        ]);
    }
}
