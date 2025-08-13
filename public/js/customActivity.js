define(['postmonger'], function (Postmonger) {
  'use strict';

  let connection = new Postmonger.Session();
  let payload = {};
  
  // Se ejecuta cuando el DOM está listo
  $(window).ready(onRender);

  // Eventos de Journey Builder
  connection.on('initActivity', initialize);
  connection.on('clickedNext', save);
  
  function onRender() {
    connection.trigger('ready');
  }

  // Inicializa la actividad y carga la configuración guardada
  function initialize(data) {
    if (data) {
      payload = data;
    }
    
    let hasInArguments = Boolean(
      payload['arguments'] &&
      payload['arguments'].execute &&
      payload['arguments'].execute.inArguments &&
      payload['arguments'].execute.inArguments.length > 0
    );

    let inArguments = hasInArguments ? payload['arguments'].execute.inArguments[0] : {};
    
    // Si hay un mensaje guardado, lo mostramos en el textarea
    if (inArguments.message) {
      $('#sms-message').val(inArguments.message);
    }

    // Habilita el botón de "Done" para poder guardar
    connection.trigger('updateButton', { button: 'next', text: 'Done', enabled: true });
  }
  
  // Lógica de guardado
  function save() {
    let message = $('#sms-message').val();

    // Estructura el payload que se enviará a Journey Builder
    // Solo necesitamos guardar el 'message', los otros argumentos en config.json son dinámicos
    payload['arguments'].execute.inArguments = [{
      "message": message
    }];
    
    // Indica que la configuración está completa
    payload['metaData'].isConfigured = true;

    console.log('Saving Payload:', JSON.stringify(payload, null, 2));

    // Envía el payload actualizado a Journey Builder
    connection.trigger('updateActivity', payload);
  }
});
