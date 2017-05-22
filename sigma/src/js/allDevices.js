$.ajax({
    type: "GET",
    url: 'http://intelligentmonitoringapi.azurewebsites.net/api/Devices',
    dataType: "JSON",
    error: function (response) {
        alert('Error: There was a problem processing your request, please refresh the browser and try again');
    },
    success: function (response) {
        

        for (var i = 0; i < response.devices.length; i++) {
            
            var testUrl = "http://intelligentmonitoringapi.azurewebsites.net/api/positions/device/" + response.devices[i].id;
            
            var getDatas = response.devices[i].$id;
            
var div = document.createElement("div");
div.style.position = "absolute";   
div.innerHTML = getDatas;
document.getElementById("test").appendChild(div);
               
$.ajax({
    type: "GET",
    url: testUrl,
    dataType: "JSON",
    error: function (response) {
        alert('Error: There was a problem processing your request, please refresh the browser and try again');
    },
    success: function (response) {
        
var div2 = document.createElement("div");

div2.style.top = response.y*100 + "%";
div2.style.left = response.x*100 + "%";
div2.style.background = "green";      
div2.style.padding = "0.5em";       
div2.style.borderRadius = "100%";       
div2.style.position = "absolute";    
document.getElementById("test").appendChild(div2);

       
   
   }
});     
        
        }
    }
    });