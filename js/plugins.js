//load in jQuery plugin dependencies (eg. flexslider, smoothScroll etc.) in this file


/*!
 * jQuery Smooth Scroll - v2.0.1 - 2016-09-07
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2016 Karl Swedberg
 * Licensed MIT
 */

// (function(factory) {
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define(['jquery'], factory);
//   } else if (typeof module === 'object' && module.exports) {
//     // CommonJS
//     factory(require('jquery'));
//   } else {
//     // Browser globals
//     factory(jQuery);
//   }
// }(function($) {

//   var version = '2.0.1';
//   var optionOverrides = {};
//   var defaults = {
//     exclude: [],
//     excludeWithin: [],
//     offset: 0,

//     // one of 'top' or 'left'
//     direction: 'top',

//     // if set, bind click events through delegation
//     //  supported since jQuery 1.4.2
//     delegateSelector: null,

//     // jQuery set of elements you wish to scroll (for $.smoothScroll).
//     //  if null (default), $('html, body').firstScrollable() is used.
//     scrollElement: null,

//     // only use if you want to override default behavior
//     scrollTarget: null,

//     // fn(opts) function to be called before scrolling occurs.
//     // `this` is the element(s) being scrolled
//     beforeScroll: function() {},

//     // fn(opts) function to be called after scrolling occurs.
//     // `this` is the triggering element
//     afterScroll: function() {},

//     // easing name. jQuery comes with "swing" and "linear." For others, you'll need an easing plugin
//     // from jQuery UI or elsewhere
//     easing: 'swing',

//     // speed can be a number or 'auto'
//     // if 'auto', the speed will be calculated based on the formula:
//     // (current scroll position - target scroll position) / autoCoeffic
//     speed: 400,

//     // coefficient for "auto" speed
//     autoCoefficient: 2,

//     // $.fn.smoothScroll only: whether to prevent the default click action
//     preventDefault: true
//   };

//   var getScrollable = function(opts) {
//     var scrollable = [];
//     var scrolled = false;
//     var dir = opts.dir && opts.dir === 'left' ? 'scrollLeft' : 'scrollTop';

//     this.each(function() {
//       var el = $(this);

//       if (this === document || this === window) {
//         return;
//       }

//       if (document.scrollingElement && (this === document.documentElement || this === document.body)) {
//         scrollable.push(document.scrollingElement);

//         return false;
//       }

//       if (el[dir]() > 0) {
//         scrollable.push(this);
//       } else {
//         // if scroll(Top|Left) === 0, nudge the element 1px and see if it moves
//         el[dir](1);
//         scrolled = el[dir]() > 0;

//         if (scrolled) {
//           scrollable.push(this);
//         }
//         // then put it back, of course
//         el[dir](0);
//       }
//     });

//     if (!scrollable.length) {
//       this.each(function() {
//         // If no scrollable elements and <html> has scroll-behavior:smooth because
//         // "When this property is specified on the root element, it applies to the viewport instead."
//         // and "The scroll-behavior property of the … body element is *not* propagated to the viewport."
//         // → https://drafts.csswg.org/cssom-view/#propdef-scroll-behavior
//         if (this === document.documentElement && $(this).css('scrollBehavior') === 'smooth') {
//           scrollable = [this];
//         }

//         // If still no scrollable elements, fall back to <body>,
//         // if it's in the jQuery collection
//         // (doing this because Safari sets scrollTop async,
//         // so can't set it to 1 and immediately get the value.)
//         if (!scrollable.length && this.nodeName === 'BODY') {
//           scrollable = [this];
//         }
//       });
//     }

//     // Use the first scrollable element if we're calling firstScrollable()
//     if (opts.el === 'first' && scrollable.length > 1) {
//       scrollable = [scrollable[0]];
//     }

//     return scrollable;
//   };

//   $.fn.extend({
//     scrollable: function(dir) {
//       var scrl = getScrollable.call(this, {dir: dir});

//       return this.pushStack(scrl);
//     },
//     firstScrollable: function(dir) {
//       var scrl = getScrollable.call(this, {el: 'first', dir: dir});

//       return this.pushStack(scrl);
//     },

//     smoothScroll: function(options, extra) {
//       options = options || {};

//       if (options === 'options') {
//         if (!extra) {
//           return this.first().data('ssOpts');
//         }

//         return this.each(function() {
//           var $this = $(this);
//           var opts = $.extend($this.data('ssOpts') || {}, extra);

//           $(this).data('ssOpts', opts);
//         });
//       }

//       var opts = $.extend({}, $.fn.smoothScroll.defaults, options);

//       var clickHandler = function(event) {
//         var escapeSelector = function(str) {
//           return str.replace(/(:|\.|\/)/g, '\\$1');
//         };

//         var link = this;
//         var $link = $(this);
//         var thisOpts = $.extend({}, opts, $link.data('ssOpts') || {});
//         var exclude = opts.exclude;
//         var excludeWithin = thisOpts.excludeWithin;
//         var elCounter = 0;
//         var ewlCounter = 0;
//         var include = true;
//         var clickOpts = {};
//         var locationPath = $.smoothScroll.filterPath(location.pathname);
//         var linkPath = $.smoothScroll.filterPath(link.pathname);
//         var hostMatch = location.hostname === link.hostname || !link.hostname;
//         var pathMatch = thisOpts.scrollTarget || (linkPath === locationPath);
//         var thisHash = escapeSelector(link.hash);

//         if (thisHash && !$(thisHash).length) {
//           include = false;
//         }

//         if (!thisOpts.scrollTarget && (!hostMatch || !pathMatch || !thisHash)) {
//           include = false;
//         } else {
//           while (include && elCounter < exclude.length) {
//             if ($link.is(escapeSelector(exclude[elCounter++]))) {
//               include = false;
//             }
//           }

//           while (include && ewlCounter < excludeWithin.length) {
//             if ($link.closest(excludeWithin[ewlCounter++]).length) {
//               include = false;
//             }
//           }
//         }

//         if (include) {
//           if (thisOpts.preventDefault) {
//             event.preventDefault();
//           }

//           $.extend(clickOpts, thisOpts, {
//             scrollTarget: thisOpts.scrollTarget || thisHash,
//             link: link
//           });

//           $.smoothScroll(clickOpts);
//         }
//       };

//       if (options.delegateSelector !== null) {
//         this
//         .off('click.smoothscroll', options.delegateSelector)
//         .on('click.smoothscroll', options.delegateSelector, clickHandler);
//       } else {
//         this
//         .off('click.smoothscroll')
//         .on('click.smoothscroll', clickHandler);
//       }

//       return this;
//     }
//   });

//   $.smoothScroll = function(options, px) {
//     if (options === 'options' && typeof px === 'object') {
//       return $.extend(optionOverrides, px);
//     }
//     var opts, $scroller, scrollTargetOffset, speed, delta;
//     var scrollerOffset = 0;
//     var offPos = 'offset';
//     var scrollDir = 'scrollTop';
//     var aniProps = {};
//     var aniOpts = {};

//     if (typeof options === 'number') {
//       opts = $.extend({link: null}, $.fn.smoothScroll.defaults, optionOverrides);
//       scrollTargetOffset = options;
//     } else {
//       opts = $.extend({link: null}, $.fn.smoothScroll.defaults, options || {}, optionOverrides);

//       if (opts.scrollElement) {
//         offPos = 'position';

//         if (opts.scrollElement.css('position') === 'static') {
//           opts.scrollElement.css('position', 'relative');
//         }
//       }
//     }

//     scrollDir = opts.direction === 'left' ? 'scrollLeft' : scrollDir;

//     if (opts.scrollElement) {
//       $scroller = opts.scrollElement;

//       if (!(/^(?:HTML|BODY)$/).test($scroller[0].nodeName)) {
//         scrollerOffset = $scroller[scrollDir]();
//       }
//     } else {
//       $scroller = $('html, body').firstScrollable(opts.direction);
//     }

//     // beforeScroll callback function must fire before calculating offset
//     opts.beforeScroll.call($scroller, opts);

//     scrollTargetOffset = (typeof options === 'number') ? options :
//                           px ||
//                           ($(opts.scrollTarget)[offPos]() &&
//                           $(opts.scrollTarget)[offPos]()[opts.direction]) ||
//                           0;

//     aniProps[scrollDir] = scrollTargetOffset + scrollerOffset + opts.offset;
//     speed = opts.speed;

//     // automatically calculate the speed of the scroll based on distance / coefficient
//     if (speed === 'auto') {

//       // $scroller[scrollDir]() is position before scroll, aniProps[scrollDir] is position after
//       // When delta is greater, speed will be greater.
//       delta = Math.abs(aniProps[scrollDir] - $scroller[scrollDir]());

//       // Divide the delta by the coefficient
//       speed = delta / opts.autoCoefficient;
//     }

//     aniOpts = {
//       duration: speed,
//       easing: opts.easing,
//       complete: function() {
//         opts.afterScroll.call(opts.link, opts);
//       }
//     };

//     if (opts.step) {
//       aniOpts.step = opts.step;
//     }

//     if ($scroller.length) {
//       $scroller.stop().animate(aniProps, aniOpts);
//     } else {
//       opts.afterScroll.call(opts.link, opts);
//     }
//   };

//   $.smoothScroll.version = version;
//   $.smoothScroll.filterPath = function(string) {
//     string = string || '';

//     return string
//       .replace(/^\//, '')
//       .replace(/(?:index|default).[a-zA-Z]{3,4}$/, '')
//       .replace(/\/$/, '');
//   };

//   // default options
//   $.fn.smoothScroll.defaults = defaults;

// }));

//typed JS
! function($) {

	"use strict";

	var Typed = function(el, options) {

		// chosen element to manipulate text
		this.el = $(el);

		// options
		this.options = $.extend({}, $.fn.typed.defaults, options);

		// attribute to type into
		this.isInput = this.el.is('input');
		this.attr = this.options.attr;

		// show cursor
		this.showCursor = this.isInput ? false : this.options.showCursor;

		// text content of element
		this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text();

		// html or plain text
		this.contentType = this.options.contentType;

		// typing speed
		this.typeSpeed = this.options.typeSpeed;

		// add a delay before typing starts
		this.startDelay = this.options.startDelay;

		// backspacing speed
		this.backSpeed = this.options.backSpeed;

		// amount of time to wait before backspacing
		this.backDelay = this.options.backDelay;

		// div containing strings
		this.stringsElement = this.options.stringsElement;

		// input strings of text
		this.strings = this.options.strings;

		// character number position of current string
		this.strPos = 0;

		// current array position
		this.arrayPos = 0;

		// number to stop backspacing on.
		// default 0, can change depending on how many chars
		// you want to remove at the time
		this.stopNum = 0;

		// Looping logic
		this.loop = this.options.loop;
		this.loopCount = this.options.loopCount;
		this.curLoop = 0;

		// for stopping
		this.stop = false;

		// custom cursor
		this.cursorChar = this.options.cursorChar;

		// shuffle the strings
		this.shuffle = this.options.shuffle;
		// the order of strings
		this.sequence = [];

		// All systems go!
		this.build();
	};

	Typed.prototype = {

		constructor: Typed,

		init: function() {
			// begin the loop w/ first current string (global self.strings)
			// current string will be passed as an argument each time after this
			var self = this;
			self.timeout = setTimeout(function() {
				for (var i=0;i<self.strings.length;++i) self.sequence[i]=i;

				// shuffle the array if true
				if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);

				// Start typing
				self.typewrite(self.strings[self.sequence[self.arrayPos]], self.strPos);
			}, self.startDelay);
		},

		build: function() {
			var self = this;
			// Insert cursor
			if (this.showCursor === true) {
				this.cursor = $("<span class=\"typed-cursor\">" + this.cursorChar + "</span>");
				this.el.after(this.cursor);
			}
			if (this.stringsElement) {
				this.strings = [];
				this.stringsElement.hide();
				console.log(this.stringsElement.children());
				var strings = this.stringsElement.children();
				$.each(strings, function(key, value){
					self.strings.push($(value).html());
				});
			}
			this.init();
		},

		// pass current string state to each function, types 1 char per call
		typewrite: function(curString, curStrPos) {
			// exit when stopped
			if (this.stop === true) {
				return;
			}

			// varying values for setTimeout during typing
			// can't be global since number changes each time loop is executed
			var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
			var self = this;

			// ------------- optional ------------- //
			// backpaces a certain string faster
			// ------------------------------------ //
			// if (self.arrayPos == 1){
			//  self.backDelay = 50;
			// }
			// else{ self.backDelay = 500; }

			// contain typing function in a timeout humanize'd delay
			self.timeout = setTimeout(function() {
				// check for an escape character before a pause value
				// format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
				// single ^ are removed from string
				var charPause = 0;
				var substr = curString.substr(curStrPos);
				if (substr.charAt(0) === '^') {
					var skip = 1; // skip atleast 1
					if (/^\^\d+/.test(substr)) {
						substr = /\d+/.exec(substr)[0];
						skip += substr.length;
						charPause = parseInt(substr);
					}

					// strip out the escape character and pause value so they're not printed
					curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
				}

				if (self.contentType === 'html') {
					// skip over html tags while typing
					var curChar = curString.substr(curStrPos).charAt(0)
					if (curChar === '<' || curChar === '&') {
						var tag = '';
						var endTag = '';
						if (curChar === '<') {
							endTag = '>'
						}
						else {
							endTag = ';'
						}
						while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
							tag += curString.substr(curStrPos).charAt(0);
							curStrPos++;
							if (curStrPos + 1 > curString.length) { break; }
						}
						curStrPos++;
						tag += endTag;
					}
				}

				// timeout for any pause after a character
				self.timeout = setTimeout(function() {
					if (curStrPos === curString.length) {
						// fires callback function
						self.options.onStringTyped(self.arrayPos);

						// is this the final string
						if (self.arrayPos === self.strings.length - 1) {
							// animation that occurs on the last typed string
							self.options.callback();

							self.curLoop++;

							// quit if we wont loop back
							if (self.loop === false || self.curLoop === self.loopCount)
								return;
						}

						self.timeout = setTimeout(function() {
							self.backspace(curString, curStrPos);
						}, self.backDelay);

					} else {

						/* call before functions if applicable */
						if (curStrPos === 0) {
							self.options.preStringTyped(self.arrayPos);
						}

						// start typing each new char into existing string
						// curString: arg, self.el.html: original text inside element
						var nextString = curString.substr(0, curStrPos + 1);
						if (self.attr) {
							self.el.attr(self.attr, nextString);
						} else {
							if (self.isInput) {
								self.el.val(nextString);
							} else if (self.contentType === 'html') {
								self.el.html(nextString);
							} else {
								self.el.text(nextString);
							}
						}

						// add characters one by one
						curStrPos++;
						// loop the function
						self.typewrite(curString, curStrPos);
					}
					// end of character pause
				}, charPause);

				// humanized value for typing
			}, humanize);

		},

		backspace: function(curString, curStrPos) {
			// exit when stopped
			if (this.stop === true) {
				return;
			}

			// varying values for setTimeout during typing
			// can't be global since number changes each time loop is executed
			var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
			var self = this;

			self.timeout = setTimeout(function() {

				// ----- this part is optional ----- //
				// check string array position
				// on the first string, only delete one word
				// the stopNum actually represents the amount of chars to
				// keep in the current string. In my case it's 14.
				// if (self.arrayPos == 1){
				//  self.stopNum = 14;
				// }
				//every other time, delete the whole typed string
				// else{
				//  self.stopNum = 0;
				// }

				if (self.contentType === 'html') {
					// skip over html tags while backspacing
					if (curString.substr(curStrPos).charAt(0) === '>') {
						var tag = '';
						while (curString.substr(curStrPos - 1).charAt(0) !== '<') {
							tag -= curString.substr(curStrPos).charAt(0);
							curStrPos--;
							if (curStrPos < 0) { break; }
						}
						curStrPos--;
						tag += '<';
					}
				}

				// ----- continue important stuff ----- //
				// replace text with base text + typed characters
				var nextString = curString.substr(0, curStrPos);
				if (self.attr) {
					self.el.attr(self.attr, nextString);
				} else {
					if (self.isInput) {
						self.el.val(nextString);
					} else if (self.contentType === 'html') {
						self.el.html(nextString);
					} else {
						self.el.text(nextString);
					}
				}

				// if the number (id of character in current string) is
				// less than the stop number, keep going
				if (curStrPos > self.stopNum) {
					// subtract characters one by one
					curStrPos--;
					// loop the function
					self.backspace(curString, curStrPos);
				}
				// if the stop number has been reached, increase
				// array position to next string
				else if (curStrPos <= self.stopNum) {
					self.arrayPos++;

					if (self.arrayPos === self.strings.length) {
						self.arrayPos = 0;

						// Shuffle sequence again
						if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);

						self.init();
					} else
						self.typewrite(self.strings[self.sequence[self.arrayPos]], curStrPos);
				}

				// humanized value for typing
			}, humanize);

		},
		/**
		 * Shuffles the numbers in the given array.
		 * @param {Array} array
		 * @returns {Array}
		 */
		shuffleArray: function(array) {
			var tmp, current, top = array.length;
			if(top) while(--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}
			return array;
		},

		// Start & Stop currently not working

		// , stop: function() {
		//     var self = this;

		//     self.stop = true;
		//     clearInterval(self.timeout);
		// }

		// , start: function() {
		//     var self = this;
		//     if(self.stop === false)
		//        return;

		//     this.stop = false;
		//     this.init();
		// }

		// Reset and rebuild the element
		reset: function() {
			var self = this;
			clearInterval(self.timeout);
			var id = this.el.attr('id');
			this.el.empty();
			if (typeof this.cursor !== 'undefined') {
        this.cursor.remove();
      }
			this.strPos = 0;
			this.arrayPos = 0;
			this.curLoop = 0;
			// Send the callback
			this.options.resetCallback();
		}

	};

	$.fn.typed = function(option) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data('typed'),
				options = typeof option == 'object' && option;
			if (data) { data.reset(); }
			$this.data('typed', (data = new Typed(this, options)));
			if (typeof option == 'string') data[option]();
		});
	};

	$.fn.typed.defaults = {
		strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
		stringsElement: null,
		// typing speed
		typeSpeed: 0,
		// time before typing starts
		startDelay: 0,
		// backspacing speed
		backSpeed: 0,
		// shuffle the strings
		shuffle: false,
		// time before backspacing
		backDelay: 500,
		// loop
		loop: false,
		// false = infinite
		loopCount: false,
		// show cursor
		showCursor: true,
		// character for cursor
		cursorChar: "|",
		// attribute to type (null == text)
		attr: null,
		// either html or text
		contentType: 'html',
		// call when done callback function
		callback: function() {},
		// starting callback function before each string
		preStringTyped: function() {},
		//callback for every typed string
		onStringTyped: function() {},
		// callback for reset
		resetCallback: function() {}
	};


}(window.jQuery);