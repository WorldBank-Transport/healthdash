import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import PopulationStore from '../../stores/population';
import colours from '../../utils/colours';

require('stylesheets/charts/health-facilities-barchar');

const PopulationFacilitiesChart = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
    seriesName: PropTypes.string.isRequired,
  },

  mixins: [
    connect(PopulationStore, 'population'),
    ShouldRenderMixin,
  ],

  componentDidMount() {
    this.getChart();
  },

  componentDidUpdate() {
    this.getChart();
  },

  componentWillUnmount() {
    this.chart.destroy();
    delete this.chart;
  },

  parseData(categories, regions, population) {
    return [{
      color: colours.theme,
      name: this.props.seriesName,
      data: categories.map(region => {
        return {
          x: categories.indexOf(region),
          y: Math.round((population[region][0].TOTAL || 0) / (regions[region] || 1)),
        };
      }),
    }];
  },

  calculateDrillDown(regions, data) {
    return regions.map(region => {
      const regionFilter = item => item.REGION === region;
      const councilStats = Result.countBy(data.filter(regionFilter), 'COUNCIL');
      const populationStats = Result.sumByGroupBy(this.state.population.filter(regionFilter), 'DISTRICT', ['TOTAL']);
      return {
        name: region,
        id: region,
        data: Object.keys(councilStats)
            .filter(key => key !== 'total')
            .map(key => [key, Math.round((populationStats[key][0].TOTAL || 0) / (councilStats[key] || 1))]),
      };
    });
  },

  getChart() {
    if (!this.props.data.length === 0) {
      return false;
    }
    const regions = Result.countBy(this.props.data, 'REGION');
    const categories = Object.keys(regions).filter(key => key !== 'total').sort((a, b) => regions[b] - regions[a]);
    const population = Result.sumByGroupBy(this.state.population, 'REGION', ['TOTAL']);
    //const drillDown = this.calculateDrillDown(categories, this.props.data, this.state.population);
    const stats = this.parseData(categories, regions, population);
   // needs translations
    this.chart = new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: 'population-facilities-barchar',
      },

      title: {
        text: '',
      },

      xAxis: {
        categories: categories,
      },

      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },

      series: stats,
    });
    return this.chart;
  },

  render() {
    if (!this.props.data.length === 0) {
      return false;
    }
    return (
      <div className="health-facilities-barchar">
        <h3 className="chart-title"><T k="chart.population-facilities.title" /> - <span className="chart-helptext"><T k="chart.population-facilities.helptext" /></span></h3>
        <div className="chart-container" id="population-facilities-barchar"></div>
      </div>
    );
  },
});

export default PopulationFacilitiesChart;
