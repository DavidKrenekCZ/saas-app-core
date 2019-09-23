@foreach($photos as $photo)
    @include('item', compact('photo'))
@endforeach