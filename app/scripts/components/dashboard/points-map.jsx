import pick from 'lodash/object/pick';
//import { Maybe } from 'results';
import React, { PropTypes } from 'react';
import { Map } from 'leaflet';
import { CircleMarker, LayerGroup, Circle, Marker, Popup } from 'react-leaflet';
import colours from '../../utils/colours';

import SimplePoints from '../leaflet/simple-points';


const PointsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point popup
    data: PropTypes.array,  // injected
    deselect: PropTypes.func,  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    select: PropTypes.func,  // injected
  },

  handleMarkerClickFor(id) {
    return () => this.props.select(id);
  },

  createMarker(item) {
    return (<CircleMarker
            color={colours.bgColor}
            fillColor={colours.theme}
            fillOpacity={1}
            key={item.POINT_ID}
            onLeafletClick={this.handleMarkerClickFor(item.POINT_ID)}
            opacity={0.75}
            map={this.props.map}
            center={item.position}
            radius={4}
            weight={1}
            />);
  },

  renderPoints() {
    const invalidLatLon = (item) => item.position && !isNaN(item.position[0]) && !isNaN(item.position[1]);
    const points = this.props.data.filter(invalidLatLon).map(this.createMarker);
    return (
      <div>
        {points}
      </div>);
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

      </div>
    );
  },
});

export default PointsMap;
