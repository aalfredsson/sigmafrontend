var devices = [];

var urlWithId = function(id){
  return 'http://intelligentmonitoringapi.azurewebsites.net/api/positions/device/' + id;
};

var getInitialData = function(){
    $.ajax({
        type : 'GET',
        url : 'http://intelligentmonitoringapi.azurewebsites.net/api/Devices',
        dataType : 'json',
        success : function(data) {
            devices = data.devices;
            
            $.each(devices, function(index, value) {
                 $.ajax({
        type : 'GET',
        url : urlWithId(this.id),
        dataType : 'json',
        success : function(data) {
            
            
            doSomething(data.y, data.x, value.contactLost);
        },
        error : function(code, message){
            $('#error').html('Error Code: ' + code + ', Error Message: ' + message);            
        }
    });
            }
                   
    )},
        error : function(code, message){
            $('#error').html('Error Code: ' + code + ', Error Message: ' + message);            
        }
    });
};

function doSomething(y, x, name) {
var div2 = document.createElement("div");
div2.style.top = y*100 + "%";
div2.style.left = x*100 + "%";
if (name == false){
div2.style.background = "#00E538";      
} else {
div2.style.background = "red";       
}
div2.style.padding = "0.5em";       
div2.style.borderRadius = "100%";       
div2.style.position = "absolute";
document.getElementById("test").appendChild(div2);   
}

setInterval(getInitialData, 1000);