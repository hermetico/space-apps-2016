var map;
var position;
var lat_offset = -0.01;
var lng_offset = -0.02


var high_options = {
    fillColor: '#FF0000',
    strokeWeight: 0,
    fillOpacity: 0.35,
    map: map,
    lat:0, 
    lng:0,
    radius:1000
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
    radius:500,
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
      lng: position.longitude
    });

}

var createCircle = function(options){
    return map.drawCircle(options)
}

var createInterval = function( circle ){
     window.setInterval(function(){
        var p = circle.getCenter();
        var g = p.lat()+0.0001;
        var m = p.lng()+0.0001;    
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
        var goal = createCircle(goal_options);
        var low = createCircle(low_options);
        
        // creates the interval to update the circles
        createInterval(high);
        createInterval(goal);
        createInterval(low);
        
      }, 1000);


 })
