import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from '../../constants/open-closed';
import HealthFacilitiesChart from './health-facilities-barchar';
import PopulationFacilitiesChart from './population-facilities-barchart';

const HealthFacilitiesCharts = React.createClass({
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
              <HealthFacilitiesChart {...this.props}/>
            </div>
          </div>
          <div className="row">
            <div className="mainChart">
              <PopulationFacilitiesChart  {...this.props}/>
            </div>
          </div>
        </div>
      </div>);
  },
});

export default HealthFacilitiesCharts;
