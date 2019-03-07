window.onload = function(){
alert('If you give it permission, this web page will access to your location in order to demonstrate how device sensors can interact with web maps.');
} 

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmhhdHRiMiIsImEiOiJjam82azdmNjIwYjk3M2tvYThuNzQxMXM0In0.-DsIcDsDaHJkJoCqDnTnhg';

var light = L.tileLayer(mbUrl, {id: 'mapbox.light', maxZoom:18, attribution: mbAttr}),
dark = L.tileLayer(mbUrl, {id: 'mapbox.dark', maxZoom:18, attribution: mbAttr});

var map = L.map('map', {
	layers:[light]}).fitWorld();

var baseLayers = {
	"light": light,
	"dark": dark
};
L.control.layers(baseLayers).addTo(map);

 
//the below JS code takes advantage of the Geolocate API as it is incorporated in the Leaflet JS API with the locate method
function onLocationFound(e) { //this function does three things if the location is found: it defines a radius variable, adds a popup to the map, and adds a circle to the map.

  var radius = e.accuracy / 2; //this defines a variable radius as the accuracy value returned by the locate method divided by 2. It is divided by 2 because the accuracy value is the sum of the estimated accuracy of the latitude plus the estimated accuracy of the longitude. The unit is meters.

  var latlong = e.latlng
  
  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters of this point<br>" + e.latlng).openPopup();

     
  //L.circle(e.latlng, radius).addTo(map); 

  if (radius < 30) {
      L.circle(e.latlng, radius, {color: 'green'}).addTo(map);
  }
  else{
      L.circle(e.latlng, radius, {color: 'red'}).addTo(map);
  }
  


function onLocationError(e) {
  alert(e.message);
}
//this function runs if the location is not found when the locate method is called. It produces an alert window that reports the error

//these are event listeners that call the functions above depending on whether or not the locate method is successful
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

//This specifies that the locate method should run
map.locate({
  setView: true, //this option centers the map on location and zooms
  maxZoom: 16, // this option prevents the map from zooming further than 16, maintaining some spatial context even if the accuracy of the location reading allows for closer zoom
  timeout: 15000, // this option specifies when the browser will stop attempting to get a fix on the device's location. Units are miliseconds. Change this to 5000 and test the change. Before you submit, change this to 15000.
  watch: false, // you can set this option from false to true to track a user's movement over time instead of just once. For our purposes, however, leave this option as is.
});
}