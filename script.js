require([
      "esri/Map",
      "esri/layers/CSVLayer",
      "esri/views/MapView",
      "esri/config",
      "esri/core/urlUtils",
      "dojo/domReady!"
    ], function(
      Map,
      CSVLayer,
      MapView,
      esriConfig,
      urlUtils
    ) {
 
     var url = "https://raw.githubusercontent.com/gbrunner/Advanced_Python_for_GIS_and_RS/master/Week%202/stl_crime_wgs_84.csv";
     esriConfig.request.corsEnabledServers.push('https://rawgit.com');
  
       const template = {
        title: "St. Louis Crime Heatmap",
        content: "Crime {Crime} {type} Neighboorhood {Neighborhood} on {ILEADSStreet}."
        };
  
        const csvLayer = new CSVLayer({
          url: url,
          copyright: "St. Louis Police Department",
          latitudeField:"Lat",
        longitudeField:"Lon",
          popupTemplate: template
        }); 
  
      csvLayer.renderer = {
        type: "heatmap",
  colorStops: [
    { ratio: 0, color: "rgba(255, 255, 255, 0)" },
    { ratio: 0.2, color: "rgba(255, 255, 255, 1)" },
    { ratio: 0.5, color: "rgba(255, 140, 0, 1)" },
    { ratio: 0.8, color: "rgba(255, 140, 0, 1)" },
    { ratio: 1, color: "rgba(255, 0, 0, 1)" }
  ],
  minPixelIntensity: 0,
  maxPixelIntensity: 100
};

      var map = new Map({
        basemap: "gray",
        layers: [csvLayer]
      });

      var view = new MapView({
          container: "viewDiv",
          map: map,
          center: [-90.19, 38.62],
          zoom: 13,
      });

    });
