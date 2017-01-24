import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';

import {Navbar} from '../components/Navbar.js';
import {Footer} from '../components/Footer.js';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';

export default class App extends Component {
  componentDidMount() {
    var mainHeader = $('.cd-auto-hide-header'),
  		secondaryNavigation = $('.cd-secondary-nav'),
  		//this applies only if secondary nav is below intro section
  		belowNavHeroContent = $('.sub-nav-hero'),
  		headerHeight = mainHeader.height();

  	//set scrolling variables
  	var scrolling = false,
  		previousTop = 0,
  		currentTop = 0,
  		scrollDelta = 10,
  		scrollOffset = 150;

  	mainHeader.on('click', '.nav-trigger', function(event){
  		// open primary navigation on mobile
  		event.preventDefault();
  		mainHeader.toggleClass('nav-open');
  	});

  	$(window).on('scroll', function(){
  		if( !scrolling ) {
  			scrolling = true;
  			(!window.requestAnimationFrame)
  				? setTimeout(autoHideHeader, 250)
  				: requestAnimationFrame(autoHideHeader);
  		}
  	});

  	$(window).on('resize', function(){
  		headerHeight = mainHeader.height();
  	});

  	function autoHideHeader() {
  		var currentTop = $(window).scrollTop();

  		( belowNavHeroContent.length > 0 )
  			? checkStickyNavigation(currentTop) // secondary navigation below intro
  			: checkSimpleNavigation(currentTop);

  	   	previousTop = currentTop;
  		scrolling = false;
  	}

  	function checkSimpleNavigation(currentTop) {
  		//there's no secondary nav or secondary nav is below primary nav
  	    if (previousTop - currentTop > scrollDelta) {
  	    	//if scrolling up...
  	    	mainHeader.removeClass('is-hidden');
  	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
  	    	//if scrolling down...
  	    	mainHeader.addClass('is-hidden');
  	    }
  	}

  	function checkStickyNavigation(currentTop) {
  		//secondary nav below intro section - sticky secondary nav
  		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

  		if (previousTop >= currentTop ) {
  	    	//if scrolling up...
  	    	if( currentTop < secondaryNavOffsetTop ) {
  	    		//secondary nav is not fixed
  	    		mainHeader.removeClass('is-hidden');
  	    		secondaryNavigation.removeClass('fixed slide-up');
  	    		belowNavHeroContent.removeClass('secondary-nav-fixed');
  	    	} else if( previousTop - currentTop > scrollDelta ) {
  	    		//secondary nav is fixed
  	    		mainHeader.removeClass('is-hidden');
  	    		secondaryNavigation.removeClass('slide-up').addClass('fixed');
  	    		belowNavHeroContent.addClass('secondary-nav-fixed');
  	    	}

  	    } else {
  	    	//if scrolling down...
  	 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
  	 	  		//hide primary nav
  	    		mainHeader.addClass('is-hidden');
  	    		secondaryNavigation.addClass('fixed slide-up');
  	    		belowNavHeroContent.addClass('secondary-nav-fixed');
  	    	} else if( currentTop > secondaryNavOffsetTop ) {
  	    		//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
  	    		mainHeader.removeClass('is-hidden');
  	    		secondaryNavigation.addClass('fixed').removeClass('slide-up');
  	    		belowNavHeroContent.addClass('secondary-nav-fixed');
  	    	}

  	    }
  	}
  }

  render() {
    return (
      // <!-- Page-->
      <div id="wrappper">
        <Helmet
            htmlAttributes={{"lang": "es", "amp": undefined}} // amp takes no value
            title="Frutas y verduras a domicilio"
            titleTemplate="Grontify.com - %s"
            defaultTitle="Grontify"
            meta={[
                {"name": "author", "content": "BERNAV Enterprises - Grontify Frutas y verduras de la central a tu hogar"},
                {"name": "description", "content": "Frutas y verduras a precios de central de abastos a domicilio. De la central a tu hogar. Mandado express para todos"},
                {"property": "og:title", "content": "Grontify Entrega de frutas y verduras a domicilio"},
                {"property": "og:type", "content": "website"},
                {"property": "og:image", "content": "https://res.cloudinary.com/grontify/image/upload/v1476989047/logo/grontify-logo-HQ.png"},
                {"property": "og:url", "content": "https://www.grontify.com"},
            ]}
            link={[
              {"rel": "icon", "href": "https://res.cloudinary.com/grontify/image/upload/c_pad,h_32,w_32/v1477066907/mascot/grontify-mascot-HQ.png"}
            ]}
        />

        {/* <!-- Page Head--> */}
        <Navbar currentRoute={this.props.routes} isLoginPage={this.props.location.pathname === '/login'} />

        <main className={`cd-main-content ${this.props.routes[1].name === 'market' ? 'sub-nav' : ''}`}>
          {this.props.children}
        </main>
        <Alert stack={{limit: 3}} />
        <br/><br/>
        {/* <!-- Page Footer--> */}
        <Footer />

      </div>
    );
  }
}
