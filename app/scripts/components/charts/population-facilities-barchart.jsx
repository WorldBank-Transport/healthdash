import React, { PropTypes } from 'react';
import {Result} from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import T from '../misc/t';
import ViewModes from '../../constants/view-modes';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import { Color } from '../../utils/colours';
import PopulationStore from '../../stores/population';

require('highcharts/modules/exporting')(HighCharts);
require('stylesheets/charts/health-facilities-barchar');

const PopulationFacilitiesChart = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
  },

  mixins: [
    connect(PopulationStore, 'population'),
    ShouldRenderMixin,
  ],

  parseData(categories, population) {
    let count = 0;
    return [{
      name: 'People to Health Facility Ratio',
      data: categories.map(region => {
        return {
          x: categories.indexOf(region),
          y: Math.round((population[region] || 0) / (facilitiesStats[region] || 1)),
        };
      }),
    }];
  },

  getChart() {
    const regions = Result.countBy(this.props.data, 'REGION');
    const categories = Object.keys(regions).filter(key => key !== 'total').sort((a, b) => regions[b] - regions[a]);
    const population = func.Result.sumByGroupBy(this.state.population, 'REGION', ['TOTAL']);
    const stats = this.parseData(categories, population);
   // needs translations
    return new HighCharts.Chart({
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

      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1,
          },
        },
      },

      series: stats,
    });
  },

  componentDidUpdate() {
    this.getChart();
  },

  componentDidMount() {
    this.getChart();
  },

  render() {
    if (!this.props.data.length === 0) {
      return (<div>empty</div>);
    }
    return (
      <div className="health-facilities-barchar">
        <h3 className="chart-title"><T k="chart.health-facilities.title" /> - <span className="chart-helptext"><T k="chart.health-facilities.helptext" /></span></h3>
        <div className="chart-container" id="population-facilities-barchar"></div>
      </div>
    );
  },
});

export default PopulationFacilitiesChart;
