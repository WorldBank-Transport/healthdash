import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from '../../constants/open-closed';
import DeathByAgeChart from './death-by-age-chart';
import DeathByDeseaseChart from './death-by-desease-chart';

const DeathCharts = React.createClass({
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
              <DeathByAgeChart {...this.props}/>
            </div>
          </div>
          <div className="row">
            <div className="mainChart">
              <DeathByDeseaseChart  {...this.props}/>
            </div>
          </div>
        </div>
      </div>);
  },
});

export default DeathCharts;
