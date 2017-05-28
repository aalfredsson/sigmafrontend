/* Start of general */

var getUrl = window.location.pathname;;
var getId = getUrl.substring(getUrl.lastIndexOf('/') + 1);
var getBarchart = "http://intelligentmonitoringwebappservice.azurewebsites.net/api/Statistics/" + getId + '/daily';
var getLineChart = "http://intelligentmonitoringwebappservice.azurewebsites.net/api/Statistics/" + getId + '/hourly';

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 360 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var y = d3.scale.linear().range([height, 0]);
var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L").parse;
var parseDate2 = d3.time.format("%b %d");
var parseDate3 = d3.time.format("%H:%M");
var x2 = d3.time.scale().range([0, width]);
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var xAxis = d3.svg.axis().scale(x).orient("bottom");
var xAxis2 = d3.svg.axis().scale(x2).orient("bottom").ticks(10).tickFormat(d3.time.format("%H:%M"));
var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

var svg = d3.select("#graphy").append("svg").attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom).append("g").attr("width", '100%')
    .attr("height", '100%').attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin').attr("transform","translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("#graphy2").append("svg").attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom).append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg3 = d3.select("#graphy3").append("svg").attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom).append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
    
function dayAndNight() {  
    
    var getImage =  document.getElementById('dayNnight');
    var getBackground =  document.getElementById('dNn');
    var getHeading =  document.getElementById('dNn-heading');
    var getA =  document.getElementById('dNn-a');
    var getPop =  document.getElementById('popup2');

    if (getImage.style.filter === 'brightness(100%)') {
        getBackground.style.background = "black"
        getImage.style.filter = "invert(1)";
        getHeading.style.borderColor = "white";
        getA.style.color = "white";
        getA.innerHTML = "NIGHT VISION";
        getPop.style.background = "transparent";
        getPop.style.color = "white";
    } 
    else  {
        getBackground.style.background = "white"
        getImage.style.filter = "brightness(100%)";
        getHeading.style.borderColor = "#002f47";
        getA.style.color = "#002f47";
        getA.innerHTML = "Floor plan";
        getPop.style.background = "white";
        getPop.style.color = "black";
        }
}

/* End of General */

/* Start of Main */ 

$(document).ready(function(){
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
    
    function doSomething(y, x, status, id, name, signal, battery) {
        
        var a = document.createElement('a');
        a.href = "/device/" + id;
        a.id = id;
        
        var div2 = document.createElement("div");
        div2.id = id;
        div2.style.top = y*100 + "%";
        div2.style.left = x*100 + "%";
        div2.style.zIndex = 1;
        
        if (status == false){
            if (id == getId) {
                div2.style.color = "#fff";
                div2.style.background = "#002f47";
                div2.innerHTML = "<p style='font-size: 10px; position: absolute; bottom: 10px; z-index: 0 !important; background: #002f47; white-space: nowrap; padding: 0.2em; margin: 0 auto;'>You are here</p>";
                a.style.pointerEvents = "none";
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


    
/* End of Main */ 

/* Start of Charts */ 

d3.json(getBarchart, function(error, data) {
    data = data.data;
    data.forEach(function(d) {
        d.createdTimeStamp = parseDate(d.createdTimeStamp);
        d.createdTimeStamp = parseDate2(d.createdTimeStamp);
        d.collectiveContactLostCount = +d.collectiveContactLostCount;   
    });
    
    x.domain(data.map(function(d) { return d.createdTimeStamp; }));
    y.domain([0, d3.max(data, function(d) { return d.collectiveContactLostCount, 10; })]);
    
    svg.selectAll("dot")	
        .data(data)			
        .enter().append("circle")
        .style("fill", "transparent")
        .style("stroke-width", "4")
        .style("stroke", function(d) {
        
        if (d.collectiveContactLostCount > 0) {
            return "transparent";
        } else {
            return "rgba(0, 191, 47, 0.5)";
        }
    })
        .attr("r", 5)		
        .attr("cx", function(d) { return x(d.createdTimeStamp) + (143/data.length); })		 
        .attr("cy", function(d) { return y(d.collectiveContactLostCount - 2); })		
        
        .on("mouseover", function(d) {		
            div.style("opacity", 1);
            div.style("font-family", "Universe-Light-Cd")
            div.html("<strong>" + d.createdTimeStamp + "</strong>: "  + d.collectiveContactLostCount + " minutes")	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px")
    })					
        .on("mouseout", function(d) {		
            div.style("opacity", 0);	
    });
    
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
        .style("font-family", "Universe-Light-Cd")
        .append("text")
        .style("font-size", "20px")
        .text("Times")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.createdTimeStamp); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.collectiveContactLostCount); })
        .attr("height", function(d) { return height - y(d.collectiveContactLostCount); });
});

/* Chart 2 */ 

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

    
     svg2.selectAll("dot")	
        .data(data)			
        .enter().append("circle")
        .style("fill", "transparent")
        .style("stroke-width", "4")
        .style("stroke", function(d) {
        
         if (d.collectiveContactLostTime > 0) {
             return "transparent";
         } else {
             return "rgba(0, 191, 47, 0.5)";
         }
     })
        .attr("r", 5)		
        .attr("cx", function(d) {  return x(d.createdTimeStamp) + (143/data.length); })		 
        .attr("cy", function(d) { return y(d.collectiveContactLostTime - 300); })		
        
         .on("mouseover", function(d) {		
            div.style("opacity", 1);
            div.style("font-family", "Universe-Light-Cd")
            div.html("<strong>" + d.createdTimeStamp + "</strong>: "  + d.collectiveContactLostTime + " minutes")	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px")
     })					
        .on("mouseout", function(d) {		
            div.style("opacity", 0);
     });
    
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
        .style("font-family", "Universe-Light-Cd")
        .append("text")
        .style("font-size", "20px")
        .text("Minutes")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", ".71em")
        .style("text-anchor", "end");    
   
    svg2.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.createdTimeStamp); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y( d.collectiveContactLostTime); })
        .attr("height", function(d) { return height - y( d.collectiveContactLostTime); });
});

/* Chart 3 */ 

d3.json(getLineChart, function(error, data) {
    data = data.data;
    data.forEach(function(d) {
        d.createdTimeStamp = parseDate(d.createdTimeStamp);
        d.signalStrength = +d.signalStrength;
        document.getElementById('lastSeen').innerHTML = parseDate3(d.createdTimeStamp);
        document.getElementById('ids').innerHTML = "(" + d.deviceId + ")";
        document.getElementById('battery').innerHTML = d.batteryLevel + " %";
        document.getElementById('signal').innerHTML = d.signalStrength + " dBm";
    });
    
    if (data[0].signalStrength == 0) {
        document.getElementById('graphy3').innerHTML = "<p style='color: rgba(0, 191, 47, 0.9); font-size: 22px;'><img width='18' style='width: 18px; margin-top: -0.2em; margin-right: 0.1em;' src='assets/img/power.png'> This device is connected by cable.<p>";
    } else {
        var valueline = d3.svg.line()
        .x(function(d) { return x2(d.createdTimeStamp); })
        .y(function(d) { return y(d.signalStrength); });
        
        x2.domain(d3.extent(data, function(d) { return d.createdTimeStamp; }));
        y.domain([0, d3.max(data, function(d) { return d.signalStrength, -120; })]);
            
        svg3.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));
        
        svg3.selectAll("dot")	
            .data(data)			
            .enter().append("circle")
            .style("fill", function(d) {
            
            if (d.signalStrength < -85) {
                return "rgba(255, 0, 0, 0.5)";
            } else {
                return "rgba(0, 191, 47, 0.5)";
            }
        })
            .attr("r", 5)		
            .attr("cx", function(d) { return x2(d.createdTimeStamp); })		 
            .attr("cy", function(d) { return y(d.signalStrength); })		
            
            .on("mouseover", function(d) {		
                div.style("opacity", 1);
                div.style("font-family", "Universe-Light-Cd")
                div.html("<strong>" + parseDate3(d.createdTimeStamp) + "</strong>: "  + d.signalStrength + " dBm")	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px")                    	
            })					
            .on("mouseout", function(d) {		
                div.style("opacity", 0);	
            });

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
            .attr("class", "y axis")
            .call(yAxis)
            .style("font-family", "Universe-Light-Cd")
            .append("text")
            .style("font-size", "20px")
            .text("dBm")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end");
    }
});
});