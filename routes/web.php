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

Route::group(['middleware' => 'web'], function () {
    Route::match(['post', 'get'], '/', ['as' => 'homepage', 'uses' => 'AppController@getHomepage']);
    Route::get('/mazlicek/{id}', ['as' => 'detail', 'uses' => 'AppController@getDetail']);

    Route::post('/like/{id}', ['as' => 'likePhoto', 'uses' => 'AppController@likePhoto']);
    Route::get('/upload', ['as' => 'upload', 'uses' => 'AppController@getUpload', 'middleware' => ['auth']]);
    Route::post('/upload', ['as' => 'upload.process', 'uses' => 'AppController@postUpload', 'middleware' => ['auth']]);

    Route::get('/my-photos', ['as' => 'myPhotos', 'uses' => 'AppController@getMyPhotos', 'middleware' => ['auth']]);

    Route::get('/configure', ['as' => 'configure', 'uses' => 'AppController@getConfigure', 'middleware' => ['auth']]);
    Route::post('/configure', ['as' => 'configure', 'uses' => 'AppController@postConfigure', 'middleware' => ['auth']]);
    Route::get('/report', ['as'  => 'report', 'uses' => 'AppController@getReport', 'middleware' => ['auth']]);
    Route::get('/photo-report', ['as' => 'photoReport', 'uses' => 'AppController@getPhotoReport', 'middleware' => ['auth']]);
    Route::get('/clear-db', ['as'  => 'clearDb', 'uses' => 'AppController@clearDb', 'middleware' => ['auth']]);

    Route::get('/callback', ['as' => 'callback', 'uses' => 'AppController@callback']);

    Route::match(['post', 'get'], '/more', ['as' => 'more', 'uses' => 'AppController@getMore']);
    Route::get('/share-only', ['as' => 'share', 'uses' => 'AppController@share']);
    Route::get('/share-image/{image}', ['as' => 'share-image', 'uses' => 'AppController@shareImage']);
    Route::get('/delete-image/{id}', ['as' => 'delete-image', 'uses' => 'AppController@deleteImage', 'middleware' => ['auth']]);

    Route::get('show-logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');

    Route::get('/cron', ['as' => 'cron', 'uses' => 'AppController@executeCron']);
    Route::get('/top-20', ['as' => 'winners', 'uses' => 'AppController@getWinnersList']);
    Route::get('/test', ['as' => 'test', 'uses' => 'AppController@getTestList']);
});

Route::auth();
Route::get('/registrace', ['as' => 'register', 'uses' => 'Auth\AuthController@showRegistrationForm']);
Route::get('/prihlaseni', ['as' => 'login-page', 'uses' => 'Auth\AuthController@showLoginForm']);
Route::get('/odhlaseni', ['as' => 'logout', 'uses' => 'Auth\AuthController@logout']);
Route::get('/login', ['as' => 'login', 'uses' => 'AppController@getLogin']);
