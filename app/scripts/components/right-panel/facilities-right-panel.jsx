import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { styles } from '../../utils/searchUtil';
import T from '../misc/t';
import { Link } from 'react-router';
import Autocomplete from 'react-autocomplete';
import { Result } from '../../utils/functional';
import TypeSelector from '../filters/type-selector';
import { Icon } from 'react-font-awesome';

require('stylesheets/right-panel/right-panel');

const imageTypeMapping = {
  DISPENSARY: 'facilities-DISPENSARY.png',
  'HEALTH CENTRE': 'facilities-HEALTH-CENTRE.png',
  CLINIC: 'facilities-CLINIC.png',
  HOSPITAL: 'facilities-HOSPITAL.png',
};

const FacilitiesRightPanel = React.createClass({
  propTypes: {
    children: PropTypes.node, // injected
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    setSelected: PropTypes.func,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  select(value, item) {
    this.props.setSelected(item.FACILITY_ID_NUMBER); // TODO fixme
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

  renderViewModes(viewModes) {
    return (<ul>
        {viewModes.map(viewMode => (<li><Link activeClassName="active" to={`/dash/${viewMode}/facilities/`}><span className="selectable"/><T k={`dash.${viewMode}`} /></Link></li>))}
    </ul>);
  },

  renderHealthType() {
    const healthFacilitiesType = Result.groupBy(this.props.data, 'FACILITY TYPE');
    return (
      <div className="row">
      {Object.keys(healthFacilitiesType).map(key =>
        (<MetricSummary icon={imageTypeMapping[key]} metric={healthFacilitiesType[key].length} title={`chart.facilities.type.${key}`}/>)
      )}
      </div>
    );
  },

  render() {
    return (
      <div className="container">
        <div className="row search-wrapper">
        <Icon type={`search`}/>
          <Autocomplete
              getItemValue={(item) => item.FACILITY_NAME}
              initialValue="search"
              items={this.props.data}
              onSelect={this.select}
              renderItem={(item, isHighlighted) => (
                <div key={item.FACILITY_NAME}
                    style={isHighlighted ? styles.highlightedItem : styles.item}>{item.FACILITY_NAME}</div>
              )}
              shouldItemRender={this.matchStateToTerm}
              sortItems={this.sortStates} />
        </div>
        <div className="row view-modes">
          <h5><T k="view-mode.dashview"/></h5>

          {
            this.renderViewModes(['points', 'regions', 'districts'])
          }
        </div>

        <div className="type-selector-wrapper">
          <h5>Filter Facility Types</h5>
          <TypeSelector />
        </div>

        <div className="row facilities-overview">
          <MetricSummary icon="facilities.png" metric={this.props.data.length} title="chart.facilities.title"/>
        </div>

        <div className="row health-type">
          {this.renderHealthType()}
        </div>
      </div>);
  },
});

export default FacilitiesRightPanel;
