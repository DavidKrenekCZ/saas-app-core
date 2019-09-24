<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

    Route::match(['post', 'get'], '/', ['as' => 'homepage', 'uses' => 'AppController@getHomepage']);
    Route::get('/mazlicek/{id}', ['as' => 'detail', 'uses' => 'AppController@getDetail']);
    Route::post('/like/{id}', ['as' => 'likePhoto', 'uses' => 'AppController@likePhoto']);
    Route::get('/callback', ['as' => 'callback', 'uses' => 'AppController@callback']);
    Route::match(['post', 'get'], '/more', ['as' => 'more', 'uses' => 'AppController@getMore']);
    Route::get('/share-only', ['as' => 'share', 'uses' => 'AppController@share']);
    Route::get('/share-image/{image}', ['as' => 'share-image', 'uses' => 'AppController@shareImage']);
    Route::get('/cron', ['as' => 'cron', 'uses' => 'AppController@executeCron']);
    Route::get('/top-20', ['as' => 'winners', 'uses' => 'AppController@getWinnersList']);
    Route::get('/test', ['as' => 'test', 'uses' => 'AppController@getTestList']);

Route::group(['middleware' => 'auth'], function () {

    Route::get('/upload', ['as' => 'upload', 'uses' => 'AppController@getUpload']);
    Route::post('/upload', ['as' => 'upload.process', 'uses' => 'AppController@postUpload']);
    Route::get('/my-photos', ['as' => 'myPhotos', 'uses' => 'AppController@getMyPhotos']);
    Route::get('/configure', ['as' => 'configure', 'uses' => 'AppController@getConfigure']);
    Route::post('/configure', ['as' => 'configure', 'uses' => 'AppController@postConfigure']);
    Route::get('/report', ['as'  => 'report', 'uses' => 'AppController@getReport']);
    Route::get('/photo-report', ['as' => 'photoReport', 'uses' => 'AppController@getPhotoReport']);
    Route::get('/clear-db', ['as'  => 'clearDb', 'uses' => 'AppController@clearDb']);
    Route::get('/delete-image/{id}', ['as' => 'delete-image', 'uses' => 'AppController@deleteImage']);
});

Route::auth();
Route::get('/registrace', ['as' => 'register', 'uses' => 'Auth\AuthController@showRegistrationForm']);
Route::get('/prihlaseni', ['as' => 'login-page', 'uses' => 'Auth\AuthController@showLoginForm']);
Route::get('/odhlaseni', ['as' => 'logout', 'uses' => 'Auth\AuthController@logout']);
Route::get('/login', ['as' => 'login', 'uses' => 'AppController@getLogin']);
