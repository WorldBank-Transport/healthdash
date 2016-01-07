import React, { PropTypes } from 'react';
import T from '../misc/t';

const FamilyPlanningFlyout = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    region: PropTypes.string.isRequired,
  },

  render() {
    return (
      <div>
        <h3>{this.props.region}</h3>
        <h5><T k="flyout.family.total"/>: {this.props.data[0]['TOTAL FAMILY PLANNING CLIENTS']}</h5>
        <h5><T k="flyout.family.new-clients"/>: {this.props.data[1]['NEW CLIENTS']}</h5>
        <h5><T k="flyout.family.continuious"/>: {this.props.data[2]['FAMILY PLANNING CONTINUIOUS']}</h5>
        <h5><T k="flyout.family.projected"/>: {this.props.data[3]['PROJECTED FAMILY PLANNING CLIENTS']}</h5>
      </div>
    );
  },
});

export default FamilyPlanningFlyout;
