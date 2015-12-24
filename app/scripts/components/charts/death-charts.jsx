import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import YearSelector from '../filters/year-selector'

const DeathCharts = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <YearSelector />
        </div>
        <div className="row">
          chart
        </div>
      </div>);
  },
});

export default DeathCharts;
