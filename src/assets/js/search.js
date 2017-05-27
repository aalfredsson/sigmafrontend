// SEARCH
$(document).ready(function(){
    var callAjax = function(){
$.ajax({
    type: "GET",
    url: 'http://intelligentmonitoringwebappservice.azurewebsites.net/api/Devices',
    dataType: "JSON",
    error: function (response) {
        console.log('Error: There was a problem processing your request, please refresh the browser and try again');
        alert('Intelligent Monitoring is not fetching data right now. Please come back later.');
    },
    success: function (response) {
        
        counterOnline = 0;
        counterOffline = 0;
        counterWarnings = 0;
        counterAll = 0;
        
        for (var i = 0; i < response.data.length; i++) {
         
            if (response.data[i].contactLost == true) {
                counterOffline++;
            }
            if (response.data[i].contactLost == false) {
                counterOnline++;
            }
            if ((response.data[i].signalStrength < -85) ||  ((response.data[i].batteryLevel < 20) && (response.data[i].batteryLevel > 0))) {
                counterWarnings++;
            }
            counterAll++;
            
        }
        totalOffline = Math.floor(counterOffline/counterAll*100);
        totalOnline = Math.floor(counterOnline/counterAll*100);
        totalWarnings = Math.floor(counterWarnings/counterAll*100);
        
        $( document ).ready(function() {
        document.getElementById('greenOnline').style.width = totalOnline + "%";
        document.getElementById('redOffline').style.width = totalOffline + "%"; 
            document.getElementById('yellowWarnings').style.width = totalWarnings + "%"; 
        document.getElementById('redText').innerHTML = totalOffline + "% Offline"; 
        document.getElementById('greenText').innerHTML = totalOnline + "% Online";
        document.getElementById('yellowText').innerHTML = totalWarnings + "% Warnings"; 
        })
        
         $("#search").on("keyup", function () {
            $(".search_results").empty();
            search_value = ($("#search").val());
            if (search_value != "") {
                $(".searchForm > div:first-child").css("display", "block");
                $("#search").css("border-radius", "4px 4px 0 0");
                $(".search_results").append("<table class='tablesorter searchBox' style='width: 100%;'><tbody>");
                for (var i = 0; i < response.data.length; i++) {
                    x = response.data[i].name;
                    id = response.data[i].id;
                    url = '//intelligentmonitoringwebapp.azurewebsites.net/device/' + id;
                    if (x.toLowerCase().includes(search_value.toLowerCase())) {
                        $(".searchBox").append("<tr class='device_row'><td><a href='" + url + "' class='device-link'>" + x + "</a></td></tr>")      
                   }
                    }
                $(".search_results").append("</tbody></table>");
                
               if($(".device_row").length < 26){
                    $(".search_results").append("<p style='font-size: 14px; line-height: 1.42857143; color: rgba(85,85,85 , 0.6); margin-bottom: 0;'>Inga s&ouml;kresultat...</p>");
                }
                
               }
            else if (search_value == ""){
                $(".searchForm > div:first-child").css("display", "none");
                $("#search").css("border-radius", "4px 4px 4px 4px");
            }
            
   })        
            devices = response.data;
            document.getElementById('test').innerHTML = "";

                 $.ajax({
        type : 'GET',
        url : "http://intelligentmonitoringwebappservice.azurewebsites.net/api/devices?positions=true",
        dataType : 'json',
        success : function(data) {
        
            data = data.data;
                        
            data.forEach(function(d) {
        doSomething(d.y, d.x, d.contactLost, d.id, d.name, d.signalStrength, d.batteryLevel);
            })
        },
        error : function(code, message){
            $('#error').html('Error Code: ' + code + ', Error Message: ' + message);            
        }
    });
            }
    })
    }
    callAjax();
    
    
    var devices = [];

var urlWithId = function(id){
  return 'http://intelligentmonitoringwebappservice.azurewebsites.net/api/Devices/' + id;
};

function doSomething(y, x, status, id, name, signal, battery) {
    
    
var a = document.createElement('a');
a.href = "//intelligentmonitoringwebapp.azurewebsites.net/device/" + id;
a.id = id;
    
var div2 = document.createElement("div");
div2.id = id;
div2.style.top = y*100 + "%";
div2.style.left = x*100 + "%";
if (status == false){
            if ((battery < 20 && battery > 0) || (signal < -85 && signal != 0)) {
                div2.style.border = "1px solid rgba(240, 173, 78, 1)";
                div2.style.background = "rgba(240, 173, 78, 0.75)"; 
                } else {
                     div2.style.border = "1px solid #00BF2F";
div2.style.background = "rgba(0, 191, 47, 0.5)"; 
                }
        

} else if (status == true) {
    div2.style.background = "red"; 
     if (id == getId) {
        div2.style.border = "1px solid #fff";
div2.style.background = "rgba(0, 0, 0, 0.5)"; 
         div2.innerHTML = "C";
        }
      
}
div2.style.height = "1.25em";
div2.style.width = "1.25em";  
div2.style.borderRadius = "100%";       
div2.style.position = "absolute";
document.getElementById("test").appendChild(a).appendChild(div2);

var e = document.getElementById(id);

e.onmouseover = function() {
var div2 = document.createElement("p");
div2.innerHTML = '<strong>' +  name + '</strong>' + ' Signal: ' + signal + ' dBm ' + 'Battery: ' + battery + "%";
document.getElementById('popup').appendChild(div2);
       
document.getElementById('popup').style.display = 'block';


}
e.onmouseout = function() {
document.getElementById('popup').style.display = 'none';
document.getElementById('popup').innerHTML = "";
}
    
}
});