import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import HealthFacilitiesChart from './health-facilities-barchar'
import MetricSummary from './metric-summary-chart';
import { styles } from '../../utils/searchUtil';
import T from '../misc/t';
import { _ } from 'results';
import { Link } from 'react-router';
import Autocomplete from 'react-autocomplete';

const FacilitiesCharts = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },
  select(value, item) {
    //this.props.setSelected(item.FACILITY_ID_NUMBER); // TODO fixme
  },

  matchStateToTerm(state, value) {
    return value.length > 2 && (
      state.FACILITY_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  },
  sortStates(a, b, value) {
    return (
      a.FACILITY_NAME.toLowerCase().indexOf(value.toLowerCase()) >
      b.FACILITY_NAME.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
    );
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <Autocomplete
            getItemValue={(item) => item.FACILITY_NAME}
            items={this.props.data}
            onSelect={this.select}
            renderItem={(item, isHighlighted) => (
              <div key={item.FACILITY_NAME}
                  style={isHighlighted ? styles.highlightedItem : styles.item}>{item.FACILITY_NAME}</div>
            )}
            shouldItemRender={this.matchStateToTerm}
            sortItems={this.sortStates} />
        </div>
        <div className="row">
          <MetricSummary icon="facilities.png" metric={this.props.data.length} title="chart.facilities.title"/>
        </div>
        <div className="row">
          <div className="mainChart">
            <HealthFacilitiesChart viewMode={this.props.viewMode} facilities={this.props.data} />
          </div>
        </div>
        <div className="row">
          {
            ViewModes.match(this.props.viewMode, {
              Points: () => (<Link activeClassName="active" to="/dash/regions/facilities/"><T k="dash.region" /></Link>),
              Regions: () => (<Link activeClassName="active" to="/dash/points/facilities/"><T k="dash.national" /></Link>),
              [_]: () => (<span>Error: invalid view mode</span>),
            })
          }
        </div>
      </div>);
  },
});

export default FacilitiesCharts;
