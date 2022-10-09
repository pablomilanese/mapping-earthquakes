let line = [
    [33.9416,-118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
  [47.4502, -122.3088]
  ];
  
  // We create the tile layer that will be the background of our map.
  let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });
  
  let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18, 
      accessToken: API_KEY
  });
  
  // We create the dark view tile layer that will be an option for our map.
  let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });
  
  // We create the dark view tile layer that will be an option for our map.
  let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });
  
  // Create a base layer that holds both maps.
  let baseMaps = {
    "Day Navigation": light,
    "Night Navigation": dark,
    "Streets": streets,
    "Satellite Streets": satelliteStreets
  };
  
  // Create the map object with center, zoom level and default layer.
  let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
  })
  
  // Pass our map layers into our layers control and add the layers control to the map.
  L.control.layers(baseMaps).addTo(map);
  
  // Accessing the airport GeoJSON URL
  let torontoHoods = "https://raw.githubusercontent.com/Baylex/Mapping_Earthquakes/main/torontoNeighborhoods.json ";
  
  // Create a style for the lines.
  let myStyle = {
    color: "blue",
    weight: 1
  }
  
  // Grabbing our GeoJSON data.
  d3.json(torontoHoods).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
    style : myStyle,
    onEachFeature : function(feature,layer) {
  layer.bindPopup("<h3> Area Name: "+ feature.properties.AREA_NAME + "</h3> <hr> <h3> Area ID: " +feature.properties.AREA_S_CD +"</h3>");
  }
  }).addTo(map);
  });