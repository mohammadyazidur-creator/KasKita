<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DuesPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'dues_id',
        'member_id',
        'amount',
        'payment_date',
        'status', // Lunas, Belum Lunas
        'transaction_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'date',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function dues()
    {
        return $this->belongsTo(Dues::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
