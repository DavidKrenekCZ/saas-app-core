<!doctype html>
<html>
<head>
    <title>@if(View::hasSection('title')) @yield('title') @else {!! App\Config::first()->textarea1 !!} @endif</title>
    <link rel="shortcut icon" href="{{ secure_asset('images/favicon.ico') }}"/>
    {{--<meta name="description" content="@if(View::hasSection('description')) @yield('description') @else {!! App\Config::first()->textarea2 !!} @endif">
    <meta property="og:title" content="@if(View::hasSection('title')) @yield('title') @else {!! App\Config::first()->textarea1 !!} @endif" />
    <meta property="og:description" content="@if(View::hasSection('description')) @yield('description') @else {!! App\Config::first()->textarea2 !!} @endif" />
    <meta property="og:image" content="@if(View::hasSection('image'))@yield('image')@else {{ App\Config::getMetaOgImage(app('request')->input('share-image')) }} @endif"/>--}}
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/main.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ secure_asset('css/mone.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ secure_asset('lightbox/ekko-lightbox.css') }}" />
    {{--<link rel="stylesheet" type="text/css" href="{{ secure_asset('css/bootstrap-pagination.min.css') }}" />--}}
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css" integrity="sha256-yMjaV542P+q1RnH6XByCPDfUFhmOafWbeLPmqKh11zo=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker-standalone.min.css" integrity="sha256-SMGbWcp5wJOVXYlZJyAXqoVWaE/vgFA5xfrH3i/jVw0=" crossorigin="anonymous" />

    <script src="https://code.jquery.com/jquery-1.10.2.min.js" integrity="sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg=" crossorigin="anonymous"></script>
    <script src="{{ secure_asset("lightbox/ekko-lightbox.min.js") }}"></script>
</head>

<body {{--@if (!App\Config::isActive()) class="disabled" @endif--}} >

<script> var FacebookAppId = {{ env('FACEBOOK_APP_ID')}} </script>
<script type="text/javascript" src="{{ secure_asset('js/facebook-sdk.js') }}"></script>

<div id="fb-root"></div>

<div class="mone-container-wrapper">
    <ul class="top-header">
        <li class="logo"><img src="{{ secure_asset('images/logo-small.svg') }}" alt="Logo Prima Mazlíček"></li>
        <li><a href="{{ route('homepage') }}">Všechny fotky</a></li>
        <li><a href="{{ route('winners') }}">TOP 20</a></li>
        <li><a href="{{ route('upload') }}">Nahrát fotku</a></li>
        @if(Auth::check())
            <li><a href="{{ route('myPhotos') }}">Moje fotky</a></li>
            <li><a href="{{ route('logout') }}">Odhlásit se</a></li>
        @endif
        @if(Auth::check() && Auth::user()->admin)
            <li><a href="{{ route('configure') }}">Administrace</a></li>
            <li><a href="{{ route('clearDb') }}" onclick="return confirm('Opravdu chcete smazat všechny data z aplikace?');">Obnovit databázi</a></li>
        @endif
    </ul>
    <div class="container">

        @yield('content')

    </div>
</div>

<footer>
    <a href="{{ url(App\Config::getTermsFile()) }}" target="_blank">Podmínky soutěže</a> |
    <a href="{{ route('configure') }}">Správa</a>
</footer>

<!-- Auth modal -->
<div id="auth_modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Zapojte se do soutěže!</h4>
            </div>
            <div class="modal-body">
                <a href="{{ route("login") }}">
                    <button type="button" class="btn btn-primary first">Přihlásit pomocí Facebooku</button>
                </a>
                {{--<a href="{{ route("login-page") }}">
                    <button type="button" class="btn btn-default">Přihlásit pomocí e-mailu</button>
                </a>--}}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Zavřít</button>
            </div>
        </div>
    </div>
</div>

<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.3/moment.min.js" integrity="sha256-/As5lS2upX/fOCO/h/5wzruGngVW3xPs3N8LN4FkA5Q=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.3/locale/cs.js" integrity="sha256-5e0RubO3OCaMrr1X80YLiI1pxD6oYnnkLMSBXPpVu9E=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js" integrity="sha256-5YmaxAwMjIpMrVlK84Y/+NjCpKnFYa8bWWBbUHSBGfU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="{{ secure_asset('js/main.js') }}?654321"></script>

@yield('scripts')

</body>
</html>
