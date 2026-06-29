<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(Skill::with('category')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'proficiency' => 'nullable|integer|between:0,100',
        ]);

        $skill = Skill::create($validated);
        return response()->json($skill->load('category'), 201);
    }

    public function show(Skill $skill)
    {
        return response()->json($skill->load('category'));
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'category_id' => 'exists:categories,id',
            'name' => 'string|max:255',
            'icon' => 'nullable|string|max:255',
            'proficiency' => 'nullable|integer|between:0,100',
        ]);

        $skill->update($validated);
        return response()->json($skill->load('category'));
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(null, 204);
    }
}
