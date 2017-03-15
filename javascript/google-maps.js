(function (global, $) {
  'use strict'

  var LCC = global.LCC || {}
  LCC.Modules = LCC.Modules || {}

  LCC.Modules.GoogleMap = function () {
    this.loadMap = function(element) {
        var zoom = element.data('map-zoom');
        var defaultLat = element.data('map-lat');
        var defaultLng = element.data('map-lng');

        var lat = document.getElementById("latitude").value;
        var lng = document.getElementById("longitude").value;
        var showPointer = false;
        
        var latlng;
        if (!lat && !lng) {
            latlng = new google.maps.LatLng(defaultLat, defaultLng);
        }
        else {
            latlng = new google.maps.LatLng(lat, lng);
            showPointer = true;
        }
        var mapProps = {
            center: latlng,
            zoom: zoom ? zoom : 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            mapTypeControl: true,
            mapTypeControlOptions:
            {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                position: google.maps.ControlPosition.TOP_RIGHT,
                mapTypeIds: [google.maps.MapTypeId.ROADMAP,
                    google.maps.MapTypeId.TERRAIN,
                    google.maps.MapTypeId.HYBRID,
                    google.maps.MapTypeId.SATELLITE]
            },
            navigationControl: true,
            navigationControlOptions:
            {
                style: google.maps.NavigationControlStyle.ZOOM_PAN
            },
            scaleControl: true,
            disableDoubleClickZoom: true,
            draggable: true,
            streetViewControl: true,
            draggableCursor: 'move'
        };

        var map = new google.maps.Map(element[0], mapProps);

        map.setCenter(latlng);

        if (showPointer) {
            var marker = new google.maps.Marker({
                map: map,
                position: latlng,
                icon: "/_layouts/15/images/LCC.Events.SharePoint/map-pins-purple.png"
            });
            marker.setMap(map);
        }
    },
    this.start = function (element) {
        var self = this;
        $(document).ready(function ($) {
            google.maps.event.addDomListener(window, 'load', self.loadMap(element)); 
        });
    }   
  }

  global.LCC = LCC
  
})(window, jQuery);