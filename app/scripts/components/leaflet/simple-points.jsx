/**
 * TODO: remove waterpoints-specific hardcoded stuff from this module
 * so that it will be easier to add points for boreholes and dams (if
 * we ever get that data)
 */

import { Map, CircleMarker } from 'leaflet';
import React, { PropTypes } from 'react';
import colours from '../../utils/colours';
import isNaN from 'lodash/lang/isNaN';


const SimplePoints = React.createClass({
  propTypes: {
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    points: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
  },

  createMarker(item) {
    const m = new CircleMarker(item.position, {
      radius: 4,
      color: '#fff',
      opacity: 0.75,
      weight: 1,
      fillOpacity: 1,
      fillColor: colours.unknown,
    });
    m.setOpacity = () => null;  // PruneCluster tries to call this
    m.on('click', this.handleMarkerClickFor(item.POINT_ID));
    this.props.map.addLayer(m);
    return m;
  },

  handleMarkerClickFor(id) {
    return () => this.props.select(id);
  },

  render() {
    const invalidLatLon = (item) => item.position && !isNaN(item.position[0]) && !isNaN(item.position[1]);
    this.props.points.filter(invalidLatLon).map(this.createMarker);
    return <div style={{display: 'none'}}></div>;
  },
});

export default SimplePoints;
