import React, { PropTypes } from 'react';
import T from '../misc/t';
import {FormattedNumber, IntlMixin} from 'react-intl';
require('stylesheets/dashboard/flyout');

const HealthWorkerFlyout = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    hrwDensities: PropTypes.array.isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
  },

  mixins: [IntlMixin],

  renderDensities() {
    return (
      <div>
        <span className="flyout-label"><T k="flyout.workers.densities"/></span>
        <ul>
          {this.props.hrwDensities
            .filter(item => item['HEALTH WORKERS'] !== 'TOTAL POPULATION')
            .map(item => (<li><span className="flyout-label">{item['HEALTH WORKERS']}</span><span className="flyout-data">{item[this.props.region]}</span></li>))
          }
        </ul>
      </div>
    );
  },

  render() {
    const ratio = this.props.data.value ? Math.round(this.props.population / this.props.data.value) : 0;
    return (
      <div className="worker-flyout-stats">
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.region"/>:</span> <span className="flyout-data">{this.props.region}</span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.workers.length"/>:</span> <span className="flyout-data"><FormattedNumber value={this.props.data.value}/></span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.worker.population.ratio"/>:</span> <span className="flyout-data"><FormattedNumber value={ratio}/></span></span>
        <span className="flyout-section"><span className="flyout-label"><T k="flyout.population"/>:</span> <span className="flyout-data"><FormattedNumber value={this.props.population}/></span></span>
        <span className="flyout-section">{this.renderDensities()}</span>
      </div>
    );
  },
});

export default HealthWorkerFlyout;
