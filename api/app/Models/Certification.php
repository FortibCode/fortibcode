<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'name', 'issuer', 'issue_date', 'expiration_date', 'credential_id', 'credential_url', 'image'
    ];
}
