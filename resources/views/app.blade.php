@extends('layouts/main')

{{--@if(isset($photo_detail))
    @section("title"){{ $photo_detail->animal_name }}@endsection
    @section("image"){{ asset('uploads/photos/'.$photo_detail->file) }}@endsection
@endif--}}

@section('title') Test @endsection

@section('content')


    <div class="desc-1">

    </div>

    {{--@if(Auth::check())
        @if (App\User::nextVoteTime() !== true)
            <div id="next_vote_time">Znovu můžete hlasovat {{ date('d.m. G:i', strtotime(App\User::nextVoteTime())) }}</div>
        @endif
    @endif--}}

    <div class="photos-container">

        <ul class="photos" id="photos">

            <div class="items_container">
                @if(isset($photo_detail))
                    @include('item', ['photo' => $photo_detail, 'class' => 'active'])
                @endif

                @forelse($photos as $photo)
                    @include('item', compact('photo'))
                @empty
                    {{--@if (App\Config::isActive())
                        Do soutěže zatím nebyly nahrány žádné fotografie.
                    @endif--}}
                @endforelse
            </div>

            @if(App\Photo::count() > 9 && !isset($no_more_photos))
                {{--<li class="show_more">
                    Zobrazit další fotky <i class="fa fa-chevron-circle-down"></i>
                </li>--}}
            @endif
        </ul>
    </div>

    @if(App\Photo::count() > 9 && !isset($no_more_photos))
        <div class="pagination-box">
            {{ $photos->links() }}
        </div>
    @endif

    <input type="hidden" class="items-count" value="{{ App\Photo::count() }}" />

    <div class="desc-2">
        {{--{!! App\Config::first()->description2 !!}--}}
    </div>
@stop
