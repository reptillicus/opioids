import * as d3 from 'd3';
import * as topojson from 'topojson';

export default class CountyMap {

  constructor (element_id) {
    this.element_id = element_id;
    this.svg = d3.select(element_id);
    this.width = parseInt(this.svg.style("width"), 10);
    this.height = parseInt(this.svg.style("height"), 10);
    this.centered = null;
    this.colors = [
      "rgb(0, 0, 255)",
      "rgb(23, 0, 232)",
      "rgb(46, 0, 209)",
      "rgb(70, 0, 185)",
      "rgb(93, 0, 162)",
      "rgb(116, 0, 139)",
      "rgb(139, 0, 116)",
      "rgb(162, 0, 93)",
      "rgb(185, 0, 70)",
      "rgb(209, 0, 46)",
       "rgb(232, 0, 23)"
    ];
    this.categories = [
      ">20",
      "18.1-20",
      "16.1-18",
      "14.1-16",
      "12.1-14",
      "10.1-12",
      "8.1-10",
      "6.1-8",
      "4.1-6",
      "2.1-4",
      "0-2",
    ];

    d3.select(window)
    		.on("resize", this.resize);


    // window.addEventListener('resize',()=> {
    //   console.log("resize");
    //   this.width = parseInt(this.svg.style("width"), 10);
    //   this.height = parseInt(this.svg.style("height"), 10);
    //   console.log(this.width)
    //   this.draw(this.counties);
    // })

    this.rates = d3.map();

    this.projection = d3.geoAlbersUsa().scale(1000);
    // console.log(this.projection)
    // debugger

    this.path = d3.geoPath();
    // this.path = d3.geoPath();

    this.x = d3.scaleLinear()
        .domain([0, 10])
        .rangeRound([0, 300]);
    this.color = d3.scaleThreshold()
        .domain(d3.range(0, 10))
        .range(this.colors.reverse());

    this.legend = this.svg.append("g")
        .attr("class", "key")
        .attr("transform", "translate(" + this.width*0.80 +",50)");

    this.chart = this.svg.append("g")
            .attr("class", "chart")
            .attr("transform", "translate(" + this.width*0.80 +"," + this.height-200 +')');

    this.bars = this.legend.selectAll(".legend-box")
      .data(this.colors)
      .enter()
        .append("g");

    this.bars.append("rect")
          .attr("height", 25)
          .attr("class", "legend-box")
          .attr("y", (d, i)=> { return this.x(i); })
          .attr("x", 0)
          .attr("width", 25 )
          .attr("fill", (d, i)=> { return this.color(i); });

    this.bars.append("text")
          .attr("x", 30)
          .attr("y", (d, i)=> {return this.x(i) + 18; })
          .text((d, i) => {return this.categories[i];});

    this.legend.append("text")
        .attr("class", "caption")
        .attr("x", 0)
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("font-size", "1em")
        .text("Death rate per 100k");

    this.title = this.svg.append("g")
        .attr("class", "map_title")
        .attr("transform", "translate(" + String(this.width/2)+ ",30)");

    this.map = this.svg.append("g")
      .attr('class', "map-container")
      .attr("transform", "scale(" + this.width/960* 0.75  + ")");

  }

  element_id (id) {
    this.element_id = id;
    return this;
  }

  set_county_values (data) {
    this.county_values = data.values;
    this.title.selectAll('.map-title').remove();
    this.title.append("text")
      .attr('class', 'map-title').text(data.key);
    this.county_values.forEach( (d) => {
      this.rates.set(d.FIPS, d);
    });
    this.map.selectAll('.counties').remove();

    this.map.append("g")
      .attr("class", "counties")
      .selectAll("path")
    .data(topojson.feature(this.counties, this.counties.objects.counties).features)
      .enter().append("path")
        .attr("fill", (d) => {
          d = this.rates.get(d.id);
          if (d) {
            return this.fill_function(d);
          } else {
            return "black";
          }
        })
        .attr("d", this.path)
        .on('click', this.click);

  }
  resize () {
    console.log(this)
    this.width = parseInt(this.svg.style("width"), 10);
    this.height = parseInt(this.svg.style("height"), 10);
    this.map.attr("transform", "scale(" + this.width/960* 0.75  + ")");

	}

  click (d, node) {
    var x, y, k;
    console.log(d, node);
    if (d && this.centered !== d) {
      console.log(this.centered);
      var centroid = node.path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      this.centered = d;
    } else {
      x = this.width / 2;
      y = this.height / 2;
      k = 1;
      this.centered = null;
      console.log(this.centered);
    }


  }

  fill_function (d) {
    let classes = {
      "0-2":      "rgb(0, 0, 255)",
      "2.1-4":      "rgb(23, 0, 232)",
      "4.1-6":      "rgb(46, 0, 209)",
      "6.1-8":      "rgb(70, 0, 185)",
      "8.1-10":       "rgb(93, 0, 162)",
      "10.1-12":      "rgb(116, 0, 139)",
      "12.1-14":      "rgb(139, 0, 116)",
      "14.1-16":      "rgb(162, 0, 93)",
      "16.1-18":      "rgb(185, 0, 70)",
      "18.1-20":      "rgb(209, 0, 46)",
      ">20":        "rgb(232, 0, 23)"
    };
    return classes[d.death_rate];
  }

  draw (data) {
    console.log(data);
    this.counties = data;
    this.map.append("g")
        .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(data, data.objects.counties).features)
      .enter().append("path")
        .attr("d", this.path)
        .attr("id", (d) => { return 'county_' + d.id;});

    this.map.append("path")
        .datum(topojson.mesh(data, data.objects.states, (a, b) => { return a !== b; }))
        .attr("class", "states")
        .attr("d", this.path);

  }

}
