<?php

namespace App\Http\Controllers;

use App\Mail\ContactNotification;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{
    public function index()
    {
        return response()->json(Message::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $message = Message::create($validated);

        // Envoyer une notification email au propriétaire du portfolio
        try {
            Mail::to(config('mail.owner_email', 'okombifortune97@gmail.com'))
                ->send(new ContactNotification($message));
        } catch (\Exception $e) {
            // On log l'erreur mais on ne bloque pas la réponse au visiteur
            Log::error('Échec envoi email de contact : ' . $e->getMessage());
        }

        return response()->json(['success' => true, 'data' => $message], 201);
    }

    public function show(Message $message)
    {
        return response()->json($message);
    }

    public function update(Request $request, Message $message)
    {
        $validated = $request->validate([
            'is_read' => 'boolean'
        ]);

        $message->update($validated);

        return response()->json($message);
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return response()->json(null, 204);
    }
}
