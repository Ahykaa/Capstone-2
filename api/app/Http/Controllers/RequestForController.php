<?php

namespace App\Http\Controllers;

use App\Models\RequestFor;
use Illuminate\Http\Request;

class RequestForController extends Controller
{
    public function index()
    {
        $requestFor = RequestFor::all();
        return response()->json(['requestFor' => $requestFor]);
    }
}
