var map;
function initialize() {
    // Create a simple map.
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: -28, lng: 137}
  });
  //adding drawing manager
    var drawingManager = new google.maps.drawing.DrawingManager({
    map:map,
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.RECTANGLE
      ]
    }
  });

  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
      switch(event.type){
          case google.maps.drawing.OverlayType.MARKER:
            map.data.add(new google.maps.Data.Feature({geometry:new google.maps.Data.Point(event.overlay.getPosition())}));
            break;
          case google.maps.drawing.OverlayType.RECTANGLE:
            var b=event.overlay.getBounds(),
                p=[b.getSouthWest(),{lat:b.getSouthWest().lat(),lng:b.getNorthEast().lng()},b.getNorthEast(),{lng:b.getSouthWest().lng(),lat:b.getNorthEast().lat()}]
            map.data.add(new google.maps.Data.Feature({geometry:new google.maps.Data.Polygon([p])}));
            break;
          case google.maps.drawing.OverlayType.POLYGON:
            map.data.add(new google.maps.Data.Feature({geometry:new google.maps.Data.Polygon([event.overlay.getPath().getArray()])}));
            break;
          case google.maps.drawing.OverlayType.POLYLINE:
            map.data.add(new google.maps.Data.Feature({geometry:new google.maps.Data.LineString(event.overlay.getPath().getArray())}));
            break;
          case google.maps.drawing.OverlayType.CIRCLE:
            map.data.add(new google.maps.Data.Feature({properties:{radius:event.overlay.getRadius()},geometry:new google.maps.Data.Point(event.overlay.getCenter())}));
            break;
      }

    });

    google.maps.Map.prototype.getGeoJson=function(callback){
        var geo={"type": "FeatureCollection","features": []},
            fx=function(g,t){

              var that  =[],
                  arr,
                  f     = {
                            MultiLineString :'LineString',
                            LineString      :'Point',
                            MultiPolygon    :'Polygon',
                            Polygon         :'LinearRing',
                            LinearRing      :'Point',
                            MultiPoint      :'Point'
                          };
            
              switch(t){
                case 'Point':
                  g=(g.get)?g.get():g;
                  return([g.lng(),g.lat()]);
                  break;
                default:
                  arr= g.getArray();
                  for(var i=0;i<arr.length;++i){
                    that.push(fx(arr[i],f[t]));
                  }
                  if( t=='LinearRing' 
                        &&
                      that[0]!==that[that.length-1]){
                    that.push([that[0][0],that[0][1]]);
                  }
                  return that;
              }
            };
        
        this.data.forEach(function(feature){
        var _feature     = {type:'Feature',properties:{}}
            _id          = feature.getId(),
            _geometry    = feature.getGeometry(),
            _type        =_geometry.getType(),
            _coordinates = fx(_geometry,_type);
            
            _feature.geometry={type:_type,coordinates:_coordinates};
            if(typeof _id==='string'){
              _feature.id=_id;
            }
            
            geo.features.push(_feature);
            feature.forEachProperty(function(v,k){
                _feature.properties[k]=v;
            });
        }); 
        if(typeof callback==='function'){
          callback(geo);
        }     
        return geo;
      }

     
  }





  //utility functions
  function download(JSONObj, fileName, contentType) {
    var content = JSON.stringify(JSONObj);
      var a = document.createElement("a");
      var file = new Blob([content], {type: contentType});
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
  }

  
  function downloadJsonData(event){
    if(map.getGeoJson().features.length == 0){
      alert("Please draw a shape first in the given map using the 'Draw a Shape' tool");
      return;
    }
    var curTime = new Date().toString().substring(0,24).split(" ").join("")
    var fileName = `GeoJson ${curTime}.json`;
    var contentType = "text/plain"
    download(map.getGeoJson(function(){}), fileName, contentType);
    alert("Your file has been downloaded successfully.");
  }

  
  //Events
  google.maps.event.addDomListener(window, 'load', initialize);
  document.getElementById("downloadGeoJSON").addEventListener("click", downloadJsonData);