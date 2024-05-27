<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
   
    public function index(Request $request)
    {
        $orders = Order::with(['department', 'unit', 'status', 'requestFor'])->paginate(10);
        return response()->json(['orders' => $orders]);
    }
}
