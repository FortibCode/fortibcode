<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Display the profile.
     */
    public function index()
    {
        $profile = Profile::first();
        if (!$profile) {
            $admin = User::where('email', 'fortuneokombi@gmail.com')->first() ?: User::first();
            if ($admin) {
                $profile = Profile::create([
                    'user_id' => $admin->id,
                    'title' => 'Développeur Full-Stack',
                    'bio' => 'Développeur passionné par la création d\'applications web modernes et performantes.',
                    'github_url' => 'https://github.com',
                    'linkedin_url' => 'https://linkedin.com'
                ]);
            }
        }
        return response()->json($profile);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'resume_url' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
            'linkedin_url' => 'nullable|string|max:255',
        ]);

        $admin = User::first();
        if (!$admin) {
            return response()->json(['message' => 'Aucun utilisateur trouvé'], 404);
        }

        $profile = Profile::create(array_merge($validated, ['user_id' => $admin->id]));
        return response()->json($profile, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $profile = Profile::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'string|max:255',
            'bio' => 'nullable|string',
            'resume_url' => 'nullable|string|max:255',
            'github_url' => 'nullable|string|max:255',
            'linkedin_url' => 'nullable|string|max:255',
        ]);

        $profile->update($validated);
        return response()->json($profile);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profile $profile)
    {
        $profile->delete();
        return response()->json(null, 204);
    }
}
