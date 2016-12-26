import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import {Grid, Row, Col} from 'react-bootstrap';

export const Terms = () => (
  <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
    <Helmet
      title="Términos y Condiciones"
      meta={[
          {"name": "description", "content": "Términos y condiciones del servicio. Grontify Frutas y verduras a domicilio."}
      ]}
    />
    <h1>Términos y Condiciones</h1>

    <Row>
      <Col sm={12}>
        <p>Fecha de entrada en vigor: 20 de diciembre de 2016</p>
        <p>Nombre de la empresa GRONTIFY SAS DE CV (“Grontify”) requiere que todos los visitantes que ingresen a su sitio www.grontify.com (“Sitio”) se adhieran a los términos y condiciones que aparecen a continuación. Por el solo hecho de ingresar y hacer uso de este Sitio, Usted (el “Usuario”) se adhiere de forma inmediata a todos y cada uno de los siguientes términos y condiciones:</p>
        <h4>LEGISLACIÓN</h4>
        <p>El acceso y utilización de este Sitio se encuentra sujeto a las disposiciones aplicables de la legislación mexicana.</p>
        <h4>TERMINOLOGÍA</h4>
        <p>Para todos los efectos prácticos y legales a que haya lugar, se advierte al Usuario que, en el texto de este Sitio, se utilizan las palabras “Grontify” para referirse de manera indistinta (en conjunto o individualmente) a GRONTIFY SAS DE CV (“Grontify”) la empresa Grontify Sociedad por Acciones Simplificada de CV, con domicilio en Comisión Agraria No. 123 Col. Cuatro arboles Del. Venustiano Carranza, Ciudad de México, México CP. 15730 y/o a cualquiera otra de las empresas filiales o subsidiarias que conforman el grupo. De igual manera se utilizan las palabras “Mandado”, “Mi Mandado”, “Tu mandado” para referirse de manera indistinta (en conjunto o individualmente) a los distintos tipos de ordenes disponibles para la compra.</p>
        <h4>RESPONSABILIDAD RESPECTO A LA INFORMACIÓN</h4>
        <p>“Grontify” no asume ninguna responsabilidad relacionada con la exactitud o veracidad de alguna opinión, manifestación o declaración realizada a través de este Sitio, por algún tercero distinto a “Grontify”. Asimismo, “Grontify” no asume ninguna responsabilidad por los daños o perjuicios que se pudieren llegar a ocasionar en virtud de la utilización de la información contenida en este Sitio. Es responsabilidad exclusiva del Usuario el evaluar la exactitud, contenido y utilidad de la información, por lo que recomendamos se contacte un especialista para obtener una evaluación profesional respecto de cualquier segmento de dicha información.</p>
        <h4>LIMITACION DE LA RESPONSABILIDAD</h4>
        <p>“Grontify” en ningún caso será responsable por los daños o perjuicios, directos o indirectos, generados o de cualquier forma relacionados con el acceso o utilización de este Sitio, incluyendo la responsabilidad relacionada con daños ocasionados por virus que infecten el/los sistema(s) de cómputo del Usuario, violación de la privacidad y derechos similares, infracción de derechos de propiedad intelectual, así como de cualquier otro daño.</p>
        <h4>CONFIDENCIALIDAD EN LAS COMUNICACIONES DEL USUARIO</h4>
        <p>Salvo por lo establecido por las disposiciones legales aplicables, “Grontify” mantendrá la confidencialidad de las comunicaciones del Usuario que contengan información personal, que éste transmita directamente a “Grontify”. No obstante, lo anterior, los registros e inscripciones que hagan los Usuarios en cualquier tipo de foro de mensajes, no serán considerados como confidenciales.</p>
        <h4>SITIOS LIGADOS</h4>
        <p>Se encuentra estrictamente prohibido cualquier tipo de captación y/o vinculación no autorizada a este Sitio. Asimismo, se encuentra prohibida la enmarcación del contenido de este Sitio. “Grontify” se reserva el derecho de desactivar cualquier liga (link) o marco (frame) no autorizado, y no asume responsabilidad alguna respecto del contenido de cualquier otro sitio de Internet ligado o vinculado a este Sitio. El acceso a cualquier Sitio ligado o vinculado será bajo el riesgo exclusivo del Usuario.</p>
        <h4>REGISTROS E INSCRIPCIONES DE LOS USUARIOS</h4>
        <p>”Grontify” no se encuentra obligada a revisar o dar contestación a los mensajes o información registrada en este Sitio por los Usuarios, por lo que no asume ninguna responsabilidad por dichos registros o inscripciones. Sin perjuicio de lo anterior, “Grontify” se reserva la facultad de monitorear dichos registros con la frecuencia que discrecionalmente determine, así como a suprimir cualquier registro cuyo contenido sea, de manera enunciativa mas no limitativa: (i) ilegal, inmoral, difamatorio, calumnioso, vulgar, obsceno, étnica o racialmente discriminatorio, o cualquier otro material cuyo contenido incite algún comportamiento o conducta que pueda ser considerada ilegal o contra las buenas costumbres, o pueda acarrear algún tipo de responsabilidad; (ii) Promociones u ofertas de cualquier especie, (iii) Mensajes registrados por Usuarios atribuyendo la autoría de los mismos a otras personas; (iv) información personal (p.ej.: número telefónico, domicilio, números de cuenta, historial laboral, etc.); (v) Mensajes registrados por terceros que pretenden hacerse pasar por voceros autorizados; (vi) Mensajes a través de los cuales se ofrezca información privada o propiedades intelectuales; (vii) Mensajes múltiples colocados por un mismo Usuario; y/o (viii) Cualquier tipo de mensajes encadenados o seriados.</p>
        <h4>TRANSMISIÓN DE INFORMACIÓN PERSONAL</h4>
        <p>El Usuario reconoce y acepta que la información que proporcione a “Grontify” a través de este Sitio, podrá ser re-transmitida por “Grontify” a otras personas de la empresa.</p>
        <h4>MONEDA</h4>
        <p>Los costos de los productos ofrecidos en el Sitio están expresados en pesos mexicanos (MXN).</p>
        <h4>AVISOS DE DERECHOS DE AUTOR Y MARCAS</h4>
        <p>Todos los contenidos del Sitio son propiedad de “Grontify” y están registrados bajo los derechos de autor (Copyright) por Grontify SAS de CV Otras marcas de terceros que aparecen en el Sitio son propiedad de dichos terceros, y se utilizan por “Grontify” bajo permiso. Todos los derechos están reservados.</p>
        <h4>MODIFICACIONES</h4>
        <p>“Grontify” se reserva el derecho de modificar el contenido y alcance de los presentes Términos y Condiciones en cualquier momento y según lo considere necesario. El Usuario estará obligado a sujetarse a dichas modificaciones, una vez que éstas entren en vigor.</p>
        <h4>VIOLACIÓN A ESTOS TÉRMINOS Y CONDICIONES</h4>
        <p>“Grontify” se reserva el derecho de llevar a cabo todas las acciones legales que sean necesarias para remediar cualquier violación a los presentes Términos y Condiciones, incluso el de restringir el acceso a este Sitio a determinados Usuarios de Internet.</p>
        <h4>USO DE FUNCIONES Y ARCHIVOS “COOKIES”</h4>
        <p>“Grontify” se reserva el derecho de guardar cierta información en su computadora en la forma de un archivo “cookie” u otro de naturaleza similar, con el propósito de adaptar la presentación del Sitio a sus preferencias personales.</p>
        <h4>JURISDICCIÓN</h4>
        <p>Los Usuarios de este Sitio se someten expresamente a las leyes y tribunales aplicables en la Ciudad de México, Distrito Federal, renunciando a cualquier otra jurisdicción que por cualquier motivo les pudiese llegar a corresponder para dirimir cualquier controversia con “Grontify” derivada de los presentes Términos y Condiciones.</p>
      </Col>
    </Row>
    <Link to="/">Ir al Inicio</Link>
  </div>
);
