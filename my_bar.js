/* Dependencies
[
    "https://cdn.jsdelivr.net/npm/chart.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.bundle.js"
]
*/

looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "hello_world",
  label: "Hello World",
  options: {
  },
  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = '<canvas id="myChart"></canvas>';

    // Create a container element to let us center the text.
    //var container = element.appendChild(document.createElement("canvas"));
    //container.className = "hello-world-vis";

    // Create an element to contain the text.
    //this._textElement = container.appendChild(document.createElement("div"));

  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {

    const labels = []
    const _data = []
    const dummy = []

    // format the data
    data.forEach(function(d) {
    labels.push(d[queryResponse.fields.dimensions[0].name]["value"]);
    _data.push(d[queryResponse.fields.measures[0].name]["value"]);  
    dummy.push(d[queryResponse.fields.dimensions[1].name]["value"]);
      
    });
    
        // const labels = [
        // 'January',
        // 'February',
        // 'March',
        // 'April',
        // 'May',
        // 'June',
        // ];
        const mydata = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            //data: [0, 10, 5, 2, 20, 30, 45],
            data : _data,
            dummy : dummy
        }]
        };
        const myconfig = {
        type: 'bar',
        data: mydata,
        options: {
            "animation": {
              "duration": 1,
              "onComplete": function() {
                var chartInstance = this.chart,
                  ctx = chartInstance.ctx;

                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                this.data.datasets.forEach(function(dataset, i) {
                  var meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach(function(bar, index) {
                    var data = dataset.data[index];
                    var dummy = dataset.dummy[index];
                    ctx.fillText(data, bar._model.x, bar._model.y - 20);
                    ctx.fillText(dummy, bar._model.x, bar._model.y - 5);
                  });
                });
              }
            }
          }
        }

        var myChart = new Chart(
            document.getElementById('myChart'),
            myconfig
        );
    // Clear any errors from previous updates
    this.clearErrors();
    
    

    // We are done rendering! Let Looker know.
    done()
  }
});
