<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\DuesController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SettingController;

/*
|--------------------------------------------------------------------------
| KasKita REST API Routes (PRD Versi 1.0)
|--------------------------------------------------------------------------
*/

// Public Authentication Endpoints
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Authenticated Endpoints (Laravel Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Transactions
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);

    // Members
    Route::get('/members', [MemberController::class, 'index']);
    Route::post('/members', [MemberController::class, 'store']);
    Route::delete('/members/{id}', [MemberController::class, 'destroy']);

    // Dues
    Route::get('/dues', [DuesController::class, 'index']);
    Route::get('/dues-payments', [DuesController::class, 'payments']);
    Route::post('/dues-payments', [DuesController::class, 'recordPayment']);

    // Reports
    Route::get('/reports', [ReportController::class, 'index']);

    // Settings
    Route::get('/settings', [SettingController::class, 'index']);
    Route::put('/settings', [SettingController::class, 'update']);
});

// Also allow public access to GET endpoints in local development if requested without token for frictionless testing
Route::get('/public/dashboard', [DashboardController::class, 'index']);
Route::get('/public/transactions', [TransactionController::class, 'index']);
Route::get('/public/members', [MemberController::class, 'index']);
Route::get('/public/dues', [DuesController::class, 'index']);
Route::get('/public/dues-payments', [DuesController::class, 'payments']);
Route::get('/public/reports', [ReportController::class, 'index']);
Route::get('/public/settings', [SettingController::class, 'index']);
