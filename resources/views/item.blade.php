<li data-photo-id="{{ $photo->id }}">
    <div class="wrapp">
        @if(Auth::check())
            @if(Auth::user()->admin)
                <a href="{{ route('delete-image', ['id' => $photo->id]) }}" onclick="return confirm('Opravdu chcete tuto fotografii vymazat?');" class="delete">
                    <img src="{{ asset('images/icon-cross.png') }}" alt="">
                </a>
            @endif
        @endif
        <a href="javascript: void()" class="share app_share" data-url="{{ route('detail', ['id' => $photo->id]) }}">
            sdílet
        </a>
        <div class="image">
            <a href="{{ asset('uploads/photos/'.$photo->file) }}" data-toggle="lightbox">
                <img class="thumb" src="{{ asset('uploads/photos/thumbs/'.$photo->file) }}" />
                <div class="mask"><i class="fa fa-search"></i></div>
            </a>
        </div>
        <p class="info">
            Jméno: {{ $photo->animal_name }}<br />
            Věk: {{ $photo->animal_age }}<br />
            <span>{{ $photo->name }}</span>
        </p>
        <p class="likes">{{ $photo->likes_count or '0'}}</p>
        <p>{{ $photo->user()->first()->name }}</p>

            <p style="padding-top: 0;">
                Aktuálně <span style="color: #e0121c">{{ $photo->position }}. místo</span>
            </p>

        @if(Auth::check())
            @if($photo->votedIn24Hours())
                    <a class="like disabled" title="Dali jste hlas!"><i class="fa fa-thumbs-up"></i></a>
            @else
                    <a href="javascript: void()" class="like like-it" data-url="{{ str_replace('http://', 'https://', URL::Route('likePhoto', $photo->id)) }}" title="Hlasovat pro tuto fotku!"><i class="fa fa-thumbs-up"></i></a>
            @endif
        @else
            <a href="/upload" class="like login" title="Hlasování je možné po přihlášení!"><i class="fa fa-sign-in"></i></a>
        @endif
    </div>
</li>
