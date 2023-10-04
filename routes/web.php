<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\ProfitController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::redirect('/assets', '/assets/list');
Route::redirect('/profit', '/profit/report');

// Root
Route::group(['prefix' => ''], function () {
    Route::get('/', [HomeController::class, 'show']);
});

// Assets
Route::group(['prefix' => 'assets'], function () {
    Route::get('/list', [AssetController::class, 'show']);

    Route::group(['prefix' => 'settings'], function () {
        Route::get('/variables', [AssetController::class, 'showSettingVariables']);

        Route::post('/variables/category', [AssetController::class, 'insertCategory']);
    });
});

// Profit
Route::group(['prefix' => 'profit'], function () {
    Route::get('/report', [ProfitController::class, 'showReport']);
    Route::get('/baseprice', [ProfitController::class, 'showBasePrice']);
});