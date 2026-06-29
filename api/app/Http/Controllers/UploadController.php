<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg,webp,pdf|max:10240',
        ]);

        if ($request->file('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            
            // Move to public/uploads
            $file->move(public_path('uploads'), $filename);

            // Return the full URL
            $url = asset('uploads/' . $filename);

            return response()->json([
                'url' => $url,
                'name' => $filename
            ]);
        }

        return response()->json(['message' => 'Aucun fichier téléchargé'], 400);
    }
}
