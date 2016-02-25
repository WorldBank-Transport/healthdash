import React, { PropTypes } from 'react';
import T from '../misc/t';
import {FormattedNumber, IntlMixin} from 'react-intl';

const FamilyPlanningFlyout = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    region: PropTypes.string.isRequired,
  },

  mixins: [IntlMixin],

  render() {
    return (
      <div>
        <span className="flyout-section"><T k="flyout.region"/>: <h3>{this.props.region}</h3></span>
        <span className="flyout-section"><T k="flyout.family.new-clients"/>: <h3><FormattedNumber value={this.props.data[1]['NEW CLIENTS']}/></h3></span>
        <span className="flyout-section"><T k="flyout.family.continuious"/>: <h3><FormattedNumber value={this.props.data[2]['FAMILY PLANNING CONTINUIOUS']}/></h3></span>
        <span className="flyout-section"><T k="flyout.family.total"/>: <h3><FormattedNumber value={this.props.data[0]['TOTAL FAMILY PLANNING CLIENTS']}/></h3></span>
        <span className="flyout-section"><T k="flyout.family.projected"/>: <h3><FormattedNumber value={this.props.data[3].PROJECTED_FAMILY_PLANNING}/></h3></span>
      </div>
    );
  },
});

export default FamilyPlanningFlyout;
