let cannaMarkersArray = [];
let garageMakersArray = [];
let parkMarkersArray = [];
let foodMarkersArray = [];

document.getElementById('canna').addEventListener('click', function() {
  if (document.getElementById('canna').checked) {
    cannaMarkers()
  }
})

document.getElementById('garage').addEventListener('click', function() {
  if (document.getElementById('garage').checked) {
    garageMarkers()
  }
})

document.getElementById('open-space').addEventListener('click', function() {
  if (document.getElementById('open-space').checked) {
    parkMarkers()
  }
})

document.getElementById('food-truck').addEventListener('click', function() {
  if (document.getElementById('week').classList.contains('hide')) {
    document.getElementById('week').classList.remove('hide');
    document.getElementById('week').classList.add('show');
  } else {
    document.getElementById('week').classList.remove('show');
    document.getElementById('week').classList.add('hide')
  }
})

document.getElementById('monday').addEventListener('click', function() {
  foodMarkersArray = [];
  if (document.getElementById('monday').checked) {
    foodMarkers("Monday")
  }
})

document.getElementById('tuesday').addEventListener('click', function() {
  foodMarkersArray = [];
  if (document.getElementById('tuesday').checkef) {
    foodMarkers('Tuesday')
  }
})

document.getElementById('wednesday').addEventListener('click', function() {
  foodMarkersArray = [];
  if (document.getElementById('wednesday').checked) {
    foodMarkers("Wednesday")
  }
})

document.getElementById('thursday').addEventListener('click', function() {
  foodMarkersArray = [];
  if (document.getElementById('thursday').checked) {
    foodMarkers('Thursday')
  }
})

document.getElementById('friday').addEventListener('click', function() {
  foodMarkersArray = [];
  if (document.getElementById('friday').checked) {
    foodMarkers('Friday')
  }
})

document.getElementById('saturday').addEventListener('click', function() {
  foodMarkersArray = [];
  if (document.getElementById('saturday').checked) {
    foodMarkers('Saturday')
  }
})

document.getElementById('sunday').addEventListener('click', function() {
  foodMarkersArray = [];
  if (document.getElementById('sunday').checked) {
    foodMarkers('Sunday')
  }
})

// API data fetches
function getRemoteJsonUrl(url) {
  return fetch(url).then( (prom) => prom.json())
}

function foodMarkers(day) {
  const api = "https://data.sfgov.org/resource/bbb8-hzi6.json";
  getRemoteJsonUrl(api).then( (obj) => {
    obj.forEach( (element) => {
      if (day === element.dayofweekstr) {
        let position = {lat: Number(element.latitude), lng: Number(element.longitude)};
        var foodMarker = new google.maps.Marker({
          position: position,
          map: map,
        })
        foodMarkersArray.push(foodMarker)
      }
    })
  })
  .catch( (error) => {
    console.log("Error Error! The Food trucks API sucks today!")
  })
}

function parkMarkers() {
  const api = 'https://data.sfgov.org/resource/4udc-s3pr.json';
  getRemoteJsonUrl(api).then( (obj) => {
    obj.forEach( (element) => {
      if (!!element.location_1) {
        let position = {lat: Number(element.location_1.latitude), lng: Number(element.location_1.longitude)};
        var parkMarker = new google.maps.Marker({
          position: position,
          map: map,
        })
        parkMarkersArray.push(parkMarker)
      }
    })
  })
  .catch( (error) => {
    console.log("Error error! The open space API sucks today!")
  })
}

function garageMarkers() {
  const api = 'https://data.sfgov.org/resource/wbn7-6cpj.json';
  getRemoteJsonUrl(api).then( (obj) => {
    obj.forEach( (element) => {
      let position = {lat: element.location_1.coordinates[1], lng: element.location_1.coordinates[0]};
      var garageMarker = new google.maps.Marker({
        position: position,
        map: map,
      })
      garageMakersArray.push(garageMarker)
    })
  })
  .catch( (error) => {
    console.log("Error Error! The Parking Garage API sucks today!")
  })
}

function cannaMarkers() {
  const api = 'https://data.sfgov.org/resource/8r8e-q58k.json';
  getRemoteJsonUrl(api).then( (obj) => {
    obj.forEach( (element) => {
      let position = {lat: element.the_geom.coordinates[1], lng: element.the_geom.coordinates[0]};
      var cannaMarker = new google.maps.Marker({
        position: position,
        map: map,
        color: "green",
      })
      cannaMarkersArray.push(cannaMarker)
    })
  })
  .catch( (error) => {
    console.log("Error Error! The Medial Dispensary API sucks today!")
  })
}


// google maps API
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78662965327916, lng: -122.41941327978273},
    zoom: 12
  });
}

function removeMarkers(array) {
  array.forEach( (element) => {
    element.getMap() !== null ? element.setMap(null) : element.setMap(map)
  })
}

// smooth scroll to the top. found via: https://gist.github.com/ricardozea/abb9f98a19f6d04a0269
var timeOut;
function scrollToTop() {
	if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
		window.scrollBy(0,-50);
		timeOut=setTimeout('scrollToTop()',10);
	}
	else clearTimeout(timeOut);
}
