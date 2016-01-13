import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from '../../constants/open-closed';
import FamilityBarChart from './family-barchar';
import FamilityPlanChart from './family-plan-chart';

const FamilyCharts = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    metrics: PropTypes.object,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  render() {
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="row">
            <div className="mainChart">
              <FamilityBarChart {...this.props}/>
            </div>
          </div>
          <div className="row">
            <div className="mainChart">
              <FamilityPlanChart  {...this.props}/>
            </div>
          </div>
        </div>
      </div>);
  },
});

export default FamilyCharts;
