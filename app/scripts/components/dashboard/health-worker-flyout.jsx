import React, { PropTypes } from 'react';
import T from '../misc/t';
import {FormattedNumber, IntlMixin} from 'react-intl';

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
        <h3><T k="flyout.workers.densities"/></h3>
        <ul>
          {this.props.hrwDensities
            .filter(item => item['HEALTH WORKERS'] !== 'TOTAL POPULATION')
            .map(item => (<li><span className="flyout-worker">{item['HEALTH WORKERS']}</span><h5>{item[this.props.region]}</h5></li>))
          }
        </ul>
      </div>
    );
  },

  render() {
    const ratio = this.props.data.value ? Math.round(this.props.population / this.props.data.value) : 0;
    return (
      <div>
        <span className="flyout-section"><T k="flyout.region"/>: <h3>{this.props.region}</h3></span>
        <span className="flyout-section"><T k="flyout.workers.length"/>: <h3><FormattedNumber value={this.props.data.value}/></h3></span>
        <span className="flyout-section"><T k="flyout.worker.population.ratio"/>: <h3><FormattedNumber value={ratio}/></h3></span>
        <span className="flyout-section"><T k="flyout.population"/>: <h3><FormattedNumber value={this.props.population}/></h3></span>
        <span className="flyout-section">{this.renderDensities()}</span>
      </div>
    );
  },
});

export default HealthWorkerFlyout;
