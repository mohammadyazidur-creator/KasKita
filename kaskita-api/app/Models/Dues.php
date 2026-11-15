<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dues extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'name',
        'amount',
        'period_type', // monthly, voluntary, incidental
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function payments()
    {
        return $this->hasMany(DuesPayment::class);
    }
}
