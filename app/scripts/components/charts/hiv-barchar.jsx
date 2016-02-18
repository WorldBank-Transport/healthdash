import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import colours from '../../utils/colours';

require('stylesheets/charts/hiv-barchar');

const HivChart = React.createClass({
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

  parseData(facilitiesStats) {
    return [{
      name: 'Facilities By Region',
      data: Object.keys(facilitiesStats).filter(key => key !== 'total').map(key => facilitiesStats[key]),
      color: colours.theme,
    }];
  },

  getChart() {
    if (this.props.data.length === 0) {
      return false;
    }
    const facilitiesStats = Result.countBy(this.props.data, 'REGION');
    const categories = Object.keys(facilitiesStats).filter(key => key !== 'total');
    const stats = this.parseData(facilitiesStats);
   // needs translations
    this.chart = new HighCharts.Chart({
      chart: {
        height: 400,
        type: 'column',
        renderTo: 'hiv-facilities',
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
    return this.chart;
  },

  render() {
    if (this.props.data.length === 0) {
      return false;
    }
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="row">
            <div className="mainChart">
              <div className="hiv-facilities-barchar">
                <h3 className="chart-title"><T k="chart.hiv-facilities.title" /> - <span className="chart-helptext"><T k="chart.hiv-facilities.helptext" /></span></h3>
                <div className="chart-container" id="hiv-facilities"></div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  },
});

export default HivChart;
