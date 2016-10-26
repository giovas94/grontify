import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';

export class Home extends Component {
  render() {
    return (
      <div>

        <Helmet
            title="Homepage"
            meta={[
                {"name": "description", "content": "Frutas y verduras a domicilio. De la central a tu hogar."}
            ]}
        />

        <div className="header-background bg-image">
          <div className="container">
            <h1>Grontify</h1>
            <h2>Frutas y verduras a domicilio. De la central a tu hogar</h2>
            <Link to="how-works" className="btn btn-default btn-lg">¿Cómo lo utilizo?</Link>
          </div>
        </div>


        <section className="section">
          <div className="container">
            <div className="col-3 text--center">
              <img src="http://res.cloudinary.com/grontify/image/upload/v1477066907/mascot/grontify-mascot-HQ.png" alt="" className="details-img--ball"/>
            </div>
            <div className="col-7 details">
              <h3>¿Por qué Grontify es genial?</h3>
              <ul>
                <li>Frutas y verduras de primera</li>
                <li>A precios de la central</li>
                <li>Si así lo prefieres, recibe en menos de una hora</li>
                <li>Entregas GRATIS en ordenes mayores a MXN $500</li>
              </ul>
            </div>
          </div>
        </section>


        <section className="section section--primary">
          <div className="container">
            <div className="col-3 features">
              <i className="fa fa-bolt"></i>
              <p>
                Entrega express. Recibe en menos de una hora o programa tu entrega, como tu prefieras!
              </p>
            </div>
            <div className="col-3 features">
              <i className="fa fa-credit-card"></i>
              <p>
                Paga con tarjeta de crédito o débito. No te realizamos ningún cargo hasta que confirmes de recibido!
              </p>
            </div>
            <div className="col-3 features">
              <i className="fa fa-heart"></i>
              <p>
                Invita a tus amigos a utilizar Grontify. Obtén entregas GRATIS y descuentos en tus mandados!
              </p>
            </div>
          </div>
        </section>

        <section className="section section--primary--alt">
          <div className="container">
            <h3>Realiza tu primer mandado ahora y</h3>
            <p style={{color: '#e0d5b1', textAlign: 'center'}}>obtén $100.00 de bonificación para tus frutas y verduras además envío estándar sin costo.</p>
          </div>
        </section>

        <section className="section section--primary--light">
          <div className="container">
            <h3>No sólo te hacemos el mandado al mejor precio y calidad</h3>
            <p style={{color: '#00a6a6', textAlign: 'center'}}>te ofrecemos tiempo para lo importante, para tí y tu familia</p>
          </div>
        </section>


        <section style={{padding: '5rem 0'}} className="section section--primary--alt bg-image bg-image-2">
          <div className="container text--center">
            <h3 style={{fontSize: '4rem'}}>Beneficios de utilizar Grontify</h3>
            <div className="col-5 text--left">
              <ul>
                <li>Te proporcionamos tiempo para las cosas importantes</li>
                <li>Realiza tu mandado en cualquier momento</li>
                <li>Frutas y verduras de primera, garantizado</li>
              </ul>
            </div>
            <div className="col-5 text--left">
              <ul>
                <li>A precios de la central de abastos</li>
                <li>Te urge algo, recibe en menos de 1hr</li>
                <li>Garantizamos entrega a tiempo</li>
                <li>Sin pedidos mínimos y entregas GRATIS</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="text--center">
          <div className="container">
            <h3>¿Aún sigues aquí?</h3>
            <Link to="/market" className="btn btn-success btn-lg">Haz tu mandado ahora!</Link>
          </div>
        </section>


      </div>
    )
  }
}
