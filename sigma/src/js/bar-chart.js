//
// FLOOR PLAN
//

var getUrl = window.location.pathname;;
var getId = getUrl.substring(getUrl.lastIndexOf('/') + 1);
var url = "http://intelligentmonitoringapi.azurewebsites.net/api/positions/device/" + getId;
        
   $.getJSON( url, function( json ) {
       
document.getElementById('test').style.top = json.y*100 + "%"; 
document.getElementById('test').style.left = json.x*100 + "%";
    
 });     


//
//  CHARTS
//        

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 360 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var y = d3.scale.linear().range([height, 0]);

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("#graphy").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
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
              
var getBarchart = "http://intelligentmonitoringapi.azurewebsites.net/api/devicehistories/" + getId + '/daily';
var getLineChart = "http://intelligentmonitoringapi.azurewebsites.net/api/DeviceHistories/" + getId;

//
//  BAR CHART 1 (AMOUNT OF TIMES)
//

d3.json(getBarchart, function(error, data) {
        data = data.dailyStatistics;
    data.forEach(function(d) {
        d.timeStamp = d.timeStamp.substr(0,10);
        d.collectiveContactLostCount = +d.collectiveContactLostCount;
    });
    
    
  x.domain(data.map(function(d) { return d.timeStamp; }));
  y.domain([0, d3.max(data, function(d) { return d.collectiveContactLostCount, 10; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
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
      .text("Times");


  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.timeStamp); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.collectiveContactLostCount); })
      .attr("height", function(d) { return height - y(d.collectiveContactLostCount); });

});


//
//  BAR CHART 2 (TOTAL TIME)
//

d3.json(getBarchart, function(error, data) {
        data = data.dailyStatistics;
    data.forEach(function(d) {
        d.timeStamp = d.timeStamp.substr(0,10);
        console.log(d.collectiveContactLostTime);
        var de = new Date();
        var ne = de.getTime();
        
        var re = ne - d.collectiveContactLostTime;
        
        
        var test = re/1000;
        if (d.collectiveContactLostTime > 0) {
        d.collectiveContactLostTime = test/60;
        }
        console.log(d.collectiveContactLostTime);
        

    });
    
    
  x.domain(data.map(function(d) { return d.timeStamp; }));
  y.domain([0, d3.max(data, function(d) { return  d.collectiveContactLostTime, 1500; })]);


    
     svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Minutes");


  svg2.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.timeStamp); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y( d.collectiveContactLostTime); })
      .attr("height", function(d) { return height - y( d.collectiveContactLostTime); });

});


//
//  LINE CHART
//



d3.json(getLineChart, function(error, data) {
    data = data.deviceHistories;
    data.forEach(function(d) {
        d.createdTimeStamp = d.createdTimeStamp;
        d.signalStrength = +d.signalStrength;
        document.getElementById('lastSeen').innerHTML = d.createdTimeStamp.substring(11,19);

    });
    
var valueline = d3.svg.line()
    .x(function(d) { return x(d.createdTimeStamp); })
    .y(function(d) { return y(d.signalStrength); });

    x.domain(data.map(function(d) { return d.createdTimeStamp; }));
    y.domain([0, d3.max(data, function(d) { return d.signalStrength, -120; })]);

    svg3.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    svg3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
       .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );
        
    svg3.append("g")
        .attr("class", "y axis")
        .call(yAxis);
});

