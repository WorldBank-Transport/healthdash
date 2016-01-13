import React, { PropTypes } from 'react';
import {Result} from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import { Color } from '../../utils/colours';

require('highcharts/modules/exporting')(HighCharts);
require('stylesheets/charts/health-facilities-barchar');

const HealthFacilitiesChart = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
  },

  mixins: [ShouldRenderMixin],

  componentDidMount() {
    this.getChart();
  },

  componentDidUpdate() {
    this.getChart();
  },

  parseData(facilitiesStats, categories) {
    return Object.keys(facilitiesStats).map(type => ({
      name: type,
      data: categories.map(region => {
        return {
          color: Color.getFacilityColor(type),
          x: categories.indexOf(region),
          y: facilitiesStats[type][region] || 0,
        };
      }),
    }));
  },

  getChart() {
    const facilitiesStats = Result.countByGroupBy(this.props.data, 'FACILITY TYPE', 'REGION');
    const regions = Result.countBy(this.props.data, 'REGION');
    const categories = Object.keys(regions).filter(key => key !== 'total').sort((a, b) => regions[b] - regions[a]);
    const stats = this.parseData(facilitiesStats, categories);
   // needs translations
    return new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: 'health-facilities-barchar',
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


  render() {
    if (!this.props.data.length === 0) {
      return (<div>empty</div>);
    }
    return (
      <div className="health-facilities-barchar">
        <h3 className="chart-title"><T k="chart.health-facilities.title" /> - <span className="chart-helptext"><T k="chart.health-facilities.helptext" /></span></h3>
        <div className="chart-container" id="health-facilities-barchar"></div>
      </div>
    );
  },
});

export default HealthFacilitiesChart;
