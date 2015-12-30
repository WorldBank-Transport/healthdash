import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3-components';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import T from '../misc/t';
import Resize from '../../utils/resize-mixin';
import ViewModes from '../../constants/view-modes';
import ShouldRenderMixin from '../../utils/should-render-mixin';

require('stylesheets/charts/ipd-by-age-chart');

const IpdByAgeChart = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
  },

  mixins: [
    Resize,
    ShouldRenderMixin,
  ],

  getInitialState() {
    return {};
  },

  selectedYear(years) {
    return years[0];
  },

  sumAll(regions) {
    return regions.reduce( (ret, item) => {
      Object.keys(item).filter(k => k !== 'total').forEach(k => ret.total += item[k]);
      return ret;
    }, {total: 0}).total;
  },

  parseData(summary, years) {
    return Object.keys(summary)
          .map(age => {
            return {
              label: age,
              values: [{
                x: this.selectedYear(years),
                y: this.sumAll(summary[age]),
              }],
            };
          });
  },

  render() {
    if (!this.state.size) {
      return (<div>empty</div>);
    }

    if (this.props.data.length === 0) {
      return false;
    }
    const keys = Object.keys(this.props.data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASES' && key !== 'YEAR' && key !== '_id');
    const years = Object.keys(func.Result.groupBy(this.props.data, 'YEAR'));
    const sum = func.Result.sumByGroupBy(this.props.data, 'CHILD_TYPE', keys);
    return (
      <div className="ipd-by-age-chart">
        <h3 className="chart-title"><T k="chart.ipd-by-age-chart.title" /> - <span className="chart-helptext"><T k="chart.ipd-by-age-chart.helptext" /></span></h3>
        <div className="chart-container ">
          <TSetChildProps>
            <BarChart
                data={this.parseData(sum, years)}
                groupedBars={true}
                height={180}
                margin={{top: 10, bottom: 20, left: 50, right: 10}}
                width={this.state.size.width * 0.20}
                xAxis={{label: {k: `chart.ipd-by-age-chart.x-axis`}}}
                yAxis={{label: {k: 'chart.ipd-by-age-chart.y-axis'}}} />
              </TSetChildProps>
        </div>
      </div>

    );
  },
});

export default IpdByAgeChart;

