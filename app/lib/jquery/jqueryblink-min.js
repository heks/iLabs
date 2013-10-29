/**
 *  Uses the jQuery animation queue to make an element blink (similar to the old <blink> tag).
 *  
 *  Usage:
 *   $('#blink').blink('fast');       blink quickly
 *   $('#blink').blink(300);          fade out for 300ms then back in for 300ms...
 *   $('#blink').blink(100,500);      fade out for 100ms then back in for 500ms...
 *  
 *   $('#blink').blink();             stop blinking now
 *   $('#blink').removeClass('blink') stop blinking after fading back in
 *  
 */
(function(e,t){"use strict";var n=function(t,r,i){e(t).animate({opacity:.1},r,"linear",function(){e(t).animate({opacity:1},i,"linear",function(){if(e(this).hasClass("blink")){n(t,r,i)}})})};e.fn.blink=function(r,i){if(r!==t){if(i===t){i=r}return this.each(function(){e(this).addClass("blink");n(this,r,i)})}else{return this.each(function(){e(this).removeClass("blink").stop(true).css("opacity",1)})}}})(jQuery)