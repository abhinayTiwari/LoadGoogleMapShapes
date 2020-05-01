//global variables
var map;

//intialization of map
(function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: -28, lng: 137 },
  });
})();

//utility functions
document
  .getElementById("jsonDataPath")
  .addEventListener("change", handleFileSelect, false);

function handleFileSelect(event) {
  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event) {
  var jsonObj = JSON.parse(event.target.result);
  map.data.forEach(function (f) {
    map.data.remove(f);
  });
  map.data.addGeoJson(jsonObj);
}

function reset() {
  map.data.forEach(function (f) {
    map.data.remove(f);
  });
  document.getElementById("jsonDataPath").value = "";
}
