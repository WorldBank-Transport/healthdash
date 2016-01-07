import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';

const DeliveriesFlyout = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    region: PropTypes.string.isRequired,
  },

  render() {
    return (
      <div>
        <h3>{this.props.region}</h3>
        <h5><T k="flyout.deliveries.total"/>: {this.props.data[0]['TOTAL']}</h5>
        <h5><T k="flyout.deliveries.health-facilities-deliveries"/>: {this.props.data[1]['HEALTH FACILITY DELIVERIES']}</h5>
        <h5><T k="flyout.deliveries.traditional"/>: {this.props.data[2]['TRADITIONAL BIRTH ATTENDANT']}</h5>
        <h5><T k="flyout.deliveries.antenatal-care"/>: {this.props.data[3]['ANTENATAL CARE PROJECTION']}</h5>
        <h5><T k="flyout.deliveries.bba"/>: {this.props.data[4]['BORN BEFORE ARRIVAL (BBA)']}</h5>
        <h5><T k="flyout.deliveries.home"/>: {this.props.data[5]['HOME DELIVERY']}</h5>
      </div>
    );
  },
});

export default DeliveriesFlyout;
