define(['postmonger'], function (Postmonger) {
    'use strict';

    let connection = new Postmonger.Session();
    let payload = {};
    
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('clickedNext', save);
    
    function onRender() {
        connection.trigger('ready');
    }

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
        
        // Load saved values into the UI
        $('#email-prompt').val(inArguments.promptTemplate || '');
        $('#email-tone').val(inArguments.emailTone || 'Friendly and Casual');
        
        connection.trigger('updateButton', { button: 'next', text: 'Done', enabled: true });
    }
    
    function save() {
        let promptTemplate = $('#email-prompt').val();
        let emailTone = $('#email-tone').val();

        // Save the user's configuration. Other data points are added at execution time.
        payload['arguments'].execute.inArguments = [{
            "promptTemplate": promptTemplate,
            "emailTone": emailTone
        }];
        
        payload['metaData'].isConfigured = true;

        console.log('Saving Payload:', JSON.stringify(payload, null, 2));
        connection.trigger('updateActivity', payload);
    }
});