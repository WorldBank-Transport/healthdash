import React, { PropTypes } from 'react';
import T from '../misc/t';
import {FormattedNumber, IntlMixin} from 'react-intl';
require('stylesheets/dashboard/flyout');


const DeliveriesFlyout = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    region: PropTypes.string.isRequired,
  },

  mixins: [IntlMixin],

  render() {
    return (
      <div>
        <span className="flyout-section">
            <span className="flyout-label"><T k="flyout.region"/>:</span>
            <span className="flyout-data">{this.props.region}</span>
        </span>
        <span className="flyout-section">
            <span className="flyout-label"><T k="flyout.deliveries.total"/>:</span>
            <span className="flyout-data"><FormattedNumber value={this.props.data[0].TOTAL}/></span>
        </span>
        <span className="flyout-section">
          <span className="flyout-label"><T k="flyout.deliveries.health-facilities-deliveries"/>:</span>
          <span className="flyout-data"><FormattedNumber value={this.props.data[1]['HEALTH FACILITY DELIVERIES']}/></span>
        </span>
        <span className="flyout-section">
          <span className="flyout-label"><T k="flyout.deliveries.traditional"/>:</span>
          <span className="flyout-data">{this.props.data[2]['TRADITIONAL BIRTH ATTENDANT']}</span>
        </span>
        <span className="flyout-section">
          <span className="flyout-label"><T k="flyout.deliveries.antenatal-care"/>:</span>
          <span className="flyout-data"><FormattedNumber value={this.props.data[3]['ANTENATAL CARE PROJECTION']}/></span>
        </span>
        <span className="flyout-section">
          <span className="flyout-label"><T k="flyout.deliveries.bba"/>:</span>
          <span className="flyout-data"><FormattedNumber value={this.props.data[4]['BORN BEFORE ARRIVAL (BBA)']}/></span>
        </span>
        <span className="flyout-section">
          <span className="flyout-label"><T k="flyout.deliveries.home"/>:</span>
          <span className="flyout-data"><FormattedNumber value={this.props.data[5]['HOME DELIVERY']}/></span>
        </span>
      </div>
    );
  },
});

export default DeliveriesFlyout;
