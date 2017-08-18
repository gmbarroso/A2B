function initMap() {

  // Tentando mudar o estilo do mapa
  // var styledMapType = new google.maps.StyledMapType( [
  //   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  //   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  //   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  //   {
  //     featureType: 'administrative.locality',
  //     elementType: 'labels.text.fill',
  //     stylers: [{color: '#d59563'}]
  //   },
  //   {
  //     featureType: 'poi',
  //     elementType: 'labels.text.fill',
  //     stylers: [{color: '#d59563'}]
  //   },
  //   {
  //     featureType: 'poi.park',
  //     elementType: 'geometry',
  //     stylers: [{color: '#263c3f'}]
  //   },
  //   {
  //     featureType: 'poi.park',
  //     elementType: 'labels.text.fill',
  //     stylers: [{color: '#6b9a76'}]
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'geometry',
  //     stylers: [{color: '#38414e'}]
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'geometry.stroke',
  //     stylers: [{color: '#212a37'}]
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'labels.text.fill',
  //     stylers: [{color: '#9ca5b3'}]
  //   },
  //   {
  //     featureType: 'road.highway',
  //     elementType: 'geometry',
  //     stylers: [{color: '#746855'}]
  //   },
  //   {
  //     featureType: 'road.highway',
  //     elementType: 'geometry.stroke',
  //     stylers: [{color: '#1f2835'}]
  //   },
  //   {
  //     featureType: 'road.highway',
  //     elementType: 'labels.text.fill',
  //     stylers: [{color: '#f3d19c'}]
  //   },
  //   {
  //     featureType: 'transit',
  //     elementType: 'geometry',
  //     stylers: [{color: '#2f3948'}]
  //   },
  //   {
  //     featureType: 'transit.station',
  //     elementType: 'labels.text.fill',
  //     stylers: [{color: '#d59563'}]
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'geometry',
  //     stylers: [{color: '#17263c'}]
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'labels.text.fill',
  //     stylers: [{color: '#515c6d'}]
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'labels.text.stroke',
  //     stylers: [{color: '#17263c'}]
  //   }
  // ]
  // {name: 'Night Map'});

  // definindo configurações do meu mapa
  var mapOptions = {
    mapTypeControl: true,
    mapTypeControl: {
      style: google.maps.MapTypeId.ROADMAP,
      position: google.maps.MapTypeId.TOP_CENTER
    },
    center: {lat: -23.5456, lng: -46.6282},
    zoom: 13
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // ponto do usuário sempre cnetralizado ao mudar o tamanho da tela
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });

  new AutocompleteDirectionsHandler(map);

}


function AutocompleteDirectionsHandler(map) {

  // Pedindo permissão ao usuário - Geolocation
  var infoWindow = new google.maps.InfoWindow({map: map});

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Você está aqui'
      });

      // dubstituindo o infowindow pelo marker

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Você está aqui');
      map.setCenter(pos);
    },
    function() {
      handleLocationError(true, marker, map.getCenter());
    });
  } else {
    handleLocationError(false, marker, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, marker, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    }

    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'DRIVING';
    var originInput = document.getElementById('origin-input');
    var destinationInput = document.getElementById('destination-input');
    var modeSelector = document.getElementById('mode-selector');
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);

    var originAutocomplete = new google.maps.places.Autocomplete(
      originInput, {placeIdOnly: true});
      var destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput, {placeIdOnly: true});

        this.setupClickListener('changemode-walking', 'WALKING');
        this.setupClickListener('changemode-transit', 'TRANSIT');
        this.setupClickListener('changemode-driving', 'DRIVING');

        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

        // Rearrumei a ordem para posicionar os inputs e selectores
        this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(modeSelector);
        this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(destinationInput);

        this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(originInput);
      }

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };

      // google.maps.event.addDomListener(window, 'load', initMap);
      // google.maps.event.addDomListener(window, "resize", function() {
      //   var center = map.getCenter();
      //   google.maps.event.trigger(map, "resize");
      //   map.setCenter(center);
      // });
