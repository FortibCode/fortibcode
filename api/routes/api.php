<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\UploadController;

// Auth
Route::post('/login', [AuthController::class, 'login']);

// Public routes
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project:slug}', [ProjectController::class, 'show']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/profile', [ProfileController::class, 'index']);
Route::get('/certifications', [CertificationController::class, 'index']);
Route::post('/messages', [MessageController::class, 'store']);

// Protected routes (Admin)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/upload', [UploadController::class, 'upload']);

    Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);
    Route::apiResource('skills', SkillController::class)->except(['index']);
    Route::apiResource('categories', CategoryController::class)->except(['index']);
    Route::apiResource('profile', ProfileController::class)->except(['index']);
    Route::apiResource('messages', MessageController::class)->except(['store']);
    Route::apiResource('certifications', CertificationController::class)->except(['index', 'show']);
});
