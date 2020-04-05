// Creating map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 4
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Load the USGS geojson data
  var data = "static/data/earthquakes.geojson";
  console.log(data);

  d3.json(data, function(data) {
  // Markers
   data.forEach(feature => {
    var mag = feature.properties.mag;
    console.log(mag);

    var color = "";

    if (mag <= 1) {
        color = "green";
    }
    else if (mag <= 2) {
        color = "yellow";
    }
    else if (mag <= 3) {
        color = "gold"; 
    }
    else if (mag <= 4) {
        color = "orange";
    }
    else if (mag <= 5) {
        color = "magenta";
    }
    else {
        color = "red"; //"#ffffb2", "#b10026"
    }
  
   L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
           fillColor: color,
           fillOpacity: 0.7,
           color: color,
           radius: mag * 10000
        }).bindPopup("<h2>Location: " + feature.properties.place + "<br>Magnitude: " + 
        feature.properties.mag + "</h2><br><h3>Time: " + feature.properties.time + "</h3>")
        .addTo(myMap);
  });

//   stateMarkers.push(
//     L.circle(locations[i].coordinates, {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "white",
//       radius: markerSize(locations[i].state.population)
//     })
//   );

// Binding a pop-up to each layer
    // onEachFeature: function(feature, layer) {
    //     layer.bindPopup("Epicenter: " + feature.properties.place + "<br>Magnitude: " + 
    //     feature.properties.mag + "<br>Time: " + feature.properties.time)
    // }.addTo(myMap);

// Set up the legend
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
        var colors = ["green", "yellow", "#E59866",
                        "orange", "#D35400", "red"];

    // Generate a label for each density interval
    for (var i = 0; i < colors.length; i++) {
        div.innerHTML +=
            '<li style="background:' + colors[i] + '">' + labels[i] + '</li>';
    }
    
    return div;
    }    

// Adding legend to the map
    legend.addTo(myMap);

});
  