import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from '../../constants/open-closed';
import HealthWorkersBarChart from './health-workers-barchart';
import HealthWorkerTypeChart from './health-worker-type-chart';

const HealthWorkersCharts = React.createClass({
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
              <HealthWorkersBarChart {...this.props}/>
            </div>
          </div>
          <div className="row">
            <div className="mainChart">
              <HealthWorkerTypeChart  {...this.props}/>
            </div>
          </div>
        </div>
      </div>);
  },
});

export default HealthWorkersCharts;
