@extends('layouts/main')

@section('content')
    <div class="photos">
        <form method="post" class="upload photo-form" enctype="multipart/form-data">

            {{ csrf_field() }}

            @if(count($errors) > 0)
                <div class="alert alert-danger">
                    {{ $errors->first() }}
                </div>
            @endif

            <input type="file" name="file" id="file" class="inputFile" />
            <label for="file" id="file"><i class="fa fa-upload"><span>Vybrat fotku</span></i></label>
            <div class="photo"></div>

                <input type="text" name="name" placeholder="** Popis fotky" value="{{ old('name') }}" maxlength="120" id="photo_desc" />
                <input type="text" name="phone" placeholder="* Vaše telefonní číslo, kam Vás máme kontaktovat v případě výhry" value="{{ old('phone') }}" />

            <input type="submit" name="submit" value="Poslat do soutěže!" style="margin-bottom: 20px" />

                <span id="photo_desc_length">
                    * Položka je povinná<br />
                    <br />
                    ** Zbývá <span>120</span> znaků<br />
                    <br />
                    Maximální povolená velikost fotografie je 5 MB
                </span>
        </form>
    </div>
@stop
