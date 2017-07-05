"use strict";

//Rage Template
//Designerd by: http://bootstrapthemes.co

jQuery(document).ready(function ($) {

//for Preloader

    $(window).load(function () {
        $("#loading").fadeOut(500);
    });

    $( function() {
        var handle = $( "#custom-handle" );
        $( "#slider" ).slider({
          create: function() {
            handle.text( "$" + parseInt($( this ).slider( "value" )));
        },
          slide: function( event, ui ) {
            handle.text( "$" + parseInt(ui.value));
        },
          orientation: "horizontal",
          range: "min",
          max: 10000,
        });
    } );

    $( function() {
        var handle = $( "#rate-custom-handle" );
        $( "#rateslider" ).slider({
          create: function() {
            handle.text( $( this ).slider("value")/100 + "%");
          },
          slide: function( event, ui ) {
            handle.text( ui.value/100 + "%");
          },
          orientation: "horizontal",
          range: "min",
          max: 10000,
        });
    } );

    $( function() {
        var handle = $( "#debt-custom-handle" );
        $( "#debtslider" ).slider({
          create: function() {
            handle.text( "$" + parseInt($( this ).slider( "value" )));
        },
          slide: function( event, ui ) {
            handle.text( "$" + parseInt(ui.value));
        },
          orientation: "horizontal",
          range: "min",
          max: 10000,
        });
    } );

    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('#navbar-menu').find('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 80)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });



    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();

// magnificPopup

    $('.popup-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.video-link').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        iframe: {
  markup: '<div class="mfp-iframe-scaler">'+
            '<div class="mfp-close"></div>'+
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
          '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

  patterns: {
    youtube: {
      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

      id: 'v=', // String that splits URL in a two parts, second part should be %id%
      // Or null - full URL will be returned
      // Or a function that should return %id%, for example:
      // id: function(url) { return 'parsed id'; }

      src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
    }
    // you may add here more sources

  },

  srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
}
 
    });



// slick slider active Home Page Tow
    $(".testimonial_slid").slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: "<i class='fa fa-angle-left nextprevleft'></i>",
        nextArrow: "<i class='fa fa-angle-right nextprevright'></i>",
        autoplay: true,
        autoplaySpeed: 2000
    });



//    featured slider
    $('.featured_slider').slick({
        centerMode: true,
        dote: true,
        centerPadding: '60px',
        slidesToShow: 3,
        speed: 1500,
        index: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });



//---------------------------------------------
// Counter 
//---------------------------------------------

    $('.statistic-counter').counterUp({
        delay: 10,
        time: 2000
    });

//---------------------------------------------
// Scroll Up 
//---------------------------------------------

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });





//About us accordion 

    $("#faq_main_content").collapse({
        accordion: true,
        open: function () {
            this.addClass("open");
            this.css({height: this.children().outerHeight()});
        },
        close: function () {
            this.css({height: "0px"});
            this.removeClass("open");
        }
    });





//Team Skillbar active js

    jQuery('.teamskillbar').each(function () {
        jQuery(this).find('.teamskillbar-bar').animate({
            width: jQuery(this).attr('data-percent')
        }, 6000);
    });



// Circle progress control

    // Offer card
    $('.offer-rate.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.offer-rate strong').attr('data-value')) / 100,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-rate');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>%</i>' + "<span class='span-month'>" + childVar +  "</span>");
    });

    $('.offer-trans.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.offer-trans strong').attr('data-value')) / 100,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-trans');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>%</i>' + "<span class='span-month'>" + childVar +  "</span>");
        if (mainVar == 0)
        {
            progCtrl.html('0' + '<i>%</i>' + "<span class='span-month'>" + childVar +  "</span>");
        }
    });

    // Balance Transfer
    $('.baltran-first.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.baltran-first strong').attr('data-value')) / 100,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-rate');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>%</i>' + "<span class='span-month'>" + childVar +  "</span>");
        if (mainVar == 0)
        {
            progCtrl.html('0' + '<i>%</i>' + "<span class='span-month'>" + childVar +  "</span>");
        }
    });

    var na = parseFloat($(this).find('.baltran-second strong').attr('data-value'));
    if (na < 0)
        na = 0;
    $('.baltran-second.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: na,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-trans');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html('<ina>N/A</ina>');
    });

    $('.baltran-third.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.baltran-third strong').attr('data-value')) / 100,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-rate');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>%</i>' + "<span class='span-month'>" + childVar +  "</span>");
    });

    $('.baltran-fourth.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.baltran-fourth strong').attr('data-value')) / 100,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-trans');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>%</i>' + "<span class='span-month'>" + childVar +  "</span>");
    });

    $('.baltran-fifth.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.baltran-fifth strong').attr('data-value')) / 100,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-rate');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>%</i>' + "<span class='span-month'>" + childVar +  "</span>");
    });

    $('.baltran-sixth.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.baltran-sixth strong').attr('data-value')) / 100,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-trans');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>%</i>' + "<span class='span-month'>" + childVar +  "</span>");
    });


    // Frequent Flyer Circle progress...
    $('.ff-earnrate-first.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.ff-earnrate-first strong').attr('data-value')) / 10,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-rate');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>pts</i>' + "<span class='span-month'>" + childVar +  "</span>");
    });

    $('.ff-earnrate-second.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.ff-earnrate-second strong').attr('data-value')) / 10,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {

        var progCtrl = $(this).find('.res-trans');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>pts</i>' + "<span class='span-month'>" + childVar +  "</span>");
    });

    $('.ff-earnrate-third.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.ff-earnrate-third strong').attr('data-value')) / 10,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-rate');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>pts</i>' + "<span class='span-month'>" + childVar +  "</span>");
    });


    $('.ff-earnrate-fourth.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.ff-earnrate-fourth strong').attr('data-value')) / 10,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-trans');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>pts</i>' + "<span class='span-month'>" + childVar +  "</span>");
    });


    $('.ff-earnrate-fifth.circle').circleProgress({
        startAngle: -Math.PI / 4 * 2,
        lineCap: 'round',
        fill: {gradient: ['#75E0C6', '#329DE4']},
        value: parseFloat($(this).find('.ff-earnrate-fifth strong').attr('data-value')) / 10,
        thickness: 7,
        size: 110
    }).on('circle-animation-progress', function(event, progress) {
        var progCtrl = $(this).find('.res-trans');
        var mainVar = parseFloat(progCtrl.attr('data-value'));
        var childVar = progCtrl.attr('month-value');
        progCtrl.html((mainVar * progress).toFixed(2) + '<i>pts</i>' + "<span class='span-month'>" + childVar +  "</span>");
    });

// Gradient progress bar

    var gp_percent = parseFloat($(this).find('.annual-fee strong').attr('data-value'));
    // var widVal = parseInt($(this).find('.progress-bar-bt').width());
    $('.progress-bar-bt').gradientProgressBar({
        value: gp_percent / 100,
        size: 110,
        fill: {gradient: ['#75E0C6', '#329DE4']},
        thickness: 6,
        lineCap: 'round'
    });

    // var gp_percent1 = parseFloat($(this).find('.annual-fee strong').attr('data-value'));
    $('.progress-bar-ff').gradientProgressBar({
        value: gp_percent / 100,
        size: 110,
        fill: {gradient: ['#75E0C6', '#329DE4']},
        thickness: 6,
        lineCap: 'round'
    });

    // var gp_percent1 = parseFloat($(this).find('.your_savings strong').attr('data-value'));
    $('.progress-bar-save').gradientProgressBar({
        value: 0.8,
        size: 150,
        fill: {gradient: ['#75E0C6', '#329DE4']},
        thickness: 8,
        lineCap: 'round'
    });


  

    //End

});














