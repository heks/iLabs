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
(function ($, undefined) {
    "use strict";
    var blink = function (obj, durationOut, durationIn) {
        $(obj).animate({ opacity: 0.1 }, durationOut, 'linear', function () {
            $(obj).animate({ opacity: 1 }, durationIn, 'linear', function () {
                if ($(this).hasClass('blink')) { blink(obj, durationOut, durationIn); }
            });
        });
    };
    $.fn.blink = function (durationOut, durationIn) {
        if (durationOut !== undefined) {
            if (durationIn === undefined) { durationIn = durationOut; }
            return this.each(function () {
                $(this).addClass('blink');
                blink(this, durationOut, durationIn);
            });
        } else {
            return this.each(function () {
                $(this).removeClass('blink').stop(true).css('opacity', 1);
            });
        }
    };
}(jQuery));