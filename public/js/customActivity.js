define(function () {
  console.log("Custom Activity JS loaded");

  window.onload = function () {
    if (window.journey) {
      window.journey.onInit(function (data) {
        console.log('Activity initialized with:', data);
      });

      window.journey.onSave(function () {
        const payload = {
          arguments: {
            execute: {
              inArguments: [{ message: "Hola desde Render" }],
              url: "https://custom-activity-ubrc.onrender.com/execute"
            }
          }
        };
        window.journey.trigger('save', payload);
      });
    }
  };
});