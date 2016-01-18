import React, { PropTypes } from 'react';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';

require('highcharts/highcharts-3d')(HighCharts);
require('stylesheets/charts/health-facilities-barchar');

const HealthPieChart = React.createClass({
  propTypes: {
    data: PropTypes.object.isRequired,
    divId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  },

  mixins: [ShouldRenderMixin],

  componentDidMount() {
    this.getChart();
  },

  getChart() {
    const keys = Object.keys(this.props.data);
    if (keys.length === 0) {
      return false;
    }
    const data = keys
      .filter(key => key !== 'total')
      .map(key => [key, this.props.data[key]])
      .sort((a, b) => b[1] - a[1]);
    const stats = [{
      name: 'Health Facilities',
      data: data,
    }];
   // needs translations
    return new HighCharts.Chart({
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
        },
        renderTo: this.props.divId,
      },

      title: {
        text: '',
      },

      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45,
        },
      },

      series: stats,
    });
  },


  render() {
    if (Object.keys(this.props.data) === 0) {
      return (<div>empty</div>);
    }
    return (
      <div className="health-facilities-piechart">
        <h3 className="chart-title">{this.props.title}</h3>
        <div className="chart-container" id={this.props.divId}></div>
      </div>
    );
  },
});

export default HealthPieChart;
