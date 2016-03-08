import React, { PropTypes } from 'react';
import T from '../misc/t';
import {FormattedNumber, IntlMixin} from 'react-intl';

const TetanusFlyout = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    region: PropTypes.string.isRequired,
  },

  mixins: [IntlMixin],

  render() {
    return (
      <div>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.region"/>:</span> <span className="flyout-data">{this.props.region}</span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.tetanus.projected"/>:</span><span className="flyout-data"><FormattedNumber value={this.props.data[0]['PROJECTED CLIENTS']}/></span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.tetanus.total"/>:</span><span className="flyout-data"><FormattedNumber value={this.props.data[1]['TOTAL ATTENDANCE']}/></span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.tetanus.tt2-coverage"/>:</span><span className="flyout-data"><FormattedNumber value={this.props.data[2]['TT2 VACCINATION COVERAGE']}/></span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.tetanus.perc-tt2-coverage"/>:</span><span className="flyout-data"><FormattedNumber value={this.props.data[3]['% TT2 VACCINATION COVERAGE']}/></span></span>
      </div>
    );
  },
});

export default TetanusFlyout;
