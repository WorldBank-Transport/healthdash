import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { Result } from '../../utils/functional';
import T from '../misc/t';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';

const metrics = ['TOTAL', 'HEALTH FACILITY DELIVERIES', 'TRADITIONAL BIRTH ATTENDANTS (TBA)', 'ANTENATAL CARE PROJECTION', 'BORN BEFORE ARRIVAL (BBA)', 'HOME DELIVERY'];

const DeliveriesRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getDeliveries(stats, m) {
    return stats[m].value || 0;
  },

  renderLoading() {
    return (<h5 className="missing-data"><T k="right-panel.loading"/></h5>);
  },

  renderNotFound(id) {
    return (<h5 className="missing-data">{id} <T k="right-panel.not-found"/></h5>);
  },

  renderRegion(selected) {
    return AsyncState.match(selected.loadState, {
      Finished: () => Maybe.match(selected.details, {
        None: () => this.renderNotFound(selected.id),
        Some: details => Maybe.match(details.properties.data, {
          None: () => this.renderNotFound(details.id),
          Some: data => {
            return (
              <div className="container other-selections">
                <h3><T k="data-type.deliveries" /> {selected.id}</h3>
                <ul className="deliveries-list">
                  {metrics.map((m, i) => (
                    <li>
                      <MetricSummary icon="deliveries.png" metric={data[i][m]} title={`chart.deliveries-${m}.title`}/>
                    </li>
                  ))}
                </ul>
              </div>
            );
          },
        }),
      }),
      [_]: this.renderLoading,
    });
  },

  renderNational() {
    const stats = Result.sumByAll(this.props.data, metrics);
    return (
      <div className="container other-selections">
      <h3><T k="data-type.deliveries" /></h3>
        <div className="row">
          <MetricSummary icon="deliveries.png" metric={Math.round(stats.TOTAL.value / stats.TOTAL.total)} title={`chart.deliveries-average.title`}/>
        </div>
        <ul className="deliveries-list">
        {metrics.map(m => (
          <li>
            <MetricSummary icon="deliveries.png" metric={this.getDeliveries(stats, m)} title={`chart.deliveries-${m}.title`}/>
          </li>
        ))}
        </ul>
      </div>);
  },

  render() {
    return Maybe.match(this.props.selected, {
      None: () => this.renderNational(),
      Some: (selected) => this.renderRegion(selected),
    });
  },

});

export default DeliveriesRightPanel;
