@extends('layouts/main')

@section('content')

    <ul class="photos my-photos-page">
        @forelse($photos as $photo)
            @include('item', compact('photo'))
        @empty
            Žádná fotografie
        @endforelse
    </ul>

    <input type="hidden" class="items-count" value="15" />
@stop