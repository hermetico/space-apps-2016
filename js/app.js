var map;
var position;
var lat_offset = -0.1;
var lng_offset = -0.3
var speed = 0.0009;
var zoom = 10;


var high_options = {
    fillColor: '#FF0000',
    strokeWeight: 0,
    fillOpacity: 0.35,
    map: map,
    lat:0, 
    lng:0,
    radius:32000
}

var goal_options = {
    fillColor: 'transparent',
    strokeWeight: 1,
    strokeColor: '#2E2EFE',
    fillOpacity: 0.6,
    map: map,
    lat:0, 
    lng:0,
    radius:700,
}

var low_options = {
    fillColor: '#2EFE2E',
    strokeWeight: 0,
    strokeColor: '#000',
    fillOpacity: 0.6,
    map: map,
    lat:0, 
    lng:0,
    radius:6000,
}


var checkVibration = function(){
    // enable vibration support
    return navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
}

var vibrate = function(){
    navigator.vibrate([500, 300, 100]);
}


var getCurrentPosition = function(currentData){
    
    position = currentData.coords;
    
    high_options.lat = position.latitude + lat_offset;
    high_options.lng = position.longitude + lng_offset;
    goal_options.lat = position.latitude + lat_offset;
    goal_options.lng = position.longitude + lng_offset;
    low_options.lat = position.latitude + lat_offset;
    low_options.lng = position.longitude + lng_offset;
    
    map = new GMaps({
      div: '#map',
      lat: position.latitude,
      lng: position.longitude, 
      zoom: zoom, 
      disableDefaultUI: true, 
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    

}

var createCircle = function(options){
    return map.drawCircle(options)
}

var createInterval = function( circle ){
     window.setInterval(function(){
        var p = circle.getCenter();
        var g = p.lat() + speed;
        var m = p.lng() + speed;
        circle.setCenter(new google.maps.LatLng(g,m));
    }, 200);
}

$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(getCurrentPosition);
      setTimeout(function() {
        // Adds the current position marker
        var marker = map.addMarker({
              lat: position.latitude,
              lng: position.longitude,
              title: 'You',
              click: function(e) {
                alert('You are here!');
              }
            })  
            
        // Adds the circles
        var high = createCircle(high_options);
        //var goal = createCircle(goal_options);
        var low = createCircle(low_options);
        
        // creates the interval to update the circles
        createInterval(high);
        //createInterval(goal);
        createInterval(low);
        
      }, 2000);


 })
