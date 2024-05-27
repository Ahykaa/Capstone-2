<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\OrderEntriesController;
use App\Http\Controllers\RequestForController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UnitController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/ping', function () {
    return 'ping test';
});

Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    // Route::get('/departments', [DepartmentController::class, 'index']);
    Route::get('/units', [UnitController::class, 'index']);
    Route::get('/statuses', [StatusController::class, 'index']); 
    Route::get('/requestFor', [RequestForController::class, 'index']);
    Route::get('/order_entries', [OrderEntriesController::class, 'index']);
    Route::get('/order_entries/{id}', [OrderEntriesController::class, 'show']);

    Route::prefix('auth')
        ->controller(AuthController::class)
        ->group(function () {
            Route::get('/', 'user');
            Route::post('/logout', 'logout');
            Route::post('/change-password', 'changePassword');
        });

    Route::prefix('messages')
        ->controller(MessageController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/{id}', 'show');
            Route::post('/{id}', 'store');
        });

    Route::resource('orders', OrderController::class);
    Route::put('/departments/{id}', [DepartmentController::class, 'update']);

    Route::resource('departments', DepartmentController::class);


    Route::group(['middleware' => ['restrictRole:superadmin,staff,admin,subadmin1,subadmin']], function () {
        Route::resource('transaction', TransactionController::class);
    });

    Route::group(['middleware' => ['restrictRole:superadmin'], 'prefix' => 'superadmin'], function () {
        Route::get('/dashboard', [DashboardController::class, 'show']);
        Route::resource('users', UserController::class)->only(['index', 'store', 'destroy']);
    });

    Route::group(['middleware' => ['restrictRole:subadmin']], function () {
        Route::resource('reservations', ReservationController::class);
    });

});
