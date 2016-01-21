import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import { Color } from '../../utils/colours';

require('stylesheets/charts/death-by-age-chart');

const IpdByAgeChart = React.createClass({
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
    const regions = Object.keys(this.props.data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASES' && key !== 'YEAR' && key !== '_id');
    const sum = Result.sumByGroupBy(this.props.data, 'CHILD_TYPE', regions);
    const stats = this.parseData(sum);
    return new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: 'ipd-by-age-chart',
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
  },

  render() {
    if (this.props.data.length === 0) {
      return (<div>empty</div>);
    }
    return (
      <div className="death-by-age-chart">
        <h3 className="chart-title"><T k="chart.ipd-by-age-chart.title" /> - <span className="chart-helptext"><T k="chart.ipd-by-age-chart.helptext" /></span></h3>
        <div className="chart-container" id="ipd-by-age-chart"></div>
      </div>
    );
  },
});

export default IpdByAgeChart;
