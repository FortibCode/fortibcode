<x-mail::message>
# 📬 Nouveau message reçu sur votre Portfolio

Bonjour **Fortune**,

Vous avez reçu un nouveau message via le formulaire de contact de votre portfolio. Voici les détails :

---

<x-mail::panel>
**👤 Expéditeur :** {{ $senderName }}

**📧 Email :** {{ $senderEmail }}

**📌 Sujet :** {{ $subject }}

**🕐 Reçu le :** {{ $receivedAt }}
</x-mail::panel>

---

## Message :

{{ $messageBody }}

---

<x-mail::button :url="'mailto:' . $senderEmail" color="primary">
Répondre à {{ $senderName }}
</x-mail::button>

> **Astuce :** Vous pouvez répondre directement à cet email, votre réponse sera envoyée à **{{ $senderEmail }}**.

Cordialement,  
**Votre Portfolio FortibCode**
</x-mail::message>
