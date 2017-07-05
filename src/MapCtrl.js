import angular from "angular";
import * as d3 from "d3";
import CountyMap from './map';

export default class MapCtrl {

  constructor($http, $interval, $window, $scope) {
    this.$http = $http;
    this.$interval = $interval;
    this.$window = $window;
    this.$scope = $scope;
    this.timestep = 0;

    this.map = new CountyMap('#map');
    this.map.on('county_click', (data, idx)=>{
      this.data_by_county(data);
    });
    this.loading = true;

    this.$http.get('https://d3js.org/us-10m.v1.json').then( (resp) => {
      this.map.draw(resp.data);
    }).then( () => {
      d3.csv('./assets/data.csv')
        .row( (d) => {
          d["death_rate"] = d["Estimated Age-adjusted Death Rate, 11 Categories (in ranges)"];
          return d;
        })
        .get( (data) => {
          let nested = d3.nest()
            .key((d) => {return +d.Year;})
            .entries(data);
          this.nested_data = nested;
          this.start_animation();
          this.loading = false;
        });
    });
  }

  data_by_county(county) {

    let found = [];
    this.nested_data.forEach( (year)=> {
      year.values.forEach((d)=>{
        if (d.FIPS === county.id) {
          found.push({year:year.key, death_rate:d.death_rate, county:d.County});
        }
      });
    });
    this.county_by_year = found;
    this.selected_county = county;
    this.$scope.$apply();
  }

  stop_animation () {
    this.$interval.cancel(this.interval_promise);
    this.play = false;
  }

  start_animation () {
    this.stop_animation();
    this.play = true;
    this.interval_promise = this.$interval( () => {
      this.map.set_county_values(this.nested_data[this.timestep]);
      this.timestep++;
      if (this.timestep >= this.nested_data.length) {
        this.timestep = 0;
      }
    }, 1000);
  }

  toggle_play () {
    console.log("toggle");
    this.play ? this.stop_animation() : this.start_animation();
  }

}
