<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;

class CertificationController extends Controller
{
    public function index()
    {
        return response()->json(Certification::orderBy('issue_date', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issue_date' => 'required|string|max:255',
            'expiration_date' => 'nullable|string|max:255',
            'credential_id' => 'nullable|string|max:255',
            'credential_url' => 'nullable|url',
            'image' => 'nullable|string'
        ]);

        $certification = Certification::create($validated);

        return response()->json($certification, 201);
    }

    public function show(Certification $certification)
    {
        return response()->json($certification);
    }

    public function update(Request $request, Certification $certification)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'issuer' => 'string|max:255',
            'issue_date' => 'string|max:255',
            'expiration_date' => 'nullable|string|max:255',
            'credential_id' => 'nullable|string|max:255',
            'credential_url' => 'nullable|url',
            'image' => 'nullable|string'
        ]);

        $certification->update($validated);

        return response()->json($certification);
    }

    public function destroy(Certification $certification)
    {
        $certification->delete();
        return response()->json(null, 204);
    }
}
