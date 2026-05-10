<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model{
    protected $fillable = ['nombre', 'gmail', 'password'];

    protected $casts = [
        'password' => 'hashed',
    ];
}