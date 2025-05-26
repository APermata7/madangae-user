<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Http\Controllers\UserController;
use App\Http\Controllers\MenuController;

Route::get('/', [UserController::class, 'showLoginForm'])->name('login');
Route::post('/login', [UserController::class, 'login']);
Route::get('/register', [UserController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [UserController::class, 'register']);
Route::post('/logout', [UserController::class, 'logout'])->name('logout');

Route::middleware(['auth.session'])->group(function () {
    Route::get('/home', [MenuController::class, 'home'])->name('menus.home');
    Route::get('/menus', [MenuController::class, 'listMenus'])->name('menus.list');
    Route::get('/menus/{id}/detail', [MenuController::class, 'viewMenuDetail'])->name('menus.detail');
    Route::get('/menus/create', [MenuController::class, 'createMenu'])->name('menus.create');
    Route::post('/menus/store', [MenuController::class, 'storeMenu'])->name('menus.store');
    Route::get('/menus/{id}/edit', [MenuController::class, 'editMenu'])->name('menus.edit');
    Route::put('/menus/{id}/update', [MenuController::class, 'updateMenu'])->name('menus.update');
    Route::delete('/menus/{id}', [MenuController::class, 'deleteMenu'])->name('menus.delete');
});

