<?php

namespace App\Models;

use App\Models\Ecommerce\Order;
use App\Models\Screening\Offline;
use App\Models\Activity\UserActivity;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Veelasky\LaravelHashId\Eloquent\HashableId;
use App\Models\Screening\HikingHealthExperience;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HashableId;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar',
        'uuid',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            do {
                $user->uuid = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
            } while (User::where('uuid', $user->uuid)->exists());
        });
    }

    public function paramedic()
    {
        return $this->belongsTo(User::class, 'paramedic_id');
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
    public function screenings()
    {
        return $this->hasMany(Offline::class, 'user_uuid', 'uuid'); // 'uuid' adalah kolom UUID di tabel users
    }

    public function activities()
    {
        return $this->hasMany(UserActivity::class);
    }
}
