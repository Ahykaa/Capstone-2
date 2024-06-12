<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationEntry extends Model
{
    protected $fillable = [
        'particulars',
        'quantity',
        'rate',
        'amount',
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
