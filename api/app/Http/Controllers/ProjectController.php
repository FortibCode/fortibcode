<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::with('skills')->orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:projects,slug',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'is_published' => 'boolean',
            'skills' => 'array'
        ]);

        $project = Project::create($validated);
        if ($request->has('skills')) {
            $project->skills()->sync($request->skills);
        }

        return response()->json($project->load('skills'), 201);
    }

    public function show(Project $project)
    {
        return response()->json($project->load('skills'));
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'slug' => 'string|unique:projects,slug,' . $project->id,
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'is_published' => 'boolean',
            'skills' => 'array'
        ]);

        $project->update($validated);
        if ($request->has('skills')) {
            $project->skills()->sync($request->skills);
        }

        return response()->json($project->load('skills'));
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}
