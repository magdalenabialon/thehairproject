
function initMap() {
    // scrollwheel: false;
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -37.8136, lng: 144.9631},
      zoom: 13,
      scrollwheel: false
    });
    var input = /** @type {!HTMLInputElement} */(
        document.getElementById('pac-input'));

    var studioLat = document.getElementById('studio_lat');
    var studioLng = document.getElementById('studio_lng');

    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setIcon(/** @type {google.maps.Icon} */({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      infowindow.open(map, marker);


      // console.log(place.name);
      $('#studio_location').val(place.name);

      // console.log(marker.getPosition().lat());
      // console.log(marker.getPosition().lng());
      var latCoordinate = marker.getPosition().lat();
      var lngCoordinate = marker.getPosition().lng();
      console.log(latCoordinate);
      console.log(lngCoordinate);

      $('#studio_lat').val(latCoordinate);
      $('#studio_lng').val(lngCoordinate);
      // console.log($('#studio_lat').val(latCoordinate));

    });


  }
