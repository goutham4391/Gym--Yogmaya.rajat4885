/*
 * Bones Scripts File
 * Author: Eddie Machado and Rob Healy
 *
*/


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}
// setting the viewport width
var viewport = updateViewportDimensions();


jQuery.fn.outerHTML = function() {
   return (this[0]) ? this[0].outerHTML : '';  
};


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function($) {

// SCROLL DOWN THOSE ARTICLES IN SINGLE

if ( $( ".single-post" ).length ) {
 
   $('html, body').animate({    
      scrollTop: $("#articleTop").offset().top-90
    }, 108);

}



$(window).load(function(){
  $(".pl-cloak").fadeOut(324,function(){$(this).remove();});
});

  // MENU TOGGLER 

  $( "#nav-toggle" ).on( "click", function() {
    $(this).toggleClass( "active" );
    $("#menu-main-menu").slideToggle(540);
  });



// SCROLL STATE CLASS CONTROL
$(function() {
          
  //caches a jQuery object containing the header element
  var header = $(".header");
  var bod = $("body");

  $(window).scroll(function() {

    var scroll = $(window).scrollTop();
    var howFar = 20; //SET YOUR OWN OFFSET INTEGER HERE... I USE 20 SO THERE'S NO SHOW-THROUGH WEIRDNESS FROM THE HERO 

    if (scroll >= howFar) {  
      $([bod[0],header[0]]).removeClass("unscrolled").addClass("scrolled");
    } else {
      $([bod[0],header[0]]).removeClass("scrolled").addClass("unscrolled");
    }
  });
});

	var winHeight = $(window).height();

	$(".home #curtain").css({"height": (winHeight)+"px"});

	$(".home.curtained #content").css({"margin-top": (winHeight)+"px"});

  $(window).on("resize", function(){

    var winHeight = $(window).height();

    $(".home #curtain").css({"height": (winHeight)+"px"});

    $(".home.curtained #content").css({"margin-top": (winHeight)+"px"});
    
  });

  $(window).on("scroll", function(){

    var scrolly = $(window).scrollTop();
    var opacityInt = ( scrolly / winHeight * 1.5 ).toFixed(2)

    if (opacityInt >= 0.92) { opacityInt = 1 }

    if ( $(".home").scrollTop() < winHeight ){
    //  $("body").addClass("no-curtain");

    $(".home.curtained header").css({"opacity": opacityInt  });

    }
  });


// DISPLAY UPCOMING CLASSES

var now = new Date();
var timeHrs = now.getHours().toString();
var timeMns = ('0' + now.getMinutes()).slice(-2).toString();

var nowTime = timeHrs+timeMns;

var weekday = new Array(7);
weekday[0] = "sunday";
weekday[1] = "monday";
weekday[2] = "tuesday";
weekday[3] = "wednesday";
weekday[4] = "thursday";
weekday[5] = "friday";
weekday[6] = "saturday";

var today = weekday[now.getDay()];
var tomorrow = weekday[now.getDay()+1];

if (tomorrow === undefined) {
  tomorrow = "sunday";
}

//console.log(nowTime, today, tomorrow);

//today = 'wednesday';

//nowTime = 600;

function cutoff () {
  today = tomorrow;
  nowTime = 600;
  //console.log ("funcRan")
}

if ( (today == "sunday" || today == "friday")  && nowTime >= 1800 ) {
  
 //console.log ("cond1");
 cutoff();
 
}

if ( (today == "monday" || today == "tuesday" || today ==  "wednesday" || today == "thursday")  && nowTime >= 2030 ) {
  //console.log ("cond2");
  cutoff();
}

if ( ( today == "saturday" ) && nowTime >= 1600 ) {
 //console.log ("cond3");
 cutoff();
}


if (window.location.href.indexOf("schedtest") > -1) {
    $( 'body').append( '<div style="position:absolute; background: #c00; color: #fff; top: 0; right: 0; padding: 5px 10px; z-index: 10000;">Day is: <span id="testDay"></span>  Time is: <span id="testTime"></span></div>' );

var now = new Date();

    setInterval(function(){

      
      now.setHours(now.getHours()+1);
      var timeHrs = now.getHours().toString();
      var timeMns = ('00').toString();

      var nowTime = timeHrs+timeMns;

      var weekday = new Array(7);
      weekday[0] = "sunday";
      weekday[1] = "monday";
      weekday[2] = "tuesday";
      weekday[3] = "wednesday";
      weekday[4] = "thursday";
      weekday[5] = "friday";
      weekday[6] = "saturday";

      var today = weekday[now.getDay()];
      var tomorrow = weekday[now.getDay()+1];


function cutoff () {
  today = tomorrow;
  nowTime = 600;
  //console.log ("funcRan")
}

if ( (today == "sunday" || today == "friday")  && nowTime >= 1800 ) {
  
 //console.log ("cond1");
 cutoff();
 
}

if ( (today == "monday" || today == "tuesday" || today ==  "wednesday" || today == "thursday")  && nowTime >= 2030 ) {
  //console.log ("cond2");
  cutoff();
}

if ( ( today == "saturday" ) && nowTime >= 1600 ) {
 //console.log ("cond3");
 cutoff();
}

      $('#testDay').empty().text(today);
      $('#testTime').empty().text(timeHrs+':'+timeMns);

      var amnt = 0;

      $(".tile-classes .classtime").hide();

$(".tile-classes .classtime").each(function(){


  var num = this.className.split(' ')[0].match(/\d+$/)[0];

  if ( $(this).hasClass(today) &&  parseInt(num) > parseInt(nowTime) && amnt < 1 ) {
    
    $(this).show();
    $(this).next().show();
    $(this).next().next().show();

    amnt++;
  }

  else {

   // $("."+tomorrow+":lt(3)").show();

   $("."+tomorrow+":lt(3)").addClass("wow");

  }

 // $("."+tomorrow+":lt(3)").addClass("wow");

});

    }, 1000);
}  // TEST END




var amnt = 0;

$(".tile-classes .classtime").each(function(){

  var num = this.className.split(' ')[0].match(/\d+$/)[0];

  if ( $(this).hasClass(today) &&  parseInt(num) > parseInt(nowTime) && amnt < 1 ) {
    
    $(this).show();
    $(this).next().show();
    $(this).next().next().show();

    amnt++;
  }

  else {

   // $("."+tomorrow+":lt(3)").show();

   $("."+tomorrow+":lt(3)").addClass("wow");

  }

 // $("."+tomorrow+":lt(3)").addClass("wow");

});



///SLICK STUFF

  // $(".tile-event-slider").slick({
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   dots: true,
  //   arrows: false,
  // });

  $(".post-carousel").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
      }
    ]
  });

  $(".level-wrapper").slick({
    autoplay: false,
    dots: false
  });

  $(".slick-jump").on("click", function(e) {
    e.preventDefault();
    $(".level-wrapper").slick('slickGoTo', 5);  //changed this due to beginner fundies indexing issue

  });

  $("#latestStories").slick({
    autoplay: false,
    arrows: false,
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 481,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
      }
    ]
  });


  $('.pi-wrap').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.prod-slides'
  });
  $('.prod-slides').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.pi-wrap',
      //dots: true,
      centerMode: false,
      focusOnSelect: true
  });

  $('.prod-slides a, .pi-wrap a').on("click", function(e){
    e.preventDefault();
  });

  $("#scrollDownButton").on("click", function () {

    if ( viewport['width'] <=481) {
      $('html, body').animate({    
        scrollTop: $("#content").offset().top-40
      }, 1000);
    }
    else {
      $('html, body').animate({    
      scrollTop: $("#content").offset().top-30
    }, 1000);
    }

     
  });


   


  /////////////
  // SCROLL TO DESIRED ELEMENT
  ////////////


$(function() {
  $('a[href*="#"]:not([href="#"])').on("click", function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top-75
        }, 972);
        return false;
      }
    }
  });
});


  /////////////
  // EVENTS PAGE
  ////////////


  //$(".event-description p:first-child").append("whoa");

  $( ".event-description" ).each(function( ) {
    var linky = $( ".event-reserve-link", this ).outerHTML();

   //console.log(linky);

    $("p:first-child", this).append(' <span class="ellips">...</span>' + linky);
  });

  // EVENT OPENER

  $(".event-opener").on("click", function(e) {
    e.preventDefault();

    var target = $(this);
    target.parent().siblings(".event-description").toggleClass("opened");
    //$(".event-opener").removeClass("fa-angle-down");
    target.toggleClass("fa-angle-down");
    $('html, body').animate({
          scrollTop: target.offset().top-75
        }, 972);
  });


  //// EVENT FILTERS

  var filterTimer = 648;

  $(".btn-filter-all").on("click", function() {
      $(".event-wrapper").slideDown(filterTimer);
  });

  $(".btn-filter-kirtans").on("click", function() {
      $(".event-wrapper:not(.kirtans)").slideUp(filterTimer);
      $(".event-wrapper.kirtans").slideDown(filterTimer);
  });

  $(".btn-filter-workshops").on("click", function() {
      $(".event-wrapper:not(.workshops)").slideUp(filterTimer);
      $(".event-wrapper.workshops").slideDown(filterTimer);
  });

    $(".btn-filter-retreats").on("click", function() {
      $(".event-wrapper:not(.retreats)").slideUp(filterTimer);
      $(".event-wrapper.retreats").slideDown(filterTimer);
  });

      $(".btn-filter-other").on("click", function() {
      $(".event-wrapper:not(.other)").slideUp(filterTimer);
      $(".event-wrapper.other").slideDown(filterTimer);
  });


//// TT FILTERS

/*$(".btntt-filter-all").on("click", function() {
      $(".training-module").slideDown(filterTimer);
      $(".training-module *").fadeIn(100);
  });

  $(".btntt-filter-200hr").on("click", function() {
      $(".training-module.hour-200 *").fadeIn(100);
      $(".training-module.hour-300 *").fadeOut(100);
      $(".training-module:not(.hour-200)").slideUp(filterTimer);
      $(".training-module.hour-200").slideDown(filterTimer);

  });

  $(".btntt-filter-300hr").on("click", function() {
    $(".training-module.hour-300 *").fadeIn(100);
      $(".training-module.hour-200 *").fadeOut(100);
      $(".training-module:not(.hour-300)").slideUp(filterTimer);
      $(".training-module.hour-300").slideDown(filterTimer);
  });*/


  /////////////
  // ABOUT PAGE
  ////////////


  // TEACHER OPENER

  $(".teacher-permalink").on("click", function(e) {
    e.preventDefault();
    $(".teacher-bio-box").removeClass("opened");
    $(this).siblings(".teacher-bio-box").toggleClass("opened");
  });

  $(".teacher-bio-box").on("click", function(e) { 
    $(this).removeClass("opened");
  });


  $(".messaging-opener, .bryn-opener").on("click", function(e) {
    //$('.cloak').css({ height: $(document).innerHeight() });
    e.preventDefault();
    $(".cloak").fadeIn(324);
  });

   $(".closer").on("click", function() {
    $(".cloak, .cloak-faq, .cloak-mi, .cloak-appform, #cta1PostObj, #cta2PostObj, #vidCloak").fadeOut(324);
  });


/// CRAZY OPENERS

   $(document).on("click", ".inny-opener.mi", function(e){
      e.preventDefault();
      $(".cloak-mi").fadeOut(324);
      $(".cloak").fadeIn(324);
   });


   $(document).on("click", ".inny-opener.app-now-200", function(e){
      e.preventDefault();
      $("#tt-apply h2.filler").html("<b>200HR</b> Application");
      $(".cloak-mi").fadeOut(324);
      $(".cloak").fadeOut(324);
      $("#gform_wrapper_6").hide();
      $("#gform_wrapper_4").show();
      $(".cloak-appform").fadeIn(324);
   });


    $(document).on("click", ".inny-opener.app-now-300", function(e){
      e.preventDefault();
      $("#tt-apply h2.filler").html("<b>300HR</b> Application");
      $(".cloak-mi").fadeOut(324);
      $(".cloak").fadeOut(324);
      $("#gform_wrapper_4").hide();
      $("#gform_wrapper_6").show();
      $(".cloak-appform").fadeIn(324);
   });


   // CLASSES PAGE OPENERS

   $("#rulesWarning").on("click", function(e) {
    //$('.cloak').css({ height: $(document).innerHeight() });
    e.preventDefault();
    $("#contact").hide();
    $("#rules").show();
    $(".cloak").fadeIn(324);
  });

   $("#privateBooking").on("click", function(e) {
    //$('.cloak').css({ height: $(document).innerHeight() });
    e.preventDefault();
    $("#rules").hide();
    $("#contact").show();
    $(".cloak").fadeIn(324);
  });

   //FAQ OPENER 

    $(".faqpop.fp200").on("click", function(e) {
      //$('.cloak').css({ height: $(document).innerHeight() });
      e.preventDefault();
      $(".fakky300").hide();
      $(".fakky200").show();
      $(".cloak-faq").fadeIn(324);
    });


    $(".faqpop.fp300").on("click", function(e) {
      //$('.cloak').css({ height: $(document).innerHeight() });
      e.preventDefault();
      $(".fakky200").hide();
      $(".fakky300").show();
      $(".cloak-faq").fadeIn(324);
    });


    // MORE INFO OPENERS

    //200HR

    $(".tt-200-info-cta").on("click", function(e) {
      //$('.cloak').css({ height: $(document).innerHeight() });
      e.preventDefault();

      var sMI = $(this).attr('class').split(' ')[1];
      var sMIelem = $(".moreinfo-hide."+sMI);

      console.log(sMIelem);

      if (sMIelem[0]) {

        console.log("200 is here!");

        $(".moreinfospec .waiting").empty().append(sMIelem.html());

        $(".moreinfo300, .moreinfo200").hide();
        $(".moreinfospec").show();
        $(".cloak-mi").fadeIn(324);
      }

      else {
        $(".moreinfo300, .moreinfospec").hide();
        $(".moreinfo200").show();
        $(".cloak-mi").fadeIn(324);
      }

    });

    //300HR

    $(".tt-300-info-cta").on("click", function(e) {
      //$('.cloak').css({ height: $(document).innerHeight() });
      e.preventDefault();

      var sMI = $(this).attr('class').split(' ')[1];
      var sMIelem = $(".moreinfo-hide."+sMI);

      console.log(sMIelem);

      if (sMIelem[0]) {

        console.log("300 is here!");

        $(".moreinfospec .waiting").empty().append(sMIelem.html());

        $(".moreinfo300, .moreinfo200").hide();
        $(".moreinfospec").show();
        $(".cloak-mi").fadeIn(324);
      }

      else {
        $(".moreinfo200, .moreinfospec").hide();
        $(".moreinfo300").show();
        $(".cloak-mi").fadeIn(324);
      }

    });

    $(".hour-300 .apply-now-cta, .page-template-page-training-300hr .application-opener").on("click", function(e) {
     
      e.preventDefault();

      $("#gform_wrapper_4").hide();
      $("#gform_wrapper_6").show();

      $(".cloak-appform").fadeIn(324);

      $("#tt-apply h2.filler").html("<b>300HR</b> Application");


    });

    $(".hour-200 .apply-now-cta, .page-template-page-training-200hr .application-opener").on("click", function(e) {
     
      e.preventDefault();

      $("#gform_wrapper_6").hide();
      $("#gform_wrapper_4").show();

      $(".cloak-appform").fadeIn(324);

      $("#tt-apply h2.filler").html("<b>200HR</b> Application");


    });



  if (window.location.href.indexOf("ref=cfe") > -1) {
    $(".cloak").fadeIn(324);
  }


  $(".cta-pop").on("click", function (e) {
    e.preventDefault();
    var popID = $(this).attr("id");
    $(".cloak #rules, .cloak #contact").hide();
    $("."+popID).show();
    $(".cloak").fadeIn(324);
  });



   $(document).on("click", ".healcode-buy-now-link", function(e) {
     // e.preventDefault();
      //alert("stop");
   });

   console.info('%c   Site by Independent Logic http://www.independentlogic.com   ', 'background: #222; color: #33f; padding: 4px 0;');
  // console.info('\n                                                     ;                                                                                                          \n                                                     ED.                                                                                                        \n                                      L.             E#Wi                      .                                      ,;                                        \n  .          j.                       EW:        ,ft E###G.       t           ;W.    .            .    .            f#i                          i              \n  Ef.        EW,                   .. E##;       t#E E#fD#W;      Ej         f#EDi   Dt           Di   Dt         .E#t             ..           LE   f.     ;WE.\n  E#Wi       E##j                 ;W, E###t      t#E E#t t##L     E#,      .E#f E#i  E#i          E#i  E#i       i#W,             ;W,          L#E   E#,   i#G  \n  E#K#D:     E###D.              j##, E#fE#f     t#E E#t  .E#K,   E#t     iWW;  E#t  E#t          E#t  E#t      L#D.             j##,         G#W.   E#t  f#f   \n  E#t,E#f.   E#jG#W;            G###, E#t D#G    t#E E#t    j##f  E#t    L##LffiE#t  E#t          E#t  E#t    :K#Wfff;          G###,        D#K.    E#t G#i    \n  E#WEE##Wt  E#t t##f         :E####, E#t  f#E.  t#E E#t    :E#K: E#t   tLLG##L E########f.       E########f. i##WLLLLt       :E####,       E#K.     E#jEW,     \n  E##Ei;;;;. E#t  :K#E:      ;W#DG##, E#t   t#K: t#E E#t   t##L   E#t     ,W#i  E#j..K#j...       E#j..K#j...  .E#L          ;W#DG##,     .E#E.      E##E.      \n  E#DWWt     E#KDDDD###i    j###DW##, E#t    ;#W,t#E E#t .D#W;    E#t    j#E.   E#t  E#t          E#t  E#t       f#E:       j###DW##,    .K#E        E#G        \n  E#t f#K;   E#f,t#Wi,,,   G##i,,G##, E#t     :K#D#E E#tiW#G.     E#t  .D#j     E#t  E#t          E#t  E#t        ,WW;     G##i,,G##,   .K#D         E#t        \n  E#Dfff##E, E#t  ;#W:   :K#K:   L##, E#t      .E##E E#K##i       E#t ,WK,      f#t  f#t          f#t  f#t         .D#;  :K#K:   L##,  .W#G          E#t        \n  jLLLLLLLLL;DWi   ,KK: ;##D.    L##, ..         G#E E##D.        E#t EG.        ii   ii           ii   ii           tt ;##D.    L##, :W##########Wt EE.        \n                        ,,,      .,,              fE E#t          ,;. ,                                                 ,,,      .,,  :,,,,,,,,,,,,,.t          \n                                                   , L:                                                                                                         \n')

  $("#dOE").on("mouseenter focus", function () {
    $(this).text("info@yogamayanewyork.com");
    $(this).attr("href", "mailto:info@yogamayanewyork.com");
  });

  $("#mOE").on("focus ", function () {
    $(this).text("info@yogamayanewyork.com");
    $(this).attr("href", "mailto:info@yogamayanewyork.com");
  });

  var promoConf = $("#gform_confirmation_wrapper_9").length;

  var prevRegConf = $("#validation_message_9_1:contains('unique')");

  

  //console.log ( promoConf );

  if (promoConf === 1) {
    $("#promoConf").css("display", "flex");
    $("#initReg").fadeIn(324);
  }

 if (prevRegConf.length > 0) {
    $("#promoConf").css("display", "flex");
    $("#prevReg").fadeIn(324);
  }

  $("#promoConf img").on("click", function(){
    $("#promoConf").fadeOut(324);
  });



  ////NEW MOMENCE CLASSES CONTROL 
  var pagiItems = $(".the-date").length/7;
  const pagiClean = 5; //Math.round(pagiItems);
  var pagiSet = 1;
  var theCount = 1;
  var theMulti = 7;
  //console.log(pagiClean);

  $("#pager .btn-next").on("click", function() {
    console.log("this is next and pagiSet is "+ pagiSet +". theCount is "+theCount+". theMulti is "+ theMulti +".");

    if (pagiSet >= 1 ) {
         $("#pager .btn-prev, #pager .btn-today").removeClass("off");
      }

    if(pagiSet <= pagiClean) {

      $(".an-item").hide();

      for (let i = theCount; i <= theMulti; i++) {
       // console.log(i);
        $(".an-item.page-"+(i+7)).css({"display": "flex"});
      }
    
      theCount = theCount+7;
      theMulti = theMulti+7;
      //console.log(theCount);
      
      if (pagiSet === pagiClean) {
        $(this).addClass("off");
      }

      pagiSet++;
    }

  });


  $("#pager .btn-today").on("click", function() {  
    $(".an-item").hide();
    pagiSet = 1;
    theCount = 1;
    theMulti = 7;
   // console.log("this is today and pagiSet is "+ pagiSet +". theCount is "+theCount+". theMulti is "+ theMulti +".");
    for (let i = 1; i <= 7; i++) {
     // console.log(i);
      $(".an-item.page-"+(i)).css({"display": "flex"});
    }
   
    $(this).add("#pager .btn-prev").addClass("off");
    $("#pager .btn-next").removeClass("off");
  });


  $("#pager .btn-prev").on("click", function() {

   if(theCount > 1) {
     pagiSet-=1;

      $(".an-item").hide();

      for (let i = theCount; i <= theMulti; i++) {
      //  console.log(i);
        $(".an-item.page-"+(i-7)).css({"display": "flex"});
      }
    
      theCount = theCount-7;
      theMulti = theMulti-7;
     // console.log(theCount);
      if (pagiSet === 1 ) {
         $(this).add("#pager .btn-today").addClass("off");
      }
    }
    $("#pager .btn-next").removeClass("off");
   // console.log("this is prev and pagiSet is "+ pagiSet +". theCount is "+theCount+". theMulti is "+ theMulti +".")
  });

  //video popper

  $(".pop-vid").on("click", function(e){
    e.preventDefault();
    $("#vidCloak").css({"display": "flex"}).hide().fadeIn(324);
  });

  $("#vidCloak .closer").on("click", function(){
    $('video').trigger('pause');
  });


  $(".training-module.hour-200.grad-grdapr img").attr("src", "https://yogamayanewyork.com/wp-content/themes/yogamaya/library/images/icon-ce.svg");

}); /* end of as page load scripts */

