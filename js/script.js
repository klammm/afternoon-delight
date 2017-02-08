let cannaMarkersArray = [];
let garageMakersArray = [];
let parkMarkersArray = [];
let foodMarkersArray = [];
let beerMarkersArray = [];
let defaultMarkersArray = [];
let circleArray = [];

// checkboxes

checkboxClick('canna', cannaMarkers)
checkboxClick('garage', garageMarkers)
checkboxClick('open-space', parkMarkers)
checkboxClick('food-truck')
checkboxClick('beer', beerMarkers)

function checkboxClick(id, funct) {
  if (id === 'food-truck') {
    document.getElementById(id).addEventListener('click', function() {
      if (document.getElementById('week').classList.contains('hide')) {
        document.getElementById('week').classList.remove('hide');
        document.getElementById('week').classList.add('show');
      } else {
        document.getElementById('week').classList.remove('show');
        document.getElementById('week').classList.add('hide')
      }
    })
  } else {
    document.getElementById(id).addEventListener('click', function() {
      if (document.getElementById(id).checked) {
        funct()
      }
    })
  }
}

// food truck days

let daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
for (let i = 0; i < daysOfTheWeek.length; i++) {
  foodweekClick(daysOfTheWeek[i])
}

function foodweekClick(id) {
  document.getElementById(id).addEventListener('click', function() {
    foodMarkersArray = [];
    if (document.getElementById(id).checked) {
      let capitalized = id[0].toUpperCase() + id.slice(1);
      foodMarkers(capitalized)
    }
  })
}

// API data fetches

function getRemoteJsonUrl(url) {
  return fetch(url).then( (prom) => prom.json())
}

function beerMarkers() {
  const api = 'https://public-us.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database&q=san+francisco&facet=style_name&facet=cat_name&facet=name_breweries&facet=country';
  let array = [];
  getRemoteJsonUrl(api).then( (obj) => {
    obj.records.forEach( (element) => {
      if (array.indexOf(element.fields.name_breweries) === -1) {
        let position = {lat: element.fields.coordinates[0], lng: element.fields.coordinates[1]};
        var beerMarker = new google.maps.Marker({
          position: position,
          map: map,
          icon: 'img/bar.png'
        })
        if (!!element.fields.address1) {
          var contentString = "<h6><strong>" + element.fields.name_breweries + "</strong></h6><p>Address: " + element.fields.address1 + "</p>"
        } else {
          var contentString = "<h6><strong>" + element.fields.name_breweries + "</strong></h6><p>Address: Not Found</p>"
        }
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        beerMarker.addListener('click', function() {
          infowindow.open(map, beerMarker);
        });
        google.maps.event.addListener(map, 'mousemove', function (event) {
          infowindow.close();
        });
        beerMarkersArray.push(beerMarker)
        array.push(element.fields.name_breweries)
      }
    })
  })
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
          icon: "img/foodtruck.png"
        })
        let contentString = "<h6><strong>" + element.applicant + "</strong></h6>" + "<p>Hours: " + element.starttime + " - "
        + element.endtime + "</p><p>Address: " + element.location + "</p><br><br><p>Location Description: "
        + element.locationdesc + "</p><br><br><p>" + element.optionaltext + "</p>";
        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 400
        });
        foodMarker.addListener('click', function() {
          infowindow.open(map, foodMarker)
        })
        google.maps.event.addListener(map, 'mousemove', function (event) {
          infowindow.close();
        });
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
          icon: 'img/walkingtour.png'
        })
        let contentString = "<h6><strong>" + element.parkname + "</strong></h6><p>Park Manager: "
        + element.psamanager + "</p><br><p>Phone #: " + element.number + "</p><p>Email: " + element.email + "</p>";
        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 400
        })
        parkMarker.addListener('click', function() {
          infowindow.open(map, parkMarker)
        })
        google.maps.event.addListener(map, 'mousemove', function (event) {
          infowindow.close();
        });
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
        icon: "img/car.png"
      })
      if (element.landusetyp !== " ") {
        var contentString = "<h6>Address: " + element.address + "</h6><p>Landuse Type: "
        + element.landusetyp + "</p><br><p>Capacity: " + element.regcap + "</p>";
        if (element.valetcap !== "0") {
          contentString += "<br><p>Valet Capacity: " + element.valetcap + "</p>"
        }
      } else {
        var contentString = "<h6>Address: " + element.address + "</h6><p>Capacity: " + element.regcap + "</p>";
        if (element.valetcap !== "0") {
          contentString += "<br><p>Valet Capacity: " + element.valetcap + "</p>"
        }
      }
      if (element.garorlot === "G") {
        contentString += "<br><p>Type: Garage</p>"
      } else {
        contentString += "<br><p>Type: Lot</p>"
      }
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
      })
      garageMarker.addListener('click', function() {
        infowindow.open(map, garageMarker)
      })
      google.maps.event.addListener(map, 'mousemove', function (event) {
        infowindow.close();
      });
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
        icon: 'img/tree.png',
      })
      let contentString = "<h6>" + element.business_n + "</h6><p>Address: " + element.business_a
      + "</p><br><p>Location type: " + element.location_t  + "</p><br><p>Neighborhood: "
      + element.neighborho + "</p>";
      let infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
      })
      cannaMarker.addListener('click', function() {
        infowindow.open(map, cannaMarker)
      })
      google.maps.event.addListener(map, 'mousemove', function (event) {
        infowindow.close();
      });
      cannaMarkersArray.push(cannaMarker)
    })
  })
  .catch( (error) => {
    console.log("Error Error! The Medical Dispensary API sucks today!")
  })
}


// google maps API manipulation
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

// metrics manipulation

document.getElementById('address').onkeydown = function(e){
  if(e.keyCode == 13 || event.which == 13){
    let value = document.getElementById('address').value;
    let radius = document.getElementById('slider').value;
    addressCenter(value)
  }
};

document.getElementById('submit').addEventListener('click', function() {
  let value = document.getElementById('address').value;
  let radius = document.getElementById('slider').value;
  addressCenter(value)
})



function addressCenter(string, radius) {
  let api = `https://maps.googleapis.com/maps/api/geocode/json?address=${string}&key=${GMAPS_KEY}`;
  getRemoteJsonUrl(api).then( (obj) => {
    if (circleArray.length === 0) {
      let position = {lat: obj.results[0].geometry.location.lat, lng: obj.results[0].geometry.location.lng}
      var defaultMarker = new google.maps.Marker({
        position: position,
        map: map,
      })
      var circle = new google.maps.Circle({
        map: map,
        radius: document.getElementById('slider').value * 100,    // 10 miles in metres
        fillColor: '#AA0000'
      });

      let slider = document.getElementById('slider');

      slider.addEventListener('input', function() {
        let radiusValue = slider.value;
        circle.setRadius(radiusValue * 100)
      })

      circleArray.push(circle)
      defaultMarkersArray.push(defaultMarker)
      circle.bindTo('center', defaultMarker, 'position')
      map.setCenter(position)
      map.setZoom(15)
    } else {
      removeMarkers(circleArray)
      removeMarkers(defaultMarkersArray)
      circleArray = []
      defaultMarkersArray = []
    }
    var contentString = "<h6>" + obj.results[0].formatted_address + "</h6>";
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300,
    })

    defaultMarker.addListener('click', function() {
      infowindow.open(map, defaultMarker)
    })

    google.maps.event.addListener(map, 'mousemove', function (event) {
      infowindow.close();
    });


  })
  .catch( (error) => {
    console.log("Error Error! The address center API is sucking today!")
  })
}

// Distance Radius



// smooth scroll to the top. found via: https://gist.github.com/ricardozea/abb9f98a19f6d04a0269
var timeOut;
function scrollToTop() {
	if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
		window.scrollBy(0,-50);
		timeOut=setTimeout('scrollToTop()',10);
	}
	else clearTimeout(timeOut);
}
