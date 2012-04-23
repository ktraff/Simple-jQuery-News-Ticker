/*
 	jQuery Simple News Ticker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, version 2 of the License.
 
    jQuery Simple News Ticker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with jQuery Simple News Ticker.  If not, see <http://www.gnu.org/licenses/>.
	
	Author: Kyle Traff
	Version: 0.1
	Date: 04/2012
*/

(function ($) {
	$.fn.ticker = function (options) {
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = $.extend({}, $.fn.ticker.defaults, options);
		
		// return a ticker for each DOM element
		return this.each(function() { 
			var ticker = $(this);			
			// add our HTML structure for the ticker to the DOM
			ticker.append('<table class="simple-news-ticker"><tbody><tr><td><img class="spacer" src="images/spacer.png"></img></td></tr></tbody></table>');
			var table = ticker.find("table");
			// all news items are contained within a <td> element
			var tableRow = ticker.find('td');
			// the spacer is used to push all news items to the right side of the screen
			var spacer = ticker.find("img.spacer");	
			setupTicker();
			
			// display the ticker with a drop-down effect
			ticker.hide(0);
			ticker.show(opts.displaySpeed);
			// animate the ticker
			animate(ticker.children(":first"));
			
			//stop animation when mouseenter occurs
			ticker.mouseenter(function() {
			  //stop current animation
			  ticker.children().stop();;
			});
			
			//restart animation when mouse leaves
			ticker.mouseleave(function() {
			  //resume animation
			  animate(ticker.children(":first"));
			});
			
			function animate(currentItem) {	
				
				//work out new anim duration
				var distance = currentItem.width();
				var duration = (distance + parseInt(currentItem.css("marginLeft"))) / opts.speed;
		
				//animate the first child of the ticker
				currentItem.animate({ marginLeft: -distance }, duration, opts.easing, function() {
					
					//move current item to the bottom
					currentItem.appendTo(currentItem.parent()).css("marginLeft", 0);
		
					//recurse
					animate(currentItem.parent().children(":first"));
				});
			}
			
			// handles debug and error messages 
			function debugError(obj) {
				if (opts.debugMode) {
					if (window.console && window.console.log) {
						window.console.log(obj);
					}
					else {
						alert(obj);			
					}
				}
			}
			
			function setupSpacer() {
				// configure a spacer to push each news item to fly in from right side of the screen
				spacer.width(ticker.width());
				// if the browser is resized, resize the spacer as well
				$(window).resize(function() {
					var newWidth = ticker.width();
					ticker.children().stop();
					spacer.width(newWidth);
					animate(ticker.children(":first"));
				});
			}
			
			function setupTicker() {
				// hide scrollbars that display for hidden news items
				ticker.css("overflow", "hidden");
				ticker.css("backgroundColor", opts.backgroundColor);
				for (var i in opts.data) {
					// insert a list item for each piece of data
					tableRow.append(
						['<span class="title">', opts.data[i].title,':</span><span class="message">', opts.data[i].message,"</span>"].join("")
					);
				}
				setupSpacer();
			}
		});
	};
	
	$.fn.ticker.defaults = {
		backgroundColor: "#FFFFFF",
		data: [],
		debugMode: true,
		displaySpeed: 1000,
		easing: 'linear',
		speed: 0.025
	};
		
})(jQuery);