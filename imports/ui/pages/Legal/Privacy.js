import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import {Grid, Row, Col} from 'react-bootstrap';

export const Privacy = () => (
  <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
    <Helmet
      title="Política de privacidad"
      meta={[
          {"name": "description", "content": "Política de privacidad. Grontify Frutas y verduras a domicilio."}
      ]}
    />
    <h1>Privacidad</h1>
    <h3>Aviso de privacidad del usuario</h3>

    <Row>
      <Col sm={12}>
        <p>Grontify recopila informaci&oacute;n acerca de usted cuando usted utiliza nuestras aplicaciones m&oacute;viles, sitios web y otros productos y servicios en l&iacute;nea (conjuntamente, los &ldquo;Servicios&rdquo;) y a trav&eacute;s de otras interacciones y comunicaciones que tenga con nosotros. Los Servicios son prestados por Grontify SAS de CV, y este Aviso de Privacidad se aplica a la informaci&oacute;n recopilada y utilizada por Grontify SAS de CV (denominada en adelante como &ldquo;Grontify&rdquo; o &ldquo;nosotros&rdquo;).</p>
        <p>&nbsp;</p>
        <p>&Aacute;mbito y aplicaci&oacute;n</p>
        <p>&nbsp;</p>
        <p>Este Aviso de Privacidad (&ldquo;Aviso&rdquo;) se aplica a las personas localizadas en M&eacute;xico que utilizan nuestras aplicaciones y nuestros Servicios para solicitar viajes, entrega u otros servicios bajo demanda (&ldquo;Usuarios&rdquo;). Este Aviso no se aplica a la informaci&oacute;n que obtenemos de, o acerca de los conductores, mensajeros, o de cualesquiera otras personas que utilizan la plataforma de Grontify bajo licencia (conjuntamente &ldquo;Repartidores&rdquo;). Si usted interact&uacute;a con los Servicios tanto como Usuario y como Conductor, se aplicar&aacute;n los avisos de privacidad respectivos a sus diferentes interacciones.</p>
        <p>&nbsp;</p>
        <p>Recopilaci&oacute;n de informaci&oacute;n</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n que usted nos proporciona</p>
        <p>&nbsp;</p>
        <p>Recopilamos la informaci&oacute;n que usted nos proporciona directamente, cuando crea o modifica su cuenta, solicita servicios bajo demanda, se pone en contacto con atenci&oacute;n al cliente o cuando se comunica de cualquier otra forma con nosotros, incluyendo cuando se postula para un empleo en Grontify. Esta informaci&oacute;n incluye: nombre, correo electr&oacute;nico, n&uacute;mero de tel&eacute;fono, direcci&oacute;n postal, foto del perfil, m&eacute;todo de pago, los art&iacute;culos solicitados (para servicios de entrega), notas de entrega, informaci&oacute;n incluida en su CV y carta de presentaci&oacute;n y otra informaci&oacute;n que usted elija proporcionar.</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n que recopilamos a trav&eacute;s de su uso de nuestros Servicios</p>
        <p>&nbsp;</p>
        <p>Cuando utiliza nuestros Servicios, recopilamos informaci&oacute;n sobre usted en las siguientes categor&iacute;as generales:</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n de ubicaci&oacute;n: Cuando utiliza los Servicios de viajes o entrega, recopilamos datos de ubicaci&oacute;n exacta sobre el viaje desde la aplicaci&oacute;n Grontify utilizada por el Conductor. Si usted permite a la aplicaci&oacute;n de Grontify acceder a los servicios de ubicaci&oacute;n a trav&eacute;s del sistema de permisos que utiliza su sistema operativo para m&oacute;viles (&ldquo;plataforma&rdquo;), tambi&eacute;n podremos recopilar la ubicaci&oacute;n exacta de su dispositivo cuando la aplicaci&oacute;n se est&eacute; ejecutando en el primer o segundo plano. Tambi&eacute;n podemos obtener su ubicaci&oacute;n aproximada de su direcci&oacute;n IP. La informaci&oacute;n de ubicaci&oacute;n podr&iacute;a ser considerada como datos personales sensibles.</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n de contactos: Si permite que la aplicaci&oacute;n Grontify acceda a la libreta de direcciones de su dispositivo a trav&eacute;s del sistema de permisos que utiliza su plataforma, podemos acceder y almacenar nombres e informaci&oacute;n de contacto de su libreta de direcciones para facilitar las interacciones sociales a trav&eacute;s de nuestros Servicios y para otros fines descritos en este Aviso.</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n de la transacci&oacute;n: Recopilamos datos de la transacci&oacute;n relacionados con su uso de nuestros Servicios, estos son, el tipo de servicio solicitado, la fecha y el momento de la prestaci&oacute;n del servicio, cantidad cargada, distancia recorrida y detalles relacionados con la transacci&oacute;n. Adem&aacute;s, si alguien utiliza su c&oacute;digo de promoci&oacute;n, podemos asociar su nombre con esa persona.</p>
        <p>&nbsp;</p>
        <p>Uso e informaci&oacute;n de preferencias: Recopilamos informaci&oacute;n sobre c&oacute;mo usted y los visitantes del sitio interact&uacute;an con nuestros Servicios, preferencias expresadas y configuraciones seleccionadas. En algunos casos lo hacemos a trav&eacute;s del uso de cookies, etiquetas de p&iacute;xel y tecnolog&iacute;as similares que crean y mantienen identificadores &uacute;nicos. Para obtener m&aacute;s informaci&oacute;n acerca de estas tecnolog&iacute;as, consulte nuestra Declaraci&oacute;n de Cookies.</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n del dispositivo: Recopilamos informaci&oacute;n acerca de su dispositivo m&oacute;vil, esto es, el modelo de hardware, el sistema operativo y la versi&oacute;n, los nombres y las versiones de los archivos, el idioma preferido, el identificador &uacute;nico de dispositivo, identificadores de publicidad, el n&uacute;mero de serie, la informaci&oacute;n de movimiento del dispositivo y la informaci&oacute;n de la red m&oacute;vil.</p>
        <p>&nbsp;</p>
        <p>Datos de llamadas y SMS: Nuestros Servicios facilitan las comunicaciones entre los Usuarios y los Repartidores. Para facilitar este servicio, recibimos datos de llamadas, esto es, la fecha y hora de la llamada o mensaje SMS, n&uacute;meros de tel&eacute;fono de las partes y el contenido del mensaje SMS.</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n del registro: Cuando usted interact&uacute;a con los Servicios, recopilamos los registros del servidor, esto es, direcciones IP del dispositivo, fechas y horas de acceso, funciones de la aplicaci&oacute;n o las p&aacute;ginas visitadas, bloqueos de la aplicaci&oacute;n y otra actividad del sistema, tipo de navegador y el sitio de terceros o servicio que estaba utilizando antes de interactuar con nuestros Servicios.</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n importante sobre la plataforma de permisos</p>
        <p>&nbsp;</p>
        <p>La mayor&iacute;a de las plataformas m&oacute;viles (iOS, Android, etc.) han definido ciertos tipos de datos del dispositivo que las aplicaciones no pueden acceder sin su consentimiento. Y estas plataformas tienen diferentes sistemas de permisos para la obtenci&oacute;n de su consentimiento. La plataforma iOS le alertar&aacute; de la primera vez que la aplicaci&oacute;n Grontify solicita permiso para acceder a determinados tipos de datos y le permitir&aacute; dar su consentimiento (o no darlo) a dicha petici&oacute;n. Los dispositivos Android le notificar&aacute;n los permisos que la aplicaci&oacute;n Grontify busca antes de utilizar por primera vez la aplicaci&oacute;n y el uso de la aplicaci&oacute;n supone su consentimiento. Para obtener informaci&oacute;n sobre los permisos de nivel de plataforma que buscamos, visite nuestras nuevas p&aacute;ginas Permisos iOS y Permisos Android. A veces estos permisos requieren m&aacute;s explicaci&oacute;n que las plataformas mismas proveen y los permisos que solicitamos cambiar&aacute;n con el tiempo, por lo que hemos creado estas p&aacute;ginas para servir como recursos autorizados y actualizados para nuestros usuarios.</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n que obtenemos de otras fuentes</p>
        <p>&nbsp;</p>
        <p>Tambi&eacute;n recibimos informaci&oacute;n de otras fuentes y la combinamos con la informaci&oacute;n que recopilamos a trav&eacute;s de nuestros Servicios.</p>
        <p>&nbsp;</p>
        <p>Si decide enlazar, crear o iniciar sesi&oacute;n en su cuenta de Grontify con un proveedor de pago (p. ej., Google Wallet) o servicio de medios sociales (p. ej., Facebook), o si interact&uacute;a con una aplicaci&oacute;n o sitio web independientes que usan nuestra API (o cuya API usamos), podemos recibir informaci&oacute;n sobre usted o sus conexiones desde ese sitio o aplicaci&oacute;n.</p>
        <p>&nbsp;</p>
        <p>Cuando usted solicita servicios bajo demanda, nuestros Repartidores pueden proporcionarnos una calificaci&oacute;n del Usuario despu&eacute;s de prestarle servicios a usted.</p>
        <p>&nbsp;</p>
        <p>Si usted tambi&eacute;n interact&uacute;a con nuestros Servicios en otra capacidad, por ejemplo, como Repartidor o como usuario de otras aplicaciones que podamos proporcionar, podemos combinar o asociar esa informaci&oacute;n con la informaci&oacute;n que hemos recopilado de usted en su calidad de Contratista o cliente.</p>
        <p>&nbsp;</p>
        <p>Uso de la informaci&oacute;n</p>
        <p>&nbsp;</p>
        <p>Usamos la informaci&oacute;n que recopilamos sobre usted para las siguientes finalidades que son necesarias para prestarle Servicios:</p>
        <p>&nbsp;</p>
        <p>Proveer, mantener y mejorar nuestros Servicios, esto es, facilitar pagos, enviar recibos, proporcionar productos y servicios que usted solicite (y enviar informaci&oacute;n relacionada), desarrollar nuevas funciones, prestar atenci&oacute;n al cliente a Usuarios y Repartidores, desarrollar opciones de seguridad, autenticar usuarios y enviar actualizaciones de productos y mensajes administrativos;</p>
        <p>&nbsp;</p>
        <p>Realizar operaciones internas, esto es, prevenir el fraude y el abuso de nuestros Servicios; solucionar los errores de software y problemas operacionales; llevar a cabo el an&aacute;lisis de datos, pruebas e investigaci&oacute;n; vigilar y analizar las tendencias de uso y de actividad, y llevar a cabo procesos de selecci&oacute;n y reclutamiento de personal para Grontify y para subsidiarias Grontify y entidades afiliadas;</p>
        <p>&nbsp;</p>
        <p>Enviar o facilitar las comunicaciones (i) entre usted y un Repartidor, tales como las horas estimadas de llegada (estimated times of arrival, ETA), o (ii) entre usted y un contacto suyo bajo su direcci&oacute;n en relaci&oacute;n con el uso de ciertas funciones, como compartir referencias, invitaciones, solicitudes de dividir la tarifa o ETA;</p>
        <p>&nbsp;</p>
        <p>De manera adicional, utilizamos su informaci&oacute;n personal para las siguientes finalidades secundarias:</p>
        <p>&nbsp;</p>
        <p>Enviarle comunicaciones que pensamos ser&aacute;n de su inter&eacute;s, incluida la informaci&oacute;n sobre los productos, servicios, promociones, noticias y eventos de Grontify y otras empresas, y cuando est&eacute; permitido y sea de conformidad con las leyes locales aplicables; as&iacute; como para tramitar concursos, sorteos u otras inscripciones de promociones y cumplir con los premios relacionados;</p>
        <p>&nbsp;</p>
        <p>Personalizar y mejorar los Servicios, lo que incluye proporcionar o recomendar funciones, contenido, conexiones sociales, referencias y anuncios.</p>
        <p>&nbsp;</p>
        <p>En caso que no est&eacute; de acuerdo en que sus datos personales sean usados para estos fines adicionales, desde este momento por favor h&aacute;ganoslo saber a trav&eacute;s de <a href="mailto:contacto@grontify.com">contacto@grontify.com</a>.</p>
        <p>&nbsp;</p>
        <p>Podemos transferir la informaci&oacute;n descrita en este Aviso a, y el procesarla y almacenarla en, Estados Unidos y otros pa&iacute;ses, algunos de los cuales pueden tener leyes de protecci&oacute;n de datos de menor protecci&oacute;n que la regi&oacute;n en la que usted reside. Cuando sea este el caso, tomaremos las medidas apropiadas para proteger su informaci&oacute;n personal de acuerdo con este Aviso.</p>
        <p>&nbsp;</p>
        <p>Intercambio de informaci&oacute;n</p>
        <p>&nbsp;</p>
        <p>Compartimos la informaci&oacute;n que recopilamos sobre usted tal como se describe en este Aviso:</p>
        <p>&nbsp;</p>
        <p>A trav&eacute;s de nuestros Servicios</p>
        <p>&nbsp;</p>
        <p>Para estar en posibilidades de prestar los Servicios, compartimos su informaci&oacute;n:</p>
        <p>&nbsp;</p>
        <p>Con Repartidores para prestar los Servicios que usted solicita. Compartimos su nombre, foto (si la proporciona), la calificaci&oacute;n media del Usuario dada por los Repartidores, y las ubicaciones de inicio y/o final del viaje con los Repartidores;</p>
        <p>&nbsp;</p>
        <p>Tambi&eacute;n compartimos su informaci&oacute;n como se menciona a continuaci&oacute;n. En caso de no estar de acuerdo con que su informaci&oacute;n se comparta con esos terceros por favor no utilice los servicios y soluciones que se describen abajo y/o env&iacute;enos un correo electr&oacute;nico a contacto@grontify.com, ya que en caso contrario usted habr&aacute; otorgado su consentimiento para que llevemos a cabo tales transferencias.</p>
        <p>&nbsp;</p>
        <p>En relaci&oacute;n con, o durante las negociaciones de, cualquier fusi&oacute;n, venta de activos de la empresa, consolidaci&oacute;n o reestructuraci&oacute;n, financiaci&oacute;n o adquisici&oacute;n de la totalidad o una parte de nuestro negocio o en otra empresa;</p>
        <p>&nbsp;</p>
        <p>Con terceros para prestarle el servicio que ha solicitado a trav&eacute;s de una asociaci&oacute;n u oferta promocional hecha por un tercero o nosotros;</p>
        <p>&nbsp;</p>
        <p>Con el p&uacute;blico en general si env&iacute;a el contenido en un foro p&uacute;blico, esto es, comentarios en blogs, mensajes de redes sociales u otras funciones de nuestros Servicios que son visibles para el p&uacute;blico en general;</p>
        <p>&nbsp;</p>
        <p>Con terceros con los que usted decida permitirnos compartir la informaci&oacute;n, esto es, otras aplicaciones o sitios web que se integran con nuestra API o Servicios, o los que tienen una API o Servicio con el que nos integramos; y</p>
        <p>&nbsp;</p>
        <p>Otro intercambio importante</p>
        <p>&nbsp;</p>
        <p>Tambi&eacute;n compartimos su informaci&oacute;n:</p>
        <p>&nbsp;</p>
        <p>Con subsidiarias Grontify y entidades afiliadas que en su car&aacute;cter de encargados prestan servicios o realizan el procesamiento de datos en nuestro nombre, o para la centralizaci&oacute;n de datos y/o fines log&iacute;sticos o para que &eacute;stas puedan seguir procesos de selecci&oacute;n y reclutamiento de personal;</p>
        <p>&nbsp;</p>
        <p>Con proveedores, consultores, socios de marketing y otros prestadores de servicios que necesitan acceder a dicha informaci&oacute;n para llevar a cabo el trabajo en nuestro nombre en su car&aacute;cter de encargados;</p>
        <p>&nbsp;</p>
        <p>En respuesta a una solicitud de informaci&oacute;n por una autoridad competente, si creemos que la divulgaci&oacute;n est&aacute; de conformidad con, o es requerida de alguna otra forma por cualquier reglamento o proceso legal aplicable;</p>
        <p>&nbsp;</p>
        <p>Con los funcionarios encargados de hacer cumplir la ley, las autoridades gubernamentales u otras terceras partes si creemos que sus acciones son incompatibles con nuestros acuerdos de Usuario, Condiciones del Servicio, o pol&iacute;ticas, o para proteger los derechos, la propiedad o la seguridad de Grontify u otros; y</p>
        <p>&nbsp;</p>
        <p>En forma agregada y/o an&oacute;nima que no pueda ser razonablemente utilizada para identificarlo.</p>
        <p>&nbsp;</p>
        <p>Funciones para de compartir en los medios sociales</p>
        <p>&nbsp;</p>
        <p>Los Servicios pueden integrarse con funciones para compartir en los medios sociales y otras herramientas relacionadas que le permiten compartir las acciones que toma en nuestros Servicios con otras aplicaciones, sitios o medios, y viceversa. El uso de tales funciones permite compartir informaci&oacute;n con sus amigos o el p&uacute;blico, en funci&oacute;n de la configuraci&oacute;n que establezca con el servicio para compartir informaci&oacute;n en los medios sociales. Por favor, consulte los avisos de privacidad de esos servicios para compartir informaci&oacute;n en los medios sociales para obtener m&aacute;s informaci&oacute;n acerca de c&oacute;mo manejan los datos que usted proporciona o c&oacute;mo los comparten.</p>
        <p>&nbsp;</p>
        <p>Servicios de anal&iacute;tica y publicidad prestados por terceros</p>
        <p>&nbsp;</p>
        <p>Podemos permitir que otros, como encargados, nos presten servicios de medici&oacute;n de audiencia y de anal&iacute;tica para atender anuncios en nuestro nombre a trav&eacute;s de Internet y para realizar un seguimiento e informarnos sobre el desempe&ntilde;o de esos anuncios. Estas organizaciones pueden utilizar cookies, balizas web, SDK y otras tecnolog&iacute;as para identificar su dispositivo cuando usted visita nuestro sitio y utiliza nuestros Servicios, as&iacute; como cuando visita otros sitios y servicios en l&iacute;nea. Para obtener m&aacute;s informaci&oacute;n acerca de estas tecnolog&iacute;as y proveedores de servicios, consulte nuestra Declaraci&oacute;n de Cookies.</p>
        <p>&nbsp;</p>
        <p>Sus elecciones</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n de la cuenta</p>
        <p>&nbsp;</p>
        <p>Usted puede corregir la informaci&oacute;n de su cuenta en cualquier momento iniciando sesi&oacute;n en su cuenta en l&iacute;nea o en la aplicaci&oacute;n. Si usted desea cancelar su cuenta, env&iacute;enos un mensaje de correo electr&oacute;nico a contacto@grontify.com. Tenga en cuenta que en algunos casos podemos retener cierta informaci&oacute;n sobre usted como lo requiere la ley o para fines comerciales leg&iacute;timos en la medida permitida por la ley. Si usted tiene un cr&eacute;dito o deuda pendiente en su cuenta, o si creemos que ha cometido fraude o violado nuestros T&eacute;rminos, podemos tratar de resolver el problema antes de eliminar su informaci&oacute;n.</p>
        <p>&nbsp;</p>
        <p>Sus Derechos</p>
        <p>&nbsp;</p>
        <p>Grontify cumplir&aacute; con las peticiones de las personas en materia de acceso, rectificaci&oacute;n y/o cancelaci&oacute;n de los datos personales que almacena de conformidad con la ley aplicable.</p>
        <p>&nbsp;</p>
        <p>Derechos ARCO</p>
        <p>&nbsp;</p>
        <p>Usted tiene derecho a (i) acceder a sus datos personales y conocer los detalles del tratamiento de los mismos, (ii) rectificarlos en caso de estar desactualizados, ser inexactos o estar incompletos, (iii) cancelarlos cuando considere que no est&aacute;n siendo utilizados conforme a los principios, deberes y obligaciones aplicables, u (iv) oponerse al tratamiento de sus datos personales para fines espec&iacute;ficos. Estos derechos se conocen como los &ldquo;Derechos ARCO&rdquo;.</p>
        <p>&nbsp;</p>
        <p>Ejercicio de Derechos ARCO</p>
        <p>&nbsp;</p>
        <p>Si el ejercicio de sus Derechos ARCO se hace por escrito, la solicitud deber&aacute; ser entregada en nuestro domicilio se&ntilde;alado al final de este Aviso dirigida a la atenci&oacute;n del departamento de protecci&oacute;n de datos personales, acompa&ntilde;ada de la siguiente informaci&oacute;n y documentaci&oacute;n:</p>
        <p>&nbsp;</p>
        <p>Datos de identificaci&oacute;n de usted y/o su representante legal. En el caso del representante legal se deber&aacute; acompa&ntilde;ar del documento con el que se acredite su personalidad.</p>
        <p>&nbsp;</p>
        <p>La descripci&oacute;n de manera clara y precisa de los datos personales respecto de los cuales busca ejercer sus Derechos ARCO, as&iacute; como el derecho o derechos que desea ejercer. Su solicitud deber&aacute; ser firmada al final del escrito y rubricada al calce de cada una de las hojas.</p>
        <p>&nbsp;</p>
        <p>Domicilio para o&iacute;r y recibir la contestaci&oacute;n de Grontify y, en su caso, futuras comunicaciones y/o notificaciones, o bien su deseo de que nuestra contestaci&oacute;n y/o futuras notificaciones o contestaciones sean enviadas a trav&eacute;s de correo electr&oacute;nico, indicando la respectiva cuenta.</p>
        <p>&nbsp;</p>
        <p>Copia de su identificaci&oacute;n oficial vigente y/o de su representante legal.</p>
        <p>&nbsp;</p>
        <p>Si el ejercicio de Derechos ARCO se hace por correo electr&oacute;nico, por favor enviar su comunicaci&oacute;n al departamento de protecci&oacute;n de datos personales, en el correo electr&oacute;nico contacto@grontify.com, acompa&ntilde;ada de la siguiente informaci&oacute;n y documentaci&oacute;n:</p>
        <p>&nbsp;</p>
        <p>Datos de identificaci&oacute;n de usted y/o su representante legal. En el caso del representante legal se deber&aacute; acompa&ntilde;ar del documento con el que se acredite su personalidad. Los documentos podr&aacute;n ser escaneados y adjuntados al correo electr&oacute;nico para verificar su veracidad.</p>
        <p>&nbsp;</p>
        <p>La descripci&oacute;n de manera clara y precisa de los datos personales respecto de los cuales se busca ejercer Derechos ARCO, as&iacute; como el derecho o derechos que se desea ejercer, lo cual podr&aacute; hacerse en el texto del correo electr&oacute;nico o en un documento adjunto escaneado y debidamente firmado al final del mismo y rubricado al calce de cada una de las hojas.</p>
        <p>&nbsp;</p>
        <p>Se&ntilde;alar expresamente el deseo de recibir la contestaci&oacute;n de Grontify a su petici&oacute;n a trav&eacute;s de correo electr&oacute;nico, indicando la direcci&oacute;n de correo electr&oacute;nico que corresponda.</p>
        <p>&nbsp;</p>
        <p>Copia de identificaci&oacute;n oficial vigente de usted y/o de su representante legal. Los documentos podr&aacute;n ser escaneados y adjuntados al correo electr&oacute;nico para verificar su veracidad.</p>
        <p>&nbsp;</p>
        <p>Una vez que la solicitud para ejercer Derechos ARCO se encuentre a disposici&oacute;n de Grontify, independientemente de la forma en que se reciba, se emitir&aacute; la respectiva contestaci&oacute;n en un plazo no mayor a 20 d&iacute;as h&aacute;biles a partir de su recepci&oacute;n. La cual haremos de su conocimiento a trav&eacute;s del medio de contacto elegido. Una vez recibida la contestaci&oacute;n de Grontify tendr&aacute; un plazo de 15 d&iacute;as h&aacute;biles para emitir su contestaci&oacute;n. En caso de que est&eacute; inconforme podr&aacute; contactar a Grontify de manera inmediata a trav&eacute;s de los medios se&ntilde;alados, quedando Grontify a su entera disposici&oacute;n para abordar de inmediato cualquier inquietud. En caso de no responder a la contestaci&oacute;n de Grontify en el plazo se&ntilde;alado, Grontify entender&aacute; de buena fe que est&aacute; conforme con la respuesta.</p>
        <p>&nbsp;</p>
        <p>Si su solicitud de ejercicio de Derechos ARCO es acerca del ejercicio del derecho de acceso, Grontify pondr&aacute; a su disposici&oacute;n la informaci&oacute;n o datos personales a trav&eacute;s de copias simples y/o documentos electr&oacute;nicos.</p>
        <p>&nbsp;</p>
        <p>Grontify, como responsable, podr&aacute; negar el ejercicio de Derechos ARCO por parte de los Usuarios, en los supuestos que lo permita la Ley, por lo que deber&aacute; informar a los Usuarios el motivo de tal decisi&oacute;n. La negativa podr&aacute; ser parcial, en cuyo caso Grontify efectuar&aacute; el acceso, rectificaci&oacute;n, cancelaci&oacute;n u oposici&oacute;n en la parte procedente.</p>
        <p>&nbsp;</p>
        <p>Revocaci&oacute;n del consentimiento al tratamiento de sus datos personales</p>
        <p>&nbsp;</p>
        <p>Usted, como titular de los datos personales, puede revocar su consentimiento para el tratamiento de los mismos conforme al procedimiento previsto en la secci&oacute;n anterior &ldquo;Ejercicio de Derechos ARCO&rdquo;.</p>
        <p>&nbsp;</p>
        <p>Opciones para limitar el uso o divulgaci&oacute;n de sus datos personales</p>
        <p>&nbsp;</p>
        <p>Usted, como titular de los datos personales, puede limitar el uso o divulgaci&oacute;n de los mismos conforme al procedimiento previsto en la secci&oacute;n &ldquo;Ejercicio de Derechos ARCO&rdquo;.</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n de ubicaci&oacute;n</p>
        <p>&nbsp;</p>
        <p>Solicitamos permiso a su dispositivo para que nuestra aplicaci&oacute;n recopile informaci&oacute;n de ubicaci&oacute;n exacta mediante el sistema de permisos que utiliza su sistema operativo m&oacute;vil. Si inicialmente permite la recopilaci&oacute;n de esta informaci&oacute;n, posteriormente puede desactivarla cambiando la configuraci&oacute;n de ubicaci&oacute;n de su dispositivo m&oacute;vil. Sin embargo, esto limitar&aacute; su capacidad para utilizar ciertas opciones de nuestros Servicios. Adem&aacute;s, desactivar nuestra recopilaci&oacute;n de ubicaci&oacute;n exacta de su dispositivo no limitar&aacute; nuestra capacidad de recopilar la informaci&oacute;n de ubicaci&oacute;n de su viaje del dispositivo de un Repartidor ni nuestra capacidad de obtener la ubicaci&oacute;n aproximada de su direcci&oacute;n IP. Si no desea que obtengamos informaci&oacute;n desde el dispositivo de un Repartidor o desde su direcci&oacute;n IP por favor abst&eacute;ngase de utilizar nuestros Servicios.</p>
        <p>&nbsp;</p>
        <p>Informaci&oacute;n de contactos</p>
        <p>&nbsp;</p>
        <p>Tambi&eacute;n podemos solicitar permiso para que nuestra aplicaci&oacute;n recopile y sincronice la informaci&oacute;n de contactos de su dispositivo por el sistema de permisos que utiliza su sistema operativo m&oacute;vil. Si inicialmente permite la recopilaci&oacute;n de esta informaci&oacute;n, posteriormente los usuarios de iOS pueden desactivarla cambiando la configuraci&oacute;n de contactos de su dispositivo m&oacute;vil. La plataforma Android no proporciona esa configuraci&oacute;n.</p>
        <p>&nbsp;</p>
        <p>Comunicaciones promocionales</p>
        <p>&nbsp;</p>
        <p>Puede excluirse de recibir mensajes promocionales de nosotros siguiendo las instrucciones en esos mensajes o conforme a lo se&ntilde;alado en la secci&oacute;n &ldquo;Opciones para limitar el uso o divulgaci&oacute;n de sus datos personales&rdquo;. Si se excluye, todav&iacute;a, podremos enviarle comunicaciones no promocionales, como aquellas sobre su cuenta, sobre Servicios que ha solicitado o sobre nuestras relaciones comerciales en curso.</p>
        <p>&nbsp;</p>
        <p>Cookies y publicidad</p>
        <p>&nbsp;</p>
        <p>Por favor note que utilizamos cookies y otras tecnolog&iacute;as de identificaci&oacute;n en nuestros sitios web, aplicaciones m&oacute;viles, comunicaciones electr&oacute;nicas, anuncios y otros servicios en l&iacute;nea y que a trav&eacute;s de tales cookies recopilamos datos personales para autenticaci&oacute;n de usuarios, recordar las preferencias y la configuraci&oacute;n del Usuario, determinar la popularidad de los contenidos, entrega y medici&oacute;n de la efectividad de las campa&ntilde;as publicitarias, analizar el tr&aacute;fico del sitio y las tendencias y, en general, para la comprensi&oacute;n de los comportamientos e intereses en l&iacute;nea de las personas que interact&uacute;an con nuestros Servicios.</p>
        <p>&nbsp;</p>
        <p>Consulte la secci&oacute;n &ldquo;Uso e informaci&oacute;n de preferencias&rdquo; en la cual se se&ntilde;alan los datos personales que se obtienen a trav&eacute;s del uso de cookies y de otras tecnolog&iacute;as de identificaci&oacute;n.</p>
        <p>&nbsp;</p>
        <p>Usted tiene el derecho de elegir si desea o no aceptar las cookies. Sin embargo, son una parte importante de c&oacute;mo funcionan nuestros Servicios, por lo que debe estar consciente de que si decide rechazar o eliminar las cookies, esto podr&iacute;a afectar la disponibilidad y funcionalidad de los Servicios.</p>
        <p>&nbsp;</p>
        <p>La mayor&iacute;a de los navegadores web est&aacute;n configurados para aceptar cookies por defecto. Si lo prefiere, normalmente puede optar por configurar su navegador para eliminar o rechazar las cookies del navegador. Para ello, siga las instrucciones proporcionadas por su navegador que normalmente se encuentran dentro del men&uacute; &ldquo;Ayuda&rdquo; o &ldquo;Preferencias&rdquo;.</p>
        <p>&nbsp;</p>
        <p>Consulte nuestra Declaraci&oacute;n de Cookies para obtener m&aacute;s informaci&oacute;n sobre sus opciones de gesti&oacute;n de cookies y otras tecnolog&iacute;as relacionadas.</p>
        <p>&nbsp;</p>
        <p>Cambios en el Aviso</p>
        <p>&nbsp;</p>
        <p>Podemos cambiar este Aviso ocasionalmente. Si hacemos cambios a este Aviso, se lo notificaremos a trav&eacute;s de los Servicios o por otros medios, como el correo electr&oacute;nico. El uso continuado de los Servicios despu&eacute;s de dicha notificaci&oacute;n constituye su consentimiento a los cambios. Le recomendamos que revise peri&oacute;dicamente el Aviso para tener la informaci&oacute;n m&aacute;s reciente sobre nuestras pr&aacute;cticas de privacidad.</p>
        <p>&nbsp;</p>
        <p>Cont&aacute;ctenos</p>
        <p>&nbsp;</p>
        <p>Si tiene alguna pregunta sobre este Aviso de Privacidad, comun&iacute;quese con nosotros al correo contacto@grontify.com o escr&iacute;banos a Grontify SAS de CV, Atenci&oacute;n: Legal/Departamento de protecci&oacute;n de datos personales, Domicilio: Paseo de la Reforma 296 Col. Ju&aacute;rez Del. Cuauht&eacute;moc Ciudad de M&eacute;xico, M&eacute;xico CP. 06600.</p>
      </Col>
    </Row>

    <Link to="/">Ir al Inicio</Link>
  </div>
);
