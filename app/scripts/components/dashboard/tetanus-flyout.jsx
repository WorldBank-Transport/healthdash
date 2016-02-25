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
        <span className="flyout-section"><h3><T k="flyout.region"/>: {this.props.region}</h3></span>
        <span className="flyout-section"><T k="flyout.tetanus.projected"/>: <h3><FormattedNumber value={this.props.data[0]['PROJECTED CLIENTS']}/></h3></span>
        <span className="flyout-section"><T k="flyout.tetanus.total"/>: <h3><FormattedNumber value={this.props.data[1]['TOTAL ATTENDANCE']}/></h3></span>
        <span className="flyout-section"><T k="flyout.tetanus.tt2-coverage"/>: <h3><FormattedNumber value={this.props.data[2]['TT2 VACCINATION COVERAGE']}/></h3></span>
        <span className="flyout-section"><T k="flyout.tetanus.perc-tt2-coverage"/>: <h3><FormattedNumber value={this.props.data[3]['% TT2 VACCINATION COVERAGE']}/></h3></span>
      </div>
    );
  },
});

export default TetanusFlyout;
