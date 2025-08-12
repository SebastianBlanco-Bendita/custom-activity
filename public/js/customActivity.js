define(function () {
    console.log("Custom Activity JS cargado");

    window.onload = function () {
        if (window.journey) {
            window.journey.onInit(function (data) {
                console.log('Activity initialized with:', data);
            });

            window.journey.onSave(function () {
                const payload = {
                    arguments: {
                        execute: {
                            inArguments: [{ message: "Hola desde Heroku" }],
                            url: "https://TU-APP.herokuapp.com/execute"
                        }
                    }
                };
                window.journey.trigger('save', payload);
            });
        }
    };
});