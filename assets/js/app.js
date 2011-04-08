// 
//  --- our app behavior logic ---
//
$(document).ready(function() {
	alert('startup');
	navigator.network.isReachable("google.com", function(status) {
			var connectivity = (status.internetConnectionStatus || status.code || status);
        	if (connectivity === NetworkStatus.NOT_REACHABLE) {
        		alert("No internet connection - we won't be able to show you any maps");
        	} else {
        		alert("We can reach Google - get ready for some awesome maps!");
        	}
        });
    
	$('#map').live('pagecreate',function(event){
            navigator.geolocation.getCurrentPosition(function (position) {
                var location = "" + position.coords.latitude + "," + position.coords.longitude;
                path += location + "&zoom=" + zoom;
                path += "&size=250x250&maptype=" + map + "&markers=color:red|label:P|";
                path += location + "&sensor=false";

                x$('img#static_map').attr('src', path);
                
                $.ajax({
                    url: "http://maps.googleapis.com/maps/api/directions/json?origin=Chicago,IL&destination=Los+Angeles,CA&waypoints=Joplin,MO|Oklahoma+City,OK&sensor=false",
                        dataType: "json",
                        headers: {"Accept": "text/html, application/json"},
                        success: function(response) {
                            Alert('ok');
                        },
                        error: function(request, status, error) {
                        	Alert(error);
                          console.log("Error status " + status);
                          console.log("Error request status text: " + request.statusText);
                          console.log("Error request status: " + request.status);
                          console.log("Error request response text: " + request.responseText);
                          console.log("Error response header: " + request.getAllResponseHeaders());
                          console.log("Error error: " + error);
                        }
                      });
                
            });
        });
	
});