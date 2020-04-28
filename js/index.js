window.onload = function () { 
// var geocoder;
// var map;
// var polygonArray = [];

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 4,
//       center: {lat: -28, lng: 137}
//     });
  
//     // NOTE: This uses cross-domain XHR, and may not work on older browsers.
//     map.data.loadGeoJson(
//         'https://storage.googleapis.com/mapsdevsite/json/google.json');
//   }

// function initialize() {
//     map = new google.maps.Map(
//     document.getElementById("map_canvas"), {
//         center: new google.maps.LatLng(37.4419, -122.1419),
//         zoom: 13,
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     });
//     var drawingManager = new google.maps.drawing.DrawingManager({
//         drawingMode: google.maps.drawing.OverlayType.POLYGON,
//         drawingControl: true,
//         drawingControlOptions: {
//             position: google.maps.ControlPosition.TOP_CENTER,
//             drawingModes: [
//             google.maps.drawing.OverlayType.MARKER,
//             google.maps.drawing.OverlayType.CIRCLE,
//             google.maps.drawing.OverlayType.POLYGON,
//             google.maps.drawing.OverlayType.POLYLINE,
//             google.maps.drawing.OverlayType.RECTANGLE]
//         },
//         markerOptions: {
//             icon: 'images/car-icon.png'
//         },
//         circleOptions: {
//             fillColor: '#ffff00',
//             fillOpacity: 1,
//             strokeWeight: 5,
//             clickable: false,
//             editable: true,
//             zIndex: 1
//         },
//         polygonOptions: {
//             fillColor: '#BCDCF9',
//             fillOpacity: 0.5,
//             strokeWeight: 2,
//             strokeColor: '#57ACF9',
//             clickable: false,
//             editable: false,
//             zIndex: 1
//         }
//     });
//     console.log(drawingManager)
//     drawingManager.setMap(map)

//     google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
//         document.getElementById('info').innerHTML += "polygon points:" + "<br>";
//         for (var i = 0; i < polygon.getPath().getLength(); i++) {
//             document.getElementById('info').innerHTML += polygon.getPath().getAt(i).toUrlValue(6) + "<br>";
//         }
//         polygonArray.push(polygon);
//     });

// }
// google.maps.event.addDomListener(window, "load", initialize);

var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

function initMap() {
  

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    },
    markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);
  
}
initMap();
}