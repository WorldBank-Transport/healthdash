import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';
import DataTypes from '../../constants/data-types';
import MetricSummary from '../charts/metric-summary-chart';
import ViewModes from '../../constants/view-modes';
import { styles } from '../../utils/searchUtil';
import T from '../misc/t';
import Autocomplete from 'react-autocomplete';
import { Result } from '../../utils/functional';
import TypeSelector from '../filters/type-selector';
import { Icon } from 'react-font-awesome';
import Rating from '../dashboard/rating';
import PopulationStore from '../../stores/population';

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
    ensureSelect: PropTypes.func,
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    url: PropTypes.string.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [
    connect(PopulationStore, 'population'),
  ],

  getInitialState() {
    return {help: 'block'};
  },

  select(value, item) {
    this.props.ensureSelect(item.POINT_ID);
  },

  matchStateToTerm(state, value) {
    return value.length > 1 && (
      state.FACILITY_NAME.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  },
  sortStates(a, b, value) {
    return (
      a.FACILITY_NAME.toLowerCase().indexOf(value.toLowerCase()) >
      b.FACILITY_NAME.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
    );
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
          <div className="search-help"><T k="search.help" /></div>
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
          <button className="back-national" onClick={this.props.ensureDeselect}><span className="back-symbol">&#171;</span><T k="right-panel.button.back"/></button>
        </div>
        <div className="row">
          <ul className="point-selected">
            <li><span className="point-label"><T k="flyout.facility-name"/>:</span>{details.FACILITY_NAME}</li>
            <li><span className="point-label"><T k="flyout.type"/>:</span> {details['FACILITY TYPE']}</li>
            <li><span className="point-label"><T k="flyout.id"/>:</span> {details.FACILITY_ID_NUMBER}</li>
            <li><span className="point-label"><T k="flyout.rating"/>:</span> <Rating facility={details} /></li>
            <li><span className="point-label"><T k="flyout.region"/>:</span> {details.REGION}</li>
            <li><span className="point-label"><T k="flyout.zone"/>:</span> {details.ZONE}</li>
            <li><span className="point-label"><T k="flyout.council"/>:</span> {details.COUNCIL}</li>
            <li><span className="point-label"><T k="flyout.ownership"/>:</span> {details.OWNERSHIP}</li>
            <li><span className="point-label"><T k="flyout.status"/>:</span> {details.OPERATING_STATUS}</li>
          </ul>
        </div>
      </div>);
  },

  renderSum(summary, title, total) {
    return (
      <div className="facilities">
        <T k={title}/>
        <ul className="summary">
        {
          Object.keys(summary).map(key =>
            (<li><T k={`flyout.facilities.${key}`}/>: {(summary[key].length / total * 100).toFixed(2)} %</li>)
          )
        }
        </ul>
      </div>);
  },

  renderPolygonSelected(details) {
    return (
      <div>
        <div className="row">
          <button className="back-national" onClick={this.props.ensureDeselect}><span className="back-symbol">&#171;</span><T k="right-panel.button.back"/></button>
        </div>
        <div className="row">
          {
            Maybe.match(details.properties.data, {
              None: () => this.renderNotFound(details.id),
              Some: data => {
                const types = Result.groupBy(data, 'FACILITY TYPE');
                const status = Result.groupBy(data, 'OPERATING_STATUS');
                const ownership = Result.groupBy(data, 'OWNERSHIP');
                const polyType = ViewModes.getDrillDown(this.props.viewMode);
                const popAgg = Result.sumByGroupBy(this.state.population, polyType, ['TOTAL']);
                const popPoly = popAgg[details.id] || [{TOTAL: 0}];
                return (
                  <ul className="point-selected">
                    <li><T k="flyout.region"/>: {details.id}</li>
                    <li><T k="flyout.facilities.length"/>: {data.length}</li>
                    <li><T k="flyout.facilities.pupulation"/>: {Math.round(popPoly[0].TOTAL / data.length)}</li>
                    <li>{this.renderSum(types, 'flyout.facilities.type', this.props.data.length)}</li>
                    <li>{this.renderSum(status, 'flyout.facilities.status', this.props.data.length)}</li>
                    <li>{this.renderSum(ownership, 'flyout.facilities.ownership', this.props.data.length)}</li>
                  </ul>
                );
              },
            })
          }
        </div>
      </div>);
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
