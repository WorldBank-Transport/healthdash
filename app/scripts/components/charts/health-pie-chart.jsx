import React, { PropTypes } from 'react';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import { Color } from '../../utils/colours';

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

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      delete this.chart;
    }
  },

  getChart() {
    const keys = Object.keys(this.props.data);
    if (keys.length === 0) {
      return false;
    }
    const data = keys
      .filter(key => key !== 'total')
      .map(key => {
        const item = {
          name: key,
          y: this.props.data[key],
        };
        const color = Color.getFacilityColor(key);
        if (color) {
          item.color = color;
        }
        return item;
      }).sort((a, b) => b.y - a.y);
    const stats = [{
      name: 'Health Facilities',
      data: data,
    }];
   // needs translations
    this.chart = new HighCharts.Chart({
      chart: {
        type: 'pie',
        renderTo: this.props.divId,
      },

      title: {
        text: '',
      },

      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
          depth: 45,
          innerSize: 100,
          showInLegend: true,
        },
      },

      series: stats,
    });
    return this.chart;
  },


  render() {
    if (Object.keys(this.props.data) === 0) {
      return false;
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
