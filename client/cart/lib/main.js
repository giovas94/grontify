// jQuery(document).ready(function($){
// 	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
// 	var $L = 1200,
// 		$cart_trigger = $('#cd-cart-trigger'),
// 		$lateral_cart = $('#cd-cart'),
// 		$shadow_layer = $('#cd-shadow-layer');
//
// 	//open cart
// 	$cart_trigger.on('click', function(event){
// 		event.preventDefault();
// 		//close lateral menu (if it's open)
// 		toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
// 	});
//
// 	//close lateral cart or lateral menu
// 	$shadow_layer.on('click', function(){
// 		$shadow_layer.removeClass('is-visible');
// 		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
// 		if( $lateral_cart.hasClass('speed-in') ) {
// 			$lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
// 				$('body').removeClass('overflow-hidden');
// 			});
// 		} else {
// 			$lateral_cart.removeClass('speed-in');
// 		}
// 	});
// });
//
// function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
// 	if( $lateral_panel.hasClass('speed-in') ) {
// 		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
// 		$lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
// 			$body.removeClass('overflow-hidden');
// 		});
// 		$background_layer.removeClass('is-visible');
//
// 	} else {
// 		$lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
// 			$body.addClass('overflow-hidden');
// 		});
// 		$background_layer.addClass('is-visible');
// 	}
// }
