<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'content', 'image', 'url', 'github_url', 'is_published'
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }
}
