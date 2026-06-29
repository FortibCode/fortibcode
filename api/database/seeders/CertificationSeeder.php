<?php

namespace Database\Seeders;

use App\Models\Certification;
use Illuminate\Database\Seeder;

class CertificationSeeder extends Seeder
{
    public function run(): void
    {
        $certs = [
            [
                'name' => 'AWS Certified Solutions Architect – Associate',
                'issuer' => 'Amazon Web Services (AWS)',
                'issue_date' => 'Juin 2025',
                'expiration_date' => 'Juin 2028',
                'credential_id' => 'AWS-ASA-99281',
                'credential_url' => 'https://aws.amazon.com/verification',
                'image' => null
            ],
            [
                'name' => 'Meta Front-End Developer Professional Certificate',
                'issuer' => 'Meta',
                'issue_date' => 'Septembre 2024',
                'expiration_date' => 'Aucune expiration',
                'credential_id' => 'META-FED-83719',
                'credential_url' => 'https://www.coursera.org/verify/professional-cert/meta-front-end-developer',
                'image' => null
            ],
            [
                'name' => 'Google UX Design Professional Certificate',
                'issuer' => 'Google',
                'issue_date' => 'Janvier 2025',
                'expiration_date' => 'Aucune expiration',
                'credential_id' => 'GOOG-UXD-27182',
                'credential_url' => 'https://www.coursera.org/verify/professional-cert/google-ux-design',
                'image' => null
            ]
        ];

        foreach ($certs as $cert) {
            Certification::updateOrCreate(
                ['credential_id' => $cert['credential_id']],
                $cert
            );
        }
    }
}
