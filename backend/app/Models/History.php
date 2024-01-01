<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class History extends Model
{
    use HasFactory;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The "type" of the ID.
     *
     * @var string
     */
    protected $keyType = 'string';
    protected $primaryKey = 'slug';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'slug',
        'id_user',
        'title',
    ];

    /**
     * Boot method to generate UUID for the 'id' attribute.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Uuid::uuid4()->toString();
        });
    }

    /**
     * Get the user that owns the history.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
