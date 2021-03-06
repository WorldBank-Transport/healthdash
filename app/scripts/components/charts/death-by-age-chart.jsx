import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import { Color } from '../../utils/colours';
import ChartDataLink from '../boilerplate/chart-data-link';

require('stylesheets/charts/death-by-age-chart');

const DeathByAgeChart = React.createClass({
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

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      delete this.chart;
    }
  },

  parseData(summary) {
    return Object.keys(summary)
          .map(age => {
            return {
              color: Color.getFacilityColor(age),
              name: age,
              data: summary[age].map(regionWithData => regionWithData[Object.keys(regionWithData).filter(key => key !== 'total')[0]]),
            };
          });
  },

  getChart() {
    if (this.props.data.length === 0) {
      return false;
    }
    const regions = Object.keys(this.props.data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASE' && key !== 'YEAR' && key !== '_id');
    const sum = Result.sumByGroupBy(this.props.data, 'CHILD_TYPE', regions);
    const stats = this.parseData(sum);
    this.chart = new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: 'death-by-age-chart',
      },

      title: {
        text: '',
      },

      xAxis: {
        categories: regions,
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
    return this.chart;
  },

  render() {
    if (this.props.data.length === 0) {
      return false;
    }
    return (
      <div className="death-by-age-chart">
        <h3 className="chart-title"><T k="chart.death.title" /></h3>
        <span className="helptext"><ChartDataLink dataId="death"/><T k="chart.death.helptext"/></span>
        <div className="chart-container" id="death-by-age-chart"></div>
      </div>
    );
  },
});

export default DeathByAgeChart;
