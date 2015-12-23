import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3-components';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import T from '../misc/t';
import Resize from '../../utils/resize-mixin';
import ViewModes from '../../constants/view-modes';
import ShouldRenderMixin from '../../utils/should-render-mixin';

require('stylesheets/charts/hiv-barchar');

const HivChart = React.createClass({
  propTypes: {
    facilities: PropTypes.array.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
  },

  mixins: [Resize, ShouldRenderMixin],

  getInitialState() {
    return {};
  },

  parseData(facilitiesStats) {
    const comparator = (a, b) => b.y - a.y;
    return [{
      label: 'Facilities by Region',
      values: Object.keys(facilitiesStats).filter(key => key !== 'total').map(key => {
        return {
          x: key,
          y: facilitiesStats[key],
        };
      }).sort(comparator),
    }];
  },

  render() {
    if (!this.state.size) {
      return (<div>empty</div>);
    }
    const facilitiesStats = func.Result.countBy(this.props.facilities, 'REGION');
    if (Object.keys(facilitiesStats).length === 0) {
      return false;
    }
    return (
      <div className="hiv-facilities-barchar">
        <h3 className="chart-title"><T k="chart.hiv-facilities.title" /> - <span className="chart-helptext"><T k="chart.hiv-facilities.helptext" /></span></h3>
        <div className="chart-container ">
          <TSetChildProps>
            <BarChart
                data={this.parseData(facilitiesStats)}
                height={200}
                margin={{top: 10, bottom: 80, left: 30, right: 10}}
                width={this.state.size.width * 0.20}
                xAxis={{label: {k: 'chart.hiv-facilities.x-axis'}}}
                yAxis={{label: {k: 'chart.hiv-facilities.y-axis'}}} />
              </TSetChildProps>
        </div>
      </div>
    );
  },
});

export default HivChart;
