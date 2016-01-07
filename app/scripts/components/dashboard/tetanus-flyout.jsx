import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';

const TetanusFlyout = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    region: PropTypes.string.isRequired,
  },

  render() {
    return (
      <div>
        <h3>{this.props.region}</h3>
        <h5><T k="flyout.tetanus.projected"/>: {this.props.data[0]['PROJECTED CLIENTS']}</h5>
        <h5><T k="flyout.tetanus.total"/>: {this.props.data[1]['TOTAL ATTENDANCE']}</h5>
        <h5><T k="flyout.tetanus.tt2-coverage"/>: {this.props.data[2]['TT2 VACCINATION COVERAGE']}</h5>
        <h5><T k="flyout.tetanus.perc-tt2-coverage"/>: {this.props.data[3]['% TT2 VACCINATION COVERAGE']}</h5>
      </div>
    );
  },
});

export default TetanusFlyout;
