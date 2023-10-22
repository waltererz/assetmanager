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

// Redirect
Route::redirect('/assets', '/assets/list');
Route::redirect('/profit', '/profit/report');

// Root
Route::group(['prefix' => ''], function () {
    Route::get('/', [HomeController::class, 'show']);
});

// Assets
Route::group(['prefix' => 'assets'], function () {
    Route::get('/list', [AssetController::class, 'show']);

    Route::get('/lists', [AssetController::class, 'showAssets']);

    // Settings
    Route::group(['prefix' => 'settings'], function () {

        // Settings - Variables
        Route::group(['prefix' => 'variables'], function () {
            Route::get('/', [AssetController::class, 'showSettingVariables']);

            Route::get('/categories', [AssetController::class, 'showCategories']);
            Route::post('/categories', [AssetController::class, 'storeCategory']);
            Route::post('/categories/delete', [AssetController::class, 'deleteCategories']);

            Route::get('/sales', [AssetController::class, 'showSales']);
            Route::post('/sales', [AssetController::class, 'storeSales']);
            Route::post('/sales/delete', [AssetController::class, 'deleteSales']);

            Route::get('/countries', [AssetController::class, 'showCountries']);
            Route::post('/countries', [AssetController::class, 'storeCountry']);
            Route::post('/countries/delete', [AssetController::class, 'deleteCountries']);

            Route::get('/sectors', [AssetController::class, 'showSectors']);
            Route::post('/sectors', [AssetController::class, 'storeSector']);
            Route::post('/sectors/delete', [AssetController::class, 'deleteSectors']);

            Route::get('/investment-types', [AssetController::class, 'showInvestmentTypes']);
            Route::post('/investment-types', [AssetController::class, 'storeInvestmentType']);
            Route::post('/investment-types/delete', [AssetController::class, 'deleteInvestmentTypes']);
        });
    });
});

// Profit
Route::group(['prefix' => 'profit'], function () {
    Route::get('/report', [ProfitController::class, 'showReport']);
    Route::get('/baseprice', [ProfitController::class, 'showBasePrice']);
});