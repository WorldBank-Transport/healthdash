import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import {FormattedNumber, IntlMixin} from 'react-intl';

require('stylesheets/dashboard/flyout');

const FacilitiesFlyout = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
  },

  mixins: [IntlMixin],

  renderSum(summary, title, total) {
    return (
      <div className="facilities">
        <h4><T k={title}/></h4>
        {
          Object.keys(summary).map(key =>
            (<h5><T k={`flyout.facilities.${key}`}/>: <FormattedNumber minimumFractionDigits="2" style="percent" value={(summary[key].length / total)} /></h5>)
          )
        }
      </div>);
  },

  render() {
    const types = Result.groupBy(this.props.data, 'FACILITY TYPE');
    const status = Result.groupBy(this.props.data, 'OPERATING_STATUS');
    const ownership = Result.groupBy(this.props.data, 'OWNERSHIP');

    return (
      <div className="facilities-stats">
        <h3>{this.props.region}</h3>
        <h5><T k="flyout.facilities.length"/>: {this.props.data.length}</h5>
        <h5><T k="flyout.facilities.pupulation"/>: {Math.round(this.props.population / this.props.data.length)}</h5>
        {this.renderSum(types, 'flyout.facilities.type', this.props.data.length)}
        {this.renderSum(status, 'flyout.facilities.status', this.props.data.length)}
        {this.renderSum(ownership, 'flyout.facilities.ownership', this.props.data.length)}
      </div>
    );
  },
});

export default FacilitiesFlyout;
