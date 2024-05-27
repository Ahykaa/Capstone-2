<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function requestFor()
    {
        return $this->belongsTo(RequestFor::class);
    }
   
}
