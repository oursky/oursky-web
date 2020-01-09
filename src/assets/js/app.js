import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

	// init controller
	var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 0}});

	// build scenes
	new ScrollMagic.Scene({triggerElement: "#content"})
					.setClassToggle(".header", "dark") // add class toggle
          .offset(200)
					.addTo(controller);

/*$(function() {
    var $el = $('.parallax-background');
    $(window).on('scroll', function () {
        var scroll = $(document).scrollTop();
        $el.css({
            'background-position':'50% '+(.4*scroll)+'px'
        });
    });

    */




$('.header__mobilenav').click(function(e) {

  $('.header__mobilenavbtn-x').toggleClass("active");
  $('.mobile__nav').toggleClass("active");
  $('.header').toggleClass("black");
  e.preventDefault();
 });
