$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox({ alwaysShowClose: true });
});

$('.action-button.first.upload-photo').click(function(){
    // $('html, body').scrollTop(20);
    $("#photos")[0].scrollIntoView();
});


$('body').on('click','.app_share',function(){

    var url = $(this).attr('data-url');
    var window_address = 'http://www.facebook.com/share.php?u='+url;
    window.open(window_address,'popup','width=600,height=600');

    return false;
});

$('#photos').on('click','.photo_share',function(){

    FB.ui({
        method: 'feed',
        link: $(this).attr('data-url'),
        name: $(this).attr('data-name'),
        caption: $(this).attr('data-caption'),
        description: $(this).attr('data-description'),
        picture: $(this).attr('data-image'),
        message: $(this).attr('data-message'),
        display: 'popup'
    }, function(response){

    });
});

$('.show_more').click(function(e) {
    e.preventDefault();
    var showed = [];

    $('.photos li').not(':last').each(function(i) {
        showed.push($(this).attr('data-photo-id'));
    });

    $.get('/more', {showed: b64Encode(showed)}, function(content) {
        $('.photos li:last').before(content);

        if($('.photos li').length - 1 >= parseInt($('.items-count').val())) {
            $('.photos li.show_more').hide();
        }
    });
});

function b64Encode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

/*$('body').on('click', '.photos li .mask', function(e) {
    $('.photos li').removeClass('active');
    $(this).parents('li').addClass('active');
});

$('body').on('click', '.photos li.active img', function(e) {
    $(this).parents('li').removeClass('active');
});*/

$('.inputFile').change(function(event) {
    var reader = new FileReader();

    reader.onload = function(){
        if(event.target.files && event.target.files[0]) {
            $('.photo').html('<img src="' + reader.result + '" />');
        } else {
            $('.photo').html('<i class="fa fa-upload"></i>');
        }
    };

    reader.readAsDataURL(event.target.files[0]);
});

$('#photos').on('click','.like-it',function(){

    var likes = $(this).parents('.wrapp').find('.likes');
    var button = $(this);

    $.ajax({
        type: "POST",
        url: $(this).attr('data-url'),
        data: {},
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    }).done(function(data) {
        if(data.status == 'success') {
            likes.text(parseInt(likes.text()) + 1);
            button.addClass('disabled');
        }
    });
});

tinymce.init({
    selector:'textarea.tinymce',
    menubar: false,
    plugins: [
        'link,lists'
    ],
    toolbar: [
        'undo redo | bold italic link | bullist numlist outdent indent'
    ]
});

$('.datetimepicker').datetimepicker({
    locale: 'cs',
    format: "YYYY-MM-DD HH:mm",
    allowInputToggle: true,
    icons: {
        time: 'fa fa-clock-o',
        date: 'fa fa-calendar',
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down',
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-calendar-check',
        clear: 'fa fa-trash',
        close: 'fa fa-times'
    }
});

/*
$("#upload_photo").submit(function(event) {
    var phone_number = $("#upload_photo input[name='phone']").attr('value');
    alert(phone_number);
    event.preventDefault();
});*/

$('#photo_desc').keyup(function() {

    var length = $(this).val().length;
    var length = 120-length;
    $('#photo_desc_length span').text(length);
});
