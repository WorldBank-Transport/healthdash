import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import HighCharts from 'highcharts';

require('stylesheets/charts/death-by-age-chart');

const DeathByDeaseaseChart = React.createClass({
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

  sumAll(data) {
    const regions = Object.keys(data).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASE' && key !== 'YEAR' && key !== '_id');
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
                color: (age === 'ABOVE 5 YEARS') ? '#434348' : '#7cb5ec',
            });
            summary[age].forEach(item => {
              result.push({
                name: item.DISEASE,
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
    const deseases = Object.keys(Result.groupBy(this.props.data, 'DISEASE'));
    const sum = Result.groupBy(this.props.data, 'CHILD_TYPE');
    const stats = this.parseData(sum);
    return new HighCharts.Chart({
      chart: {
        height: 500,
        renderTo: 'death-by-desease-chart',
      },
      series: [{
            type: "treemap",
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
                        fontWeight: 'bold'
                    }
                }
            }],
            data: stats,
        }],
        title: {
            text: ''
        },
    });
  },

  render() {
    if (this.props.data.length === 0) {
      return (<div>empty</div>);
    }
    return (
      <div className="death-by-age-chart">
        <h3 className="chart-title"><T k="chart.death-by-desease.title" /> - <span className="chart-helptext"><T k="chart.death-by-desease.helptext" /></span></h3>
        <div className="chart-container" id="death-by-desease-chart"></div>
      </div>
    );
  },
});

export default DeathByDeaseaseChart;
