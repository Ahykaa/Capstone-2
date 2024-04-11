<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function orderImages()
    {
        return $this->hasMany(OrderImage::class);
    }
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
    public function status()
    {
        return $this->belongsTo(Status::class);
    }
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
