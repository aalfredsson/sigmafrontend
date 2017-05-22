// SEARCH
$(document).ready(function(){
    var callAjax = function(){
$.ajax({
    type: "GET",
    url: 'http://intelligentmonitoringapi.azurewebsites.net/api/Devices',
    dataType: "JSON",
    error: function (response) {
        console.log('Error: There was a problem processing your request, please refresh the browser and try again');
    },
    success: function (response) {
        
        counterOnline = 0;
        counterOffline = 0;
        counterAll = 0;
        
        for (var i = 0; i < response.devices.length; i++) {
         
            if (response.devices[i].contactLost == true) {
                counterOffline++;
            }
            if (response.devices[i].contactLost == false) {
                counterOnline++;
            }
            counterAll++;
            
        }
        totalOffline = Math.floor(counterOffline/counterAll*100);
        totalOnline = Math.floor(counterOnline/counterAll*100);
        
        $( document ).ready(function() {
        document.getElementById('greenOnline').style.width = totalOnline + "%";
        document.getElementById('redOffline').style.width = totalOffline + "%"; 
        document.getElementById('redText').innerHTML = totalOffline + "% Offline"; 
        document.getElementById('greenText').innerHTML = totalOnline + "% Online"; 
        })
        
        $("#search").on("keyup", function () {
            $(".search_results").empty();
            search_value = ($("#search").val());
            if (search_value != "") {
                for (var i = 0; i < response.devices.length; i++) {
                    x = response.devices[i].name;
                    id = response.devices[i].id;
                    url = 'http://localhost:3000/device/' + id;
                    if (x.toLowerCase().includes(search_value.toLowerCase())) {
                        $(".search_results").append("<table class='tablesorter searchBox' style='width: 100%;'><tbody><tr class='device_row'><td><a href='" + url + "' class='device-link'><h5 class='device'>" + x + "</h5></a></td></tr></tbody></table>")      
                    }
                    }
                                
                } 
            
    })
         
    }
    })
    }
    setInterval(callAjax,1000);
});