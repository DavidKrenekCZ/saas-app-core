@extends('layouts/main')

@section('content')
    <div class="photos configure-page">
        <form method="post" class="upload" enctype="multipart/form-data">
            <a href="{{ str_replace('http://', 'https://', URL::Route('report')) }}" target="_blank" style="padding-bottom: 20px; color: #000; display: block; width: 100%; text-align: center; float: left;">Report zúčastněných</a>
            <a href="{{ str_replace('http://', 'https://', URL::Route('photoReport')) }}" target="_blank" style="padding-bottom: 20px; color: #000; display: block; width: 100%; text-align: center; float: left;">Report vítězů</a>

            @if(count($errors) > 0)
                <div class="alert alert-danger">
                    {{ $errors->first() }}
                </div>
            @endif
            <label class="label-full">Datum průběhu od:</label>
            <input type="text" class="datetimepicker" name="date_from" value="{{ App\Config::first()->date_from }}" placeholder="Soutěž probíha od (YYYY-MM-DD HH:MM)" />

            <label class="label-full">Datum průběhu do:</label>
            <input type="text" class="datetimepicker" name="date_to" value="{{ App\Config::first()->date_to }}" placeholder="Soutěž probíhá do (YYYY-MM-DD HH:MM)" />

            <label class="label-full">Povolený počet fotek na uživatele:</label>
            <input type="number" name="max_files" value="{{ App\Config::first()->max_files }}" placeholder="Maximální počet fotek" />

            {{--<label class="label-full">Pozadí:</label>
            <input type="file" name="background-image">
            <a href="{{ url(App\Config::getBgImage()) }}" target="_blank">
                <img src="{{ url(App\Config::getBgImage()) }}" style="width: 25px; height: 25px; float: right; border-radius: 3px; border: 1px solid black">
            </a>--}}

            <label class="label-full" style="float: none; clear:both;">Cover obrázek:</label>
            <input type="file" name="cover-image">
            <a href="{{ url(App\Config::getCoverImage()) }}" target="_blank">
                <img src="{{ url(App\Config::getCoverImage()) }}" style="width: 25px; height: 25px; float: right; border-radius: 3px; border: 1px solid black">
            </a>

            <label class="label-full" style="float: none; clear:both;">Podmínky soutěže:</label>
            <input type="file" name="terms-file">
            <a href="{{ url(App\Config::getTermsFile()) }}" target="_blank">
                <img src="http://www.allfun.bc.ca/images/PDF_Forms/pdf-icon.png" style="width: 25px; height: 25px; float: right">
            </a>

            <label class="label-full" style="float: none; clear:both;">Popis - horní část:</label>
            <div style="clear: both; margin-bottom: 1rem">
                <textarea class="tinymce" name="description1" rows="15">{{ App\Config::first()->description1 }}</textarea>
            </div>

            <label class="label-full">Popis - spodní část:</label>
            <div style="clear: both; margin-bottom: 1rem">
                <textarea class="tinymce" name="description2" rows="15">{{ App\Config::first()->description2 }}</textarea>
            </div>

            <label class="label-full">Titulek:</label>
            <div style="clear: both; margin-bottom: 1rem">
                <input style="width: 100%" name="textarea1" value="{{ App\Config::first()->textarea1 }}" />
            </div>

            <label class="label-full">Krátký popis:</label>
            <div style="clear: both; margin-bottom: 1rem">
                <textarea style="width: 100%; height: 100px;" name="textarea2">{{ App\Config::first()->textarea2 }}</textarea>
            </div>

            <label class="label-full" style="float: none; clear:both;">Text po skončení:</label>
            <div style="clear: both; margin-bottom: 2rem">
                <textarea style="width: 100%; height: 100px;" name="description3">{{ App\Config::first()->description3 }}</textarea>
            </div>

            <label class="label-full">Video sticky playeru:</label>
            <div style="clear: both; margin-bottom: 1rem">
                <input style="width: 100%" name="sticky_video" value="{{ App\Config::first()->sticky_video }}" />
            </div>

            {{--<label class="label-full">Odkaz u gate na pozadí:</label>
            <div style="clear: both; margin-bottom: 1rem">
                <input style="width: 100%" name="gate_hyperlink" value="{{ App\Config::first()->gate_hyperlink }}" />
            </div>--}}

            <label class="label-full">Sticky článek 1</label>
            <div style="clear: both; margin-bottom: 1rem" class="article-inputs">
                <input style="width: 100%" name="article_1_title" value="{{ App\Config::first()->article_1_title }}" placeholder="Název" /><br />
                <input style="width: 100%" name="article_1_link" value="{{ App\Config::first()->article_1_link }}" placeholder="Odkaz" /><br />
                <input type="file" name="article-1-image">
            </div>

            <label class="label-full">Sticky článek 2</label>
            <div style="clear: both; margin-bottom: 1rem" class="article-inputs">
                <input style="width: 100%" name="article_2_title" value="{{ App\Config::first()->article_2_title }}" placeholder="Název" /><br />
                <input style="width: 100%" name="article_2_link" value="{{ App\Config::first()->article_2_link }}" placeholder="Odkaz" /><br />
                <input type="file" name="article-2-image">
            </div>

            <br />

            <input type="submit" name="submit" value="Uložit" />
        </form>
    </div>
    <style>
        .article-inputs input {
            margin-bottom: 10px;
        }
    </style>
@stop