//
// FLOOR PLAN
//

var getUrl = window.location.pathname;;
var getId = getUrl.substring(getUrl.lastIndexOf('/') + 1);
        
//
// FLOOR PLAN
//

// SEARCH
$(document).ready(function(){
    var callAjax = function(){

            document.getElementById('floorplan').innerHTML = "";
        
        
            $.ajax({
        type : 'GET',
        url : "http://intelligentmonitoringwebappservice.azurewebsites.net/api/Devices/" + getId,
        dataType : 'json',
        success : function(data) {
        
            document.getElementById('name').innerHTML = data.name + " ";
            
        },
        error : function(code, message){
            $('#error').html('Error Code: ' + code + ', Error Message: ' + message);            
        }
    });
        
        
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
    if (id == getId) {
        div2.style.color = "#fff";
        div2.style.background = "#002f47";
        div2.innerHTML = "<p style='font-size: 10px; position: absolute; bottom: 10px; z-index: 0 !important; background: #002f47; white-space: nowrap; padding: 0.2em; margin: 0 auto;'>You are here</p>";
        } else {
            if ((battery < 20 && battery > 0) || (signal < -85 && signal != 0)) {
                   div2.style.border = "1px solid rgba(240, 173, 78, 1)";
                div2.style.background = "rgba(240, 173, 78, 0.75)";  
                } else {
                     div2.style.border = "1px solid #00BF2F";
div2.style.background = "rgba(0, 191, 47, 0.5)"; 
                }
        }

} else if (status == true) {
    div2.style.background = "red"; 
     if (id == getId) {
        div2.style.border = "1px solid #fff";
div2.style.background = "rgba(0, 0, 0, 0.5)"; 
         div2.innerHTML = "C";
        }
      
}
div2.style.height = "1.5em";
div2.style.width = "1.5em";  
div2.style.borderRadius = "100%";       
div2.style.position = "absolute";
    div2.style.zIndex = "200 !important";
document.getElementById("floorplan").appendChild(a).appendChild(div2);

var e = document.getElementById(id);

e.onmouseover = function() {
var div2 = document.createElement("p");
div2.innerHTML = '<strong>' +  name + '</strong>' + ' Signal: ' + signal + ' dBm ' + 'Battery: ' + battery + "%";
document.getElementById('popup2').appendChild(div2);
       
document.getElementById('popup2').style.display = 'block';


}
e.onmouseout = function() {
document.getElementById('popup2').style.display = 'none';
document.getElementById('popup2').innerHTML = "";
}
    
}
});   

//
//  CHARTS
//        
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 360 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var y = d3.scale.linear().range([height, 0]);

// Parse the date / time
var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L").parse;
var parseDate2 = d3.time.format("%b %d");
var parseDate3 = d3.time.format("%H:%M");

// Set the ranges
var x2 = d3.time.scale().range([0, width]);

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var xAxis2 = d3.svg.axis().scale(x2)
    .orient("bottom").ticks(10).tickFormat(d3.time.format("%H:%M"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("#graphy").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
.attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin')

    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
var svg2 = d3.select("#graphy2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
var svg3 = d3.select("#graphy3")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");
              
var getBarchart = "http://intelligentmonitoringwebappservice.azurewebsites.net/api/Statistics/" + getId + '/daily';
var getLineChart = "http://intelligentmonitoringwebappservice.azurewebsites.net/api/Statistics/" + getId + '/hourly';

//
//  BAR CHART 1 (AMOUNT OF TIMES)
//

d3.json(getBarchart, function(error, data) {
        data = data.data;
    data.forEach(function(d) {
        d.createdTimeStamp = parseDate(d.createdTimeStamp);
        d.createdTimeStamp = parseDate2(d.createdTimeStamp);
        d.collectiveContactLostCount = +d.collectiveContactLostCount;
        
       
        
    });
    
    
  x.domain(data.map(function(d) { return d.createdTimeStamp; }));
  y.domain([0, d3.max(data, function(d) { return d.collectiveContactLostCount, 10; })]);
    
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
    .style("font-family", "Universe-Light-Cd")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Times")
    .selectAll("text")
  .style("font-family", "Universe-Light-Cd");



  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.createdTimeStamp); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.collectiveContactLostCount); })
      .attr("height", function(d) { return height - y(d.collectiveContactLostCount); });

});


//
//  BAR CHART 2 (TOTAL TIME)
//

d3.json(getBarchart, function(error, data) {
        data = data.data;
    data.forEach(function(d) {
        d.createdTimeStamp = parseDate(d.createdTimeStamp);
        d.createdTimeStamp = parseDate2(d.createdTimeStamp);
        var de = new Date();
        var ne = de.getTime();
        
        var re = ne - d.collectiveContactLostTime;
        
        
        var test = re/1000;
        if (d.collectiveContactLostTime > 0) {
        d.collectiveContactLostTime = test/60;
        }        

    });
    
    
  x.domain(data.map(function(d) { return d.createdTimeStamp; }));
  y.domain([0, d3.max(data, function(d) { return  d.collectiveContactLostTime, 1500; })]);
    
     svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
     .style("font-family", "Universe-Light-Cd")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
  .append("text")
    .text("Minutes")
     .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
  .selectAll("text")
  .style("font-family", "Universe-Light-Cd");    
   
  svg2.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.createdTimeStamp); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y( d.collectiveContactLostTime); })
      .attr("height", function(d) { return height - y( d.collectiveContactLostTime); });
});

//
//  LINE CHART
//

d3.json(getLineChart, function(error, data) {
    data = data.data;
    data.forEach(function(d) {
        d.createdTimeStamp = parseDate(d.createdTimeStamp);
        d.signalStrength = +d.signalStrength;
        document.getElementById('lastSeen').innerHTML = parseDate3(d.createdTimeStamp);
        document.getElementById('battery').innerHTML = d.batteryLevel + " %";
        document.getElementById('signal').innerHTML = d.signalStrength + " dBm";
        document.getElementById('ids').innerHTML = "(" + d.deviceId + ")";
    });
    if (data[0].signalStrength == 0) {
         document.getElementById('graphy3').innerHTML = "This device is connected by cable.";
        } else {
var valueline = d3.svg.line()
    .x(function(d) { return x2(d.createdTimeStamp); })
    .y(function(d) { return y(d.signalStrength); });

    x2.domain(d3.extent(data, function(d) { return d.createdTimeStamp; }));
    y.domain([0, d3.max(data, function(d) { return d.signalStrength, -120; })]);
            
    svg3.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    svg3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis2)
       .selectAll("text")
    .style("font-family", "Universe-Light-Cd")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );
        
    svg3.append("g")
    .attr("fill", "#002f47")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("dBm")
            .selectAll("text")
    .style("font-family", "Universe-Light-Cd");
        }
});

