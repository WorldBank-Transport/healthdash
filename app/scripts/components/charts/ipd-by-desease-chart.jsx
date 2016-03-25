import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';
import { Color } from '../../utils/colours';
import ChartDataLink from '../boilerplate/chart-data-link';

require('stylesheets/charts/death-by-age-chart');

const IpdByDeaseaseChart = React.createClass({
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

  sumAll(data) {
    const regions = Object.keys(data).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASES' && key !== 'YEAR' && key !== '_id');
    return regions.reduce( (ret, item) => {
      ret.total += data[item];
      return ret;
    }, {total: 0}).total;
  },

  parseData(summary) {
    const result = [];
    Object.keys(summary)
      .forEach(age => {
        result.push({
          id: age,
          name: age,
          color: Color.getFacilityColor(age),
        });
        summary[age].forEach(item => {
          result.push({
            name: item.DISEASES,
            parent: age,
            value: this.sumAll(item),
          });
        });
      });
    return result;
  },

  getChart() {
    if (this.props.data.length === 0) {
      return false;
    }
    const sum = Result.groupBy(this.props.data, 'CHILD_TYPE');
    const stats = this.parseData(sum);
    this.chart = new HighCharts.Chart({
      chart: {
        height: 500,
        renderTo: 'ipd-by-desease-chart',
      },
      title: {
        text: '',
      },
      series: [{
        type: 'treemap',
        layoutAlgorithm: 'sliceAndDice',
        alternateStartingDirection: true,
        levels: [{
          level: 1,
          layoutAlgorithm: 'sliceAndDice',
          dataLabels: {
            enabled: true,
            align: 'left',
            verticalAlign: 'top',
            style: {
              fontSize: '15px',
              fontWeight: 'bold',
              textShadow: false,
            },
          },
        }],
        data: stats,
      }],
    });
    return this.chart;
  },

  render() {
    if (this.props.data.length === 0) {
      return false;
    }
    return (
      <div className="death-by-age-chart">
        <h3 className="chart-title"><T k="chart.ipd-by-desease.title" /></h3>
        <span className="helptext"><ChartDataLink dataId="ipd"/> <T k="chart.ipd-by-desease.helptext" /></span>
        <div className="chart-container" id="ipd-by-desease-chart"></div>
      </div>
    );
  },
});

export default IpdByDeaseaseChart;
