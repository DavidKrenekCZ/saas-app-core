window.fbAsyncInit = function() {
    FB.init({
        appId      : FacebookAppId,
        xfbml      : true,
        version    : 'v2.6'
    });

    FB.Canvas.setAutoGrow();
    FB.Canvas.scrollTo(0,0);
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));