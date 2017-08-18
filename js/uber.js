// Uber API Constants
var uberClientId = "'V7tiJWOdbhDzTBcs3KO1T6iNHBgXH-vN";
var uberServerToken = "MJmghWzWtYIfXC6dxxpxvhpwFvFJNiogpSTXAR56";

// Create variables to store latitude and longitude
var userLatitude;
var userLongitude;
var partyLatitude = -23.5456;
var partyLongitude = -46.62827;

// navigator.geolocation.watchPosition(function(position) {
	// Update latitude and longitude
	// userLatitude = position.coords.latitude;
	// userLongitude = position.coords.longitude;

  // Query Uber API if needed
	getEstimatesForUserLocation(userLatitude, userLongitude);
});

// function getEstimatesForUserLocation(latitude,longitude) {
//   $.ajax({
//     url: "https://api.uber.com/v1/estimates/price",
//     headers: {
//     	Authorization: "Token " + uberServerToken
//     },
//     data: {
//       start_latitude: latitude,
//       start_longitude: longitude,
//       end_latitude: partyLatitude,
//       end_longitude: partyLongitude
//     },
//     success: function(result) {
//       console.log(result);
//     }
//   });
// }
