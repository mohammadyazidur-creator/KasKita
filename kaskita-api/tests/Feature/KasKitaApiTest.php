<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Organization;

class KasKitaApiTest extends TestCase
{
    public function test_login_success(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'budi@kaskita.id',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'token',
                    'user',
                    'organization',
                ]
            ]);
    }

    public function test_dashboard_endpoint(): void
    {
        $response = $this->getJson('/api/public/dashboard');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'summary' => [
                        'balance',
                        'month_income',
                        'month_expense',
                        'members_total',
                    ]
                ]
            ]);
    }

    public function test_transactions_endpoint(): void
    {
        $response = $this->getJson('/api/public/transactions');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data',
                'summary' => [
                    'total_income',
                    'total_expense',
                ]
            ]);
    }

    public function test_members_endpoint(): void
    {
        $response = $this->getJson('/api/public/members');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data',
            ]);
    }

    public function test_reports_endpoint(): void
    {
        $response = $this->getJson('/api/public/reports');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'summary' => [
                        'total_income',
                        'total_expense',
                        'surplus',
                    ]
                ]
            ]);
    }
}
