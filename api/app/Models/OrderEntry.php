<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderEntry extends Model
{
    protected $fillable = [
        'quantity',
        'unit_id',
        'description',
        'uniCost',
        'amount',
        'remarks',
    ];

    // Define the relationship with the Order model
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
