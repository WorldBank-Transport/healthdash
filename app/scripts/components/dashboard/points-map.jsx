import pick from 'lodash/object/pick';
//import { Maybe } from 'results';
import React, { PropTypes } from 'react';
import { Map } from 'leaflet';
import { CircleMarker } from 'react-leaflet';
import colours from '../../utils/colours';

const PointsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point popup
    data: PropTypes.array,  // injected
    deselect: PropTypes.func,  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    select: PropTypes.func,  // injected
  },

  getInitialState() {
    return {
      flyoutVisible: false,
      item: null,
    };
  },

  handleMarkerClickFor(id) {
    return () => this.props.select(id);
  },

  handleMouseoutFor() {
    //this.replaceState(this.getInitialState());
  },

  handleMouseover(item) {
    return () => {
      this.replaceState({
        flyoutVisible: true,
        item: item,
      });
    };
  },

  createMarker(item) {
    return (<CircleMarker
        center={item.position}
        color={colours.bgColor}
        fillColor={colours.theme}
        fillOpacity={1}
        key={item.POINT_ID}
        map={this.props.map}
        onLeafletClick={this.handleMarkerClickFor(item.POINT_ID)}
        onLeafletMouseout={this.handleMouseoutFor}
        onLeafletMouseover={this.handleMouseover(item)}
        opacity={0.75}
        radius={4}
        weight={1} />);
  },

  renderPoints() {
    const invalidLatLon = (item) => item.position && !isNaN(item.position[0]) && !isNaN(item.position[1]);
    const points = this.props.data.filter(invalidLatLon).map(this.createMarker);
    return (
      <div>
        {points}
      </div>);
  },

  renderFlyout() {
    if (this.state.flyoutVisible) {
      return (<div className="flyout-inner">{JSON.stringify(this.state.item)}</div>);
    } else {
      return false;
    }
  },

  render() {
    const propsForPopup = pick(this.props,
      [ 'data', 'dataType', 'deselect', 'selected', 'viewMode' ]);
    const popup = this.props.children ?
      React.cloneElement(this.props.children, propsForPopup) : null;
    return (
      <div>
        {this.renderPoints()}

        {/* A point popup, if a point is selected */}
        {popup}
        {this.renderFlyout()}
      </div>
    );
  },
});

export default PointsMap;
