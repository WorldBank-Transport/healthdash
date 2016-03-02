import React, { PropTypes } from 'react';
import { Result } from '../../utils/functional';
import T from '../misc/t';

require('stylesheets/dashboard/flyout');

const FacilitiesFlyout = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
  },

  renderSum(summary, title, total) {
    return (
      <div className="facilities">
        <h4><T k={title}/></h4>
        {
          Object.keys(summary).map(key =>
            (<div><span className="flyout-label"><T k={`flyout.facilities.${key}`}/>:</span> <span className="flyout-data">{(summary[key].length / total * 100).toFixed(2)} %</span></div>)
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
        <span className="facility-name">{this.props.region}</span>
        <div><span className="flyout-label"><T k="flyout.facilities.length"/>:</span> <span className="flyout-data">{this.props.data.length}</span></div>
        <div><span className="flyout-label"><T k="flyout.facilities.pupulation"/>:</span> <span className="flyout-data">{Math.round(this.props.population / this.props.data.length)}</span></div>
        {this.renderSum(types, 'flyout.facilities.type', this.props.data.length)}
        {this.renderSum(status, 'flyout.facilities.status', this.props.data.length)}
        {this.renderSum(ownership, 'flyout.facilities.ownership', this.props.data.length)}
      </div>
    );
  },
});

export default FacilitiesFlyout;
