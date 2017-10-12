// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


/**
     *
     * Check if element exist on page
     *
     * @param el {string} jQuery object (#popup)
     *
     * @return {bool}
     *
*/
function exist(el){
    if ( $(el).length > 0 ) {
        return true;
    } else {
        return false;
    }
}


jQuery(document).ready(function($) {

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.toggle-menu'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });


    /*---------------------------
                                  File input logic
    ---------------------------*/
    $('input[type=file]').each(function(index, el) {
        $(this).on('change', function(event) {
            event.preventDefault();
            var placeholder = $(this).siblings('.placeholder');
        
            if ( this.files.length > 0 ) {
                if ( this.files[0].size < 5000000 ) {
                    var filename = $(this).val().split('/').pop().split('\\').pop();
                    if ( filename == '' ) {
                        filename = placeholder.attr('data-label');
                    }
                    placeholder.text(filename);
                } else {
                    alert('Maximum file size is 5Mb');
                }    
            } else {
                placeholder.text( placeholder.attr('data-label') );
            }
            
        });
    });
    
    /*---------------------------
                                PAGE ANCHORS
    ---------------------------*/
    $('.page-menu a, .anchor').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 800);
        return false;
    });

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.js-toggle-menu').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('is-active');
        $(this).siblings('header').toggleClass('open');
    });


    $('.quoteSlider__slider').slick({
        arrows: false,
        dots: false,
        asNavFor: '.quoteSlider__sliderNav',
        speed: 1000,
        autoplay: true,
        pauseOnHover: false,
        fade: true
    });

    $('.quoteSlider__sliderNav').slick({
        centerMode: true,
        slidesToShow: 5,
        asNavFor: '.quoteSlider__slider',
        focusOnSelect: true,
        arrows: false,
        dots: false,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 5
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3
              }
            }
        ]
    });

    /*---------------------------
                                  Fancybox
    ---------------------------*/
    $('.fancybox').fancybox({
        
    });


    /*---------------------------
                                  Speakers-slider
    ---------------------------*/
    $('.speakers-slider').slick({
        dots: false,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,

        responsive: [
        {
            breakpoint: 1601,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        }
      ]
    })




    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.fancybox.open([
            {
                src  : popup,
                type: 'inline',
                opts : {}
            }
        ], {
            loop : false
        });
    }



    /*---------------------------
                                  Form submit
    ---------------------------*/
    $('.ajax-form').on('submit', function(event) {
        event.preventDefault();
        var data = new FormData(this);
        $(this).find('button').prop('disabled', true);
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        }).always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
                $(this).find('button').prop('disabled', false);
            });
        });
    });



    /*---------------------------
                                  Google map init
    ---------------------------*/
    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);

        var styles = [];

        var mapOptions = {
            center: mapCenterCoord,
            zoom: 16,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        var styledMapType=new google.maps.StyledMapType(styles,{name:'Styled'});
        map.mapTypes.set('Styled',styledMapType);
        map.setMapTypeId('Styled');

        var markerImage = new google.maps.MarkerImage('images/location.png');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Site Title"
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( exist( '#map_canvas' ) ) {
        googleMap_initialize();
    }


    // AUDIO 
    var songs = {};

    // create songs objects
    $('.audioPlayer__list li').each(function(){
        var audioId = $(this).attr('id'),
            song = $(this).attr('song');

        songs[audioId] = new Audio(song);
        songs[audioId].volume = 0.5;
    });

    //-------------------------------------------------------------------------------
    // set song info in player
    $('.audioPlayer').each(function(){
        var el = $(this).find('.audioPlayer__list li:first-child'),
            nextSongTitle = $(this).find('.audioPlayer__list li:nth-child(2)').text();

        el.addClass('active');
        setSongInfo(el);
        $(this).find('.audioPlayer__next__title').text(nextSongTitle);
    });

        function setSongInfo(el) {
            var song =  el.attr('song'),
                title = el.text(),
                cover = el.attr('cover');
            //Insert audio info
            el.closest('.audioPlayer').find('.title').text(title);
            //Insert song cover
            el.closest('.audioPlayer').find('img.cover').attr('src', cover);
            //Insert link
            el.closest('.audioPlayer').find('a[download]').attr('href', song);
        }

    //-------------------------------------------------------------------------------
    // initiate vars
    function initiateVars(self) {
        var au = {};
            au.player= self.closest('.audioPlayer');
            au.playButton = au.player.find('.play');
            au.volume = au.player.find('.audioPlayer__volume').attr('data-loud') / 10;
            au.current = au.player.find('.audioPlayer__list li.active');
            au.currentSong = au.current.attr('id');

            au.nextLi = au.player.find('.audioPlayer__list li.active').next();
            au.prevLi = au.player.find('.audioPlayer__list li.active').prev();
            au.nextSong = au.nextLi.attr('id');
            au.prevSong = au.prevLi.attr('id');

            au.firstLi = au.player.find('.audioPlayer__list li:first-child');
            au.lastLi = au.player.find('.audioPlayer__list li:last-child');
            au.firstSong = au.firstLi.attr('id');
            au.lastSong = au.lastLi.attr('id');

            au.setNextTitle = function(){
                if(au.nextLi.length == 0){
                    au.player.find('.audioPlayer__next__title').text(au.firstLi.next().text());
                } else {
                    au.player.find('.audioPlayer__next__title').text(au.nextLi.next().text());
                    if (au.nextLi.next().length == 0) {
                        au.player.find('.audioPlayer__next__title').text(au.firstLi.text());
                    }
                }
            };

            au.showSongTime = function() {
                var s, m;
                if(au.nextSong) {
                    s = parseInt(songs[au.nextSong].duration % 60);
                    m = parseInt(songs[au.nextSong].duration / 60) % 60;
                } else {
                    s = parseInt(songs[au.currentSong].duration % 60);
                    m = parseInt(songs[au.currentSong].duration / 60) % 60;
                }
                if(s < 10){
                    s = '0'+s;
                }
                $('.audioPlayer__current__time').html(m + ':'+ s);
            };
        return  au;
    }
    //-------------------------------------------------------------------------------


    //Play button
    $('.play').click(function(){
        var au = initiateVars($(this));

        if(au.current) {
            // thave active song
        } else {
            au.firstLi.addClass('active');
        }

        if ($(this).hasClass('pause')) {
            songs[au.currentSong].pause();
            $(this).removeClass('pause');
        } else {
            if (au.volume) {
                songs[au.currentSong].volume = au.volume;
            }
            songs[au.currentSong].play();
            showDuration(songs[au.currentSong]);
            $(this).addClass('pause');
        }

        au.showSongTime();
    });

    //Next button
    $('.next').click(function(){
        var au = initiateVars($(this));

        songs[au.currentSong].pause();
        songs[au.currentSong].currentTime = 0;
        au.current.removeClass('active');

        if(au.nextLi.length == 0){
            au.nextSong = au.firstSong;
            au.firstLi.addClass('active');
            setSongInfo(au.firstLi);
        } else {
            au.nextLi.addClass('active');
            setSongInfo(au.nextLi);
        }

        au.setNextTitle();
        au.showSongTime();
        au.playButton.removeClass('pause');
        showDuration(songs[au.nextSong]);

    });

    //Prev button
    $('.prev').click(function(){
        var au = initiateVars($(this));

        songs[au.currentSong].pause();
        songs[au.currentSong].currentTime = 0;
        au.current.removeClass('active');

        if(au.prevLi.length == 0){
            au.prevSong = au.lastSong;
            au.lastLi.addClass('active');
            setSongInfo(au.lastLi);
        } else {
            au.prevLi.addClass('active');
            setSongInfo(au.prevLi);
        }

        if(au.prevLi.length == 0){
            au.player.find('.audioPlayer__next__title').text(au.firstLi.text());
        } else {
            au.player.find('.audioPlayer__next__title').text(au.player.find('.audioPlayer__list li.active + li').text());
        }

        au.showSongTime();
        au.playButton.removeClass('pause');
        showDuration(songs[au.prevSong]);
    });

    //Volume control
    $('.audioPlayer__volume div').click(function(){
        var au = initiateVars($(this)),
            vol = $(this).attr('data-volume');

        $('.audioPlayer__volume').attr('data-loud', vol);
        songs[au.currentSong].volume = vol / 10;
        $('.audioPlayer__volume').removeClass('disabled');
        $('.silence').removeClass('active');
    });

    //Volume control
    $('.silence').click(function(){
        var au = initiateVars($(this));
        if($(this).hasClass('active')) {
            songs[au.currentSong].volume = au.volume;
            $(this).removeClass('active');
            $('.audioPlayer__volume').removeClass('disabled');
        } else {
            songs[au.currentSong].volume = 0.0;
            $(this).addClass('active');
            $('.audioPlayer__volume').addClass('disabled');
        }
    });

    //Time/Duration
    function showDuration(song){
        $(song).bind('timeupdate',function(){
            //Get hours and minutes
            var s = parseInt(song.currentTime % 60);
            var m = parseInt(song.currentTime / 60) % 60;
            if(s < 10){
                s = '0'+s;
            }
            $('.audioPlayer__current__duration').html(m + ':'+ s);
            var value = 0;
            if(song.currentTime > 0){
                value = Math.floor((100 / song.duration) * song.currentTime);
            }
            $('.audioPlayer__tracker .progress-bar').css('width', (100 - value) + '%');
        });
    }

}); // end file