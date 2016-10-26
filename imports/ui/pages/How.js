import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

export class How extends Component {

  componentDidMount() {
    var $timeline_block = $('.cd-timeline-block');

  	//hide timeline blocks which are outside the viewport
  	$timeline_block.each(function(){
  		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
  			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
  		}
  	});

  	//on scolling, show/animate timeline blocks when enter the viewport
  	$(window).on('scroll', function(){
  		$timeline_block.each(function(){
  			if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
  				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
  			}
  		});
  	});
  }

  render() {
    return (
      <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <Helmet
          title="Cómo funciona"
          meta={[
              {"name": "description", "content": "Entrega de frutas y verduras a domicilio"}
          ]}
        />

        <h1>¿Cómo funciona?</h1>

        <section id="cd-timeline" className="cd-container">
      		<div className="cd-timeline-block">
      			<div className="cd-timeline-img cd-picture">
      				<i className="fa fa-user-plus fa-lg"></i>
      			</div>

      			<div className="cd-timeline-content">
      				<h2>Regístrate</h2>
      				<p>Para comenzar a utilizar Grontify ingresa a <Link to="/login">login</Link>. El proceso es muy sencillo, ingresa tu nombre y apellidos, correo electónico y una contraseña. Una vez ingresado serás redireccionado al panel "Mi central" para que puedas comenzar a realizar tus mandados.</p><br/>
              <img src="img/screens/login.png" width="100%" alt="Grontify crear cuenta"/>
      			</div>
      		</div>

      		<div className="cd-timeline-block">
      			<div className="cd-timeline-img cd-movie">
      				<i className="fa fa-apple fa-lg"></i>
      			</div>

      			<div className="cd-timeline-content">
      				<h2>Panel "Mi Central" y buscar productos</h2>
      				<p>Después de hacer login ingresarás al panel 'Mi Central', en el podrás hacer tus mandados, ver y editar tu perfil, datos de pago, direcciones de entrega, historial de mandados y solicitar soporte en la sección de ayuda.<br/>
              En la sección hacer el mandado, busca productos y elige la cantidad deseada.</p>
              <img src="img/screens/market.png" width="100%" alt="Grontify mi central"/>
      			</div>
      		</div>

      		<div className="cd-timeline-block">
      			<div className="cd-timeline-img cd-picture">
      				<i className="fa fa-shopping-basket fa-lg"></i>
      			</div>

      			<div className="cd-timeline-content">
      				<h2>Checa tu canasta de productos</h2>
              <img src="img/screens/cart.png" width="70%" alt="Grontify cesta"/>
      				<p>En la parte inferior derecha del catálogo de productos en la sección "Hacer el mandado" encontrarás la cesta de productos, presiona para abrir. Verifica los productos y cantidades seleccionadas.</p>
      			</div>
      		</div>

      		<div className="cd-timeline-block">
      			<div className="cd-timeline-img cd-location">
      				<i className="fa fa-truck fa-lg"></i>
      			</div>

      			<div className="cd-timeline-content">
      				<h2>Elige tu tipo de envío</h2>
      				<p>En la cesta de productos selecciona el tipo de envío que deseas, puede ser envío <b>Express</b>, recibe en menos de 1hr; <b>Estándar</b>, recibe antes de las 20:00hrs; o <b>Programado</b>, selecciona la fecha de entrega a partir del siguiente día de tu mandado.</p>
              <p>Si tu mandado es de más de $500, el envío Estándar o Programado es GRATIS</p>
      			</div>
      		</div>

      		<div className="cd-timeline-block">
      			<div className="cd-timeline-img cd-location">
      				<i className="fa fa-credit-card fa-lg"></i>
      			</div>

      			<div className="cd-timeline-content">
      				<h2>Agrega o Selecciona tu método de pago y dirección de entrega</h2>
      				<p>En la cesta de productos selecciona tu método de pago y dirección de entrega, si no tiene ninguna registrada te aparecerá un link para agregarla.</p>
      			</div>
      		</div>

      		<div className="cd-timeline-block">
      			<div className="cd-timeline-img cd-movie">
      				<i className="fa fa-dollar fa-lg"></i>
      			</div>

      			<div className="cd-timeline-content">
      				<h2>Verifica el total de tu mandado</h2>
      				<p>Checa el total de tu mandado y costo de envío.</p>
      			</div>
      		</div>

          <div className="cd-timeline-block">
      			<div className="cd-timeline-img cd-picture">
      				<i className="fa fa-thumbs-up fa-lg"></i>
      			</div>

      			<div className="cd-timeline-content">
      				<h2>Confirma el mandado</h2>
      				<p>Si estás satisfecho con los productos que seleccionaste, presiona en <b>"Ordenar ahora"</b> y confirma el mandado.</p>
              <p>Serás redireccionado al historial de mandados donde podrás monitorear el estatus de tu orden, realizar cambios, confirmar la recepción, calificar el servicio y descargar tus facturas.</p>
      			</div>
      		</div>

          <div className="cd-timeline-block">
      			<div className="cd-timeline-img cd-movie">
      				<i className="fa fa-check fa-lg"></i>
      			</div>

      			<div className="cd-timeline-content">
      				<h2>Terminamos, tu mandado llegará pronto!</h2>
      				<p>Excelente haz realizado tu mandado. Tus frutas y verduras llegarán pronto.</p>
      			</div>
      		</div>
      	</section>

      </div>
    )
  }
}
