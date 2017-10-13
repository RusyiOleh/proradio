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
    // On before slide change
    $('.speakers-slider').on('init', function(event, slick){
        slick.$slider.css({
            visibility: 'visible',
            opacity: '1'
        });
    });
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

    /*---------------------------
                                  Speaker gallery slider
    ---------------------------*/
    $('.dictor-slider').slick({
        arrows: true,
        dots: false,
        lazyLoad: 'ondemand',
        infinite: false
    })

    /*---------------------------
                                  Speaker gallery slider
    ---------------------------*/
    $('.fade-slider').slick({
        arrows: false,
        dots: false,
        fade: true,
        autoplay: true,
        speed: 3000
    })


    /*---------------------------
                                  Input mask
    ---------------------------*/
    $('input[type="tel"]').mask('+000 00 000 00 00');



    /*---------------------------
                                  Audio length slider
    ---------------------------*/
    $('.length-slider').each(function(index, el) {
        var slider = $(this);
        var holder = slider.parents('.slider').find('.audio-length');
        var input = slider.siblings('input');
        slider.slider({
            min: slider.attr('data-min')*1,
            max: slider.attr('data-max')*1,
            value: 60,
            step: slider.attr('data-step')*1,
            change: function( event, ui ) {
                var value = ui.value;
                var length;
                switch (value) {
                    case 100:
                        length = holder.attr('data-more');
                        break;
                    default:
                        length = value + ' ' + holder.attr('data-label');
                }
                holder.text( length );
                input.val( value ).trigger('change');
            }
        });    

        slider.siblings('.labels').find('.ls-label').each(function(index, el) {
            var count = slider.siblings('.labels').find('.ls-label').length - 1;
            $(this).css('left', (index*100)/count + '%');

            $(this).on('click', function(event) {
                event.preventDefault();
                var val = $(this).attr('data-val')*1;
                slider.slider( "value", val );
            });
        });
    });

    /*---------------------------
                                  Range
    ---------------------------*/
    $('.range-slider').each(function(index, el) {
        var slider = $(this);
        var holder = slider.parents('.slider').find('.audio-length');
        var input = slider.siblings('input');
        slider.slider({
            min: slider.attr('data-min')*1,
            max: slider.attr('data-max')*1,
            values: [ 10, 30 ],
            range: true,
            step: slider.attr('data-step')*1,
            change: function( event, ui ) {
                var value = ui.values;
                var length;
                switch (value[1]) {
                    case 50:
                        length = value[0] + ' - ' + holder.attr('data-more');
                        break;
                    default:
                        length = value[0] + ' - ' + value[1] + ' ' + holder.attr('data-label');
                }
                holder.text( length );
                input.val( value[0]+'|'+ value[1]).trigger('change');
            }
        });    

        slider.siblings('.labels').find('.ls-label').each(function(index, el) {
            var count = slider.siblings('.labels').find('.ls-label').length - 1;
            $(this).css('left', (index*100)/count + '%');
        });
    });
    



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


    $('.parallax .layer').each(function(i, el) {
        var initialLeft = $(el).css('left');
        var initialTop = $(el).css('top');
        $(this).attr('data-left', initialLeft);
        $(this).attr('data-top', initialTop);
    });

    // PARALLAX
    var currentY = '';
    var currentX = '';
    var movementConstant = .015;
    $('.parallax').mousemove(function(e) {
        if (currentX == '') {
            currentX = e.pageX;
        }
        var xdiff = e.pageX - currentX;
        currentX = e.pageX;
        if (currentY == '') currentY = e.pageY;
        var ydiff = e.pageY - currentY;
        currentY = e.pageY;

        $(this).find('.layer-1').each(function(i, el) {
            var movement = (i + 5) * (xdiff * movementConstant);
            var movementy = (i + 5) * (ydiff * movementConstant);
            var newX = $(el).position().left + movement;
            var newY = $(el).position().top + movementy;
            $(el).css('left', newX + 'px');
            $(el).css('top', newY + 'px');
        });
        $(this).find('.layer-2').each(function(i, el) {
            var movement = (i + 10) * (xdiff * movementConstant);
            var movementy = (i + 10) * (ydiff * movementConstant);
            var newX = $(el).position().left + movement;
            var newY = $(el).position().top + movementy;
            $(el).css('left', newX + 'px');
            $(el).css('top', newY + 'px');
        });
        $(this).find('.layer-3').each(function(i, el) {
            var movement = (i + 15) * (xdiff * movementConstant);
            var movementy = (i + 15) * (ydiff * movementConstant);
            var newX = $(el).position().left + movement;
            var newY = $(el).position().top + movementy;
            $(el).css('left', newX + 'px');
            $(el).css('top', newY + 'px');
        });
    });

    $('.parallax').mouseleave(function(e) {
        $('.parallax .layer').each(function(i, el) {
            var initialLeft = $(el).data('left');
            var initialTop = $(el).data('top');
            $(el).css('left', initialLeft);
            $(el).css('top', initialTop);
        });
    });

    // AUDIOPLAYERS with songs
    var players = {};
    $('.audioGroup').each(function(){
        var playerId = $(this).attr('id');
        players[playerId] = {};
    });

    // create songs objects
    $('.audioGroup__songs li').each(function(){
        var playerId = $(this).closest('.audioGroup').attr('id');
            audioId = $(this).attr('id'),
            song = $(this).attr('song'),
            title = $(this).text(),
            cover = $(this).attr('cover');

        players[playerId][audioId] = {};
        players[playerId][audioId].songObject = new Audio(song);
        players[playerId][audioId].songObject.volume = 0.5,
        players[playerId][audioId].name = title;
        players[playerId][audioId].cover = cover;
        players[playerId][audioId].file = song;

        if($(this).is(':first-child')) {
            $(this).addClass('active');
        }
    });

    // INITIATE OBJECT WITH REQUIRED PROPERTIES
    function initVars(group) {
        var s = this;
        s.audioGroupId = group.attr('id'),
        s.audioGroup = players[s.audioGroupId],
        s.volume = parseFloat($('.audioPlayer__volume').attr('data-loud') / 10);

        s.activeLi =  $('#' + s.audioGroupId + ' .audioGroup__songs li.active'),
        s.activeLiId = s.activeLi.attr('id'),
        s.activeSong = players[s.audioGroupId][s.activeLiId],
        s.activeSongObject = s.activeSong.songObject;

        if(s.activeLi.next().length > 0){
            s.nextLi = s.activeLi.next();
            s.nextLiId = s.nextLi.attr('id'),
            s.nextLiSong = s.audioGroup[s.nextLiId],
            s.nextLiSongOb = s.nextLiSong.songObject;
        }

        if(s.activeLi.prev().length > 0){
            s.prevLi = s.activeLi.prev();
            s.prevLiId = s.prevLi.attr('id'),
            s.prevLiSong = s.audioGroup[s.prevLiId],
            s.prevLiSongOb = s.prevLiSong.songObject;
        }

        s.firstLi = $('#' + s.audioGroupId + ' .audioGroup__songs li:first-child'),
        s.firstLiId = s.firstLi.attr('id'),
        s.firstSong = s.audioGroup[s.firstLiId],
        s.firstSongOb = s.firstSong.songObject,

        s.lastLi = $('#' + s.audioGroupId + ' .audioGroup__songs li:last-child'),
        s.lastLiId = s.lastLi.attr('id'),
        s.lastSong = s.audioGroup[s.lastLiId],
        s.lastSongOb = s.lastSong.songObject;

    }

    var showNextTitle = function(group) {
        var active = group.find('.audioGroup__songs li.active'),
            nextTitle = '';
        if(active.next().length > 0){
            nextTitle = active.next('li').text();
        } else {
            nextTitle = group.find('.audioGroup__songs li:first-child').text();
        }
        $('.audioPlayer__next__title').text(nextTitle);
    };

    // PLAY / PAUSE SONG
    $('.play').click(function(){
        var au = new initVars( $(this).closest('.audioGroup') );
            showNextTitle($(this).closest('.audioGroup'));
        if ($(this).hasClass('pause')) { // if song is playing
            au.activeSongObject.pause();
            $(this).removeClass('pause');
            $('.audioPlayer').removeClass('pause');
        } else {
            $('.play').removeClass('pause');
            // set  active li-song info
            setSongInfo(au.activeSong, au.audioGroupId, au.activeLiId, au);
            // play active li-song 
            au.activeSongObject.play();
            // show active li-song time and duration
            showSongTime(au.activeSongObject); showDuration(au.activeSongObject);
            $(this).addClass('pause');
            $('.audioPlayer').addClass('pause');
        }
    });    

    // NEXT SONG
    $('.audioPlayer .next').click(function(){
        var activeGroup = $('#' + $(this).closest('.audioPlayer').attr('data-playerId') + ''), // get active audio group
            au = new initVars(activeGroup);

        au.activeSongObject.pause();
        au.activeLi.removeClass('active');
        au.activeSongObject.currentTime = 0;

        if(au.nextLi){ // if have next song/li
            // new active li
            au.nextLi.addClass('active');
            // set new song info
            setSongInfo(au.nextLiSong, au.audioGroupId, au.nextLiId);
            // new song time and duration
            showSongTime(au.nextLiSongOb); showDuration(au.nextLiSongOb);

            au.nextLiSongOb.play();
        } else {
            // first li become active
            au.firstLi.addClass('active');
            // set first song info
            setSongInfo(au.firstSong, au.audioGroupId, au.firstLiId, au);
            // first song time and duration
            showSongTime(au.firstSongOb); showDuration(au.firstSongOb);

            au.firstSongOb.play();
        }
        showNextTitle(activeGroup);
    });    

    // PREVIOUSE SONG
    $('.audioPlayer .prev').click(function(){
        var activeGroup = $('#' + $(this).closest('.audioPlayer').attr('data-playerId') + ''), // get active audio group
            au = new initVars(activeGroup);

        au.activeSongObject.pause();
        au.activeLi.removeClass('active');
        au.activeSongObject.currentTime = 0;

        if(au.prevLi){ // if have prev song / li
            // new active li
            au.prevLi.addClass('active');
            // set new song info
            setSongInfo(au.prevLiSong, au.audioGroupId, au.prevLiId);
            // new song time and duration
            showSongTime(au.prevLiSongOb); showDuration(au.prevLiSongOb);
            au.prevLiSongOb.play();
            $('.audioPlayer__next__title').text(au.prevLiSong.name);
        } else {
            // last li become active
            au.lastLi.addClass('active');
            // set last song info
            setSongInfo(au.lastSong, au.audioGroupId, au.lastLiId, au);
            // last song time and duration
            showSongTime(au.lastSongOb); showDuration(au.lastSongOb);
            au.lastSongOb.play();
        }
        showNextTitle(activeGroup);
    });    

    // NEXT SONG
    $('.audioPlayer__play').click(function(){
        var activeGroup = $('#' + $(this).closest('.audioPlayer').attr('data-playerId') + ''), // get active audio group
            au = new initVars(activeGroup);

        if ($('.audioPlayer').hasClass('pause')) { // if song is playing
            au.activeSongObject.pause();
            $('.audioPlayer').removeClass('pause');
            $('.play').removeClass('pause');
        } else {
            $('.play').removeClass('pause');
            // set  active li-song info
            setSongInfo(au.activeSong, au.audioGroupId, au.activeLiId, au);
            // play active li-song 
            au.activeSongObject.play();
            // show active li-song time and duration
            showSongTime(au.activeSongObject); showDuration(au.activeSongObject);
            $('.audioPlayer').addClass('pause');
            activeGroup.find('.play').addClass('pause');
        }
    });      

    //Duration
    var showSongTime = function(song) {
        var s, m;

        s = parseInt(song.duration % 60);
        m = parseInt(song.duration / 60) % 60;

        if(s < 10){
            s = '0'+s;
        }
        $('.audioPlayer__current__time').html(m + ':'+ s);
    };

    //Time
    var showDuration = function (song){
        $(song).bind('timeupdate', function(){
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
    };

    // Set song Info into player
    var setSongInfo = function(song, playerId, songId, au) {
        var player = $('.audioPlayer'),
            audioGroupId = playerId,
            asongId = songId,
            currentAudioGroup = player.attr('data-playerId'),
            currentSong = player.attr('data-songId'),
            nextSongTitle = player.find('.audioPlayer__next__title');

        if (currentAudioGroup) {
            players[currentAudioGroup][currentSong].songObject.pause();
        } 

        player.attr('data-playerId', audioGroupId);
        player.attr('data-songId', asongId);

        player.find('.title').text(song.name);
        player.find('.cover').attr('src', song.cover);
        player.find('a[download]').attr('href', song.file);
    };

    //Volume control
    $('.audioPlayer__volume div').click(function(){
        var activeGroup = $('#' + $(this).closest('.audioPlayer').attr('data-playerId') + ''), // get active audio group
            au = new initVars(activeGroup),
            vol = $(this).attr('data-volume');

        $('.audioPlayer__volume').attr('data-loud', vol);
        au.activeSongObject.volume = vol / 10;
        $('.audioPlayer__volume').removeClass('disabled');
        $('.silence').removeClass('active');
    });
    $('.silence').click(function(){
        var activeGroup = $('#' + $(this).closest('.audioPlayer').attr('data-playerId') + ''), // get active audio group
            au = new initVars(activeGroup);

        if($(this).hasClass('active')) {
            au.activeSongObject.volume = au.volume;
            $(this).removeClass('active');
            $('.audioPlayer__volume').removeClass('disabled');
        } else {
            au.activeSongObject.volume = 0.0;
            $(this).addClass('active');
            $('.audioPlayer__volume').addClass('disabled');
        }
    });


}); // end file