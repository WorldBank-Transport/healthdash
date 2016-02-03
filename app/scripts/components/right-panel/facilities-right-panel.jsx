import React, { PropTypes } from 'react';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import MetricSummary from '../charts/metric-summary-chart';
import { styles } from '../../utils/searchUtil';
import T from '../misc/t';
import Autocomplete from 'react-autocomplete';
import { Result } from '../../utils/functional';
import TypeSelector from '../filters/type-selector';
import { Icon } from 'react-font-awesome';
import Rating from '../dashboard/rating';

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
    ensureDeselect: PropTypes.func,  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    setSelected: PropTypes.func,
    url: PropTypes.string.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getInitialState() {
    return {help: 'block'};
  },

  select(value, item) {
    this.props.setSelected(item.FACILITY_ID_NUMBER);
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
    return (<select id="viewmode" onChange={this.change} value={this.props.url} >
              {viewModes.map(viewMode => <option value={`#/dash/${viewMode}/facilities/`}><T k={`dash.${viewMode}`} /></option>)}
            </select>);
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

  change(event) {
    event.preventDefault();
    this.props.url = event.target.value;
    window.location.href = event.target.value;
  },

  closeHelp(e) {
    e.preventDefault();
    this.replaceState({
      ...this.state,
      help: 'none',
    });
  },

  renderNational() {
    return (
      <div className="container">
        <div className="row search-wrapper">
        <Icon type={`search`}/>
          <div className="search-field-help" onClick={this.closeHelp} style={{display: this.state.help}}><T k="search.help-field" /></div>
          <Autocomplete
              getItemValue={(item) => item.FACILITY_NAME}
              initialValue=""
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
          <h5><T k="right-panel.filter"/></h5>
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

  renderLoading() {
    return (<h3><T k="right-panel.loading"/></h3>);
  },

  renderNotFound(id) {
    return (<h3>{id} <T k="right-panel.not-found"/></h3>);
  },

  renderPointSelected(details) {
    return (
      <div>
        <div className="row">
          <button onClick={this.props.ensureDeselect}><T k="right-panel.button.back"/></button>
        </div>
        <div className="row">
          <ul className="point-selected">
            <li><T k="flyout.facility-name"/>:{details.FACILITY_NAME}</li>
            <li><T k="flyout.type"/>: {details['FACILITY TYPE']}</li>
            <li><T k="flyout.id"/>: {details.FACILITY_ID_NUMBER}</li>
            <li><T k="flyout.rating"/>: <Rating facility={details} /></li>
            <li><T k="flyout.region"/>: {details.REGION}</li>
            <li><T k="flyout.zone"/>: {details.ZONE}</li>
            <li><T k="flyout.council"/>: {details.COUNCIL}</li>
            <li><T k="flyout.ownership"/>: {details.OWNERSHIP}</li>
            <li><T k="flyout.status"/>: {details.OPERATING_STATUS}</li>
          </ul>
        </div>
      </div>);
  },

  renderPolygonSelected(details) {
    return (<p>Not implemented: {JSON.stringify(details)}</p>);
  },

  renderFacility(selected) {
    return (
      <div className="container">
        {AsyncState.match(selected.loadState, {
          Finished: () => Maybe.match(selected.details, {
            None: () => this.renderNotFound(selected.id),
            Some: details => ViewModes.match(this.props.viewMode, {
              Points: () => this.renderPointSelected(details),
              [_]: () => this.renderPolygonSelected(details),
            }),
          }),
          [_]: this.renderLoading,
        })}
      </div>);
  },

  render() {
    return Maybe.match(this.props.selected, {
      None: () => this.renderNational(),
      Some: (selected) => this.renderFacility(selected),
    });
  },
});

export default FacilitiesRightPanel;
