<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Asset extends Model
{
    use HasFactory, SoftDeletes;

    public function category()
    {
        return $this->belongsTo(Category::class, 'category', 'id');
    }

    public function sales(): BelongsTo
    {
        return $this->belongsTo(Sales::class, 'sales');
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country');
    }

    public function sector(): BelongsTo
    {
        return $this->belongsTo(Sector::class, 'sector');
    }

    public function investment_type(): BelongsTo
    {
        return $this->belongsTo(InvestmentType::class, 'investment_type');
    }
}
