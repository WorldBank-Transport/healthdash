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
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.region"/>:</span> <span className="flyout-data">{this.props.region}</span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.family.new-clients"/>:</span> <span className="flyout-data"><FormattedNumber value={this.props.data[1]['NEW CLIENTS']}/></span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.family.continuious"/>:</span> <span className="flyout-data"><FormattedNumber value={this.props.data[2]['FAMILY PLANNING CONTINUIOUS']}/></span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.family.total"/>:</span> <span className="flyout-data"><FormattedNumber value={this.props.data[0]['TOTAL FAMILY PLANNING CLIENTS']}/></span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.family.projected"/>:</span> <span className="flyout-data"><FormattedNumber value={this.props.data[3].PROJECTED_FAMILY_PLANNING}/></span></span>
      </div>
    );
  },
});

export default FamilyPlanningFlyout;
