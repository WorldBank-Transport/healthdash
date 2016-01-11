import React, { PropTypes } from 'react';
import T from '../misc/t';

const DeliveriesFlyout = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    region: PropTypes.string.isRequired,
  },

  render() {
    return (
      <div>
        <span className="flyout-section"><T k="flyout.region"/>: <h3>{this.props.region}</h3></span>
        <span className="flyout-section"><T k="flyout.deliveries.total"/>: <h3>{this.props.data[0].TOTAL}</h3></span>
        <span className="flyout-section"><T k="flyout.deliveries.health-facilities-deliveries"/>: <h3>{this.props.data[1]['HEALTH FACILITY DELIVERIES']}</h3></span>
        <span className="flyout-section"><T k="flyout.deliveries.traditional"/>: <h3>{this.props.data[2]['TRADITIONAL BIRTH ATTENDANT']}</h3></span>
        <span className="flyout-section"><T k="flyout.deliveries.antenatal-care"/>: <h3>{this.props.data[3]['ANTENATAL CARE PROJECTION']}</h3></span>
        <span className="flyout-section"><T k="flyout.deliveries.bba"/>: <h3>{this.props.data[4]['BORN BEFORE ARRIVAL (BBA)']}</h3></span>
        <span className="flyout-section"><T k="flyout.deliveries.home"/>: <h3>{this.props.data[5]['HOME DELIVERY']}</h3></span>
      </div>
    );
  },
});

export default DeliveriesFlyout;
