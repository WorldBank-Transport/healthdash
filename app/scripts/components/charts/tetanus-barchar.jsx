import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3-components';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import T from '../misc/t';
import Resize from '../../utils/resize-mixin';
import ViewModes from '../../constants/view-modes';
import ShouldRenderMixin from '../../utils/should-render-mixin';

require('stylesheets/charts/tetanus-barchart');

const TetanusBarChart = React.createClass({
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

  getValue(values, metric) {
    return values.reduce((ret, item) => {
      if (item.hasOwnProperty(metric)) {
        ret.value = item[metric];
      }
      return ret;
    }, {value: 0}).value;
  },

  parseData(summary, keys) {
    return keys.map(metric => {
      return {
        label: metric,
        values: Object.keys(summary).map(year => {
          return {
            x: year,
            y: this.getValue(summary[year], metric),
          };
        }),
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
    const keys = ['PROJECTED CLIENTS', 'TOTAL ATTENDANCE', 'TT2 VACCINATION COVERAGE'];
    const sum = func.Result.sumByGroupBy(this.props.data, 'YEAR', keys);
    return (
      <div className="tetanus-barchart">
        <h3 className="chart-title"><T k="chart.tetanus-barchart.title" /> - <span className="chart-helptext"><T k="chart.tetanus-barchart.helptext" /></span></h3>
        <div className="chart-container ">
          <TSetChildProps>
            <BarChart
                data={this.parseData(sum, keys)}
                groupedBars={true}
                height={280}
                margin={{top: 10, bottom: 20, left: 60, right: 10}}
                width={this.state.size.width * 0.90}
                xAxis={{label: {k: `chart.tetanus-barchart.x-axis`}}}
                yAxis={{label: {k: 'chart.tetanus-barchart.y-axis'}}} />
              </TSetChildProps>
        </div>
      </div>

    );
  },
});

export default TetanusBarChart;
