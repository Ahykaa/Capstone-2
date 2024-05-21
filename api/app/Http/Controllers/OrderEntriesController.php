<?php

namespace App\Http\Controllers;

use App\Models\OrderEntry;

class OrderEntriesController extends Controller
{
    public function index()
    {
        $order_entries = OrderEntry::all();
        return response()->json(['order_entries' => $order_entries]);
    }

    public function show(string $id)
    {
        $order_entry = OrderEntry::with('order')->findOrFail($id);
        return response()->json(['order_entry' => $order_entry]);
    }
}
