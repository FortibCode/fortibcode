<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id', 'title', 'bio', 'resume_url', 'github_url', 'linkedin_url'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
