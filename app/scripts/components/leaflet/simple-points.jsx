/**
 * TODO: remove waterpoints-specific hardcoded stuff from this module
 * so that it will be easier to add points for boreholes and dams (if
 * we ever get that data)
 */

import { Map, CircleMarker, LayerGroup } from 'leaflet';
import React, { PropTypes } from 'react';
import { point, Color } from '../../utils/colours';
import isNaN from 'lodash/lang/isNaN';
import { Marker } from 'react-leaflet';
import { Maybe, _ } from 'results';
import AsyncState from '../../constants/async';

const SimplePoints = React.createClass({
  propTypes: {
    data: PropTypes.array.isRequired,
    deselect: PropTypes.func,  // injected
    ensureSelect: PropTypes.func,  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    select: PropTypes.func.isRequired,
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
  },

  componentWillMount() {
    this.layerGroup = new LayerGroup(); // create Layer
  },

  componentDidMount() {
    this.updateMap();
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  },

  componentDidUpdate() {
    this.updateMap();
  },

  componentWillUnmount() {
    this.layerGroup.clearLayers();
    this.props.map.removeLayer(this.layerGroup);
  },

  updateMap() {
    const invalidLatLon = (item) => item.position && !isNaN(item.position[0]) && !isNaN(item.position[1]);
    this.layerGroup.clearLayers();
    this.props.data.filter(invalidLatLon).map(this.createMarker);
    this.props.map.addLayer(this.layerGroup);
  },

  createMarker(item) {
    const color = Color.getFacilityColor(item['FACILITY TYPE']);
    const m = new CircleMarker(item.position, point.normal(color));
    m.setOpacity = () => null;  // PruneCluster tries to call this
    m.on('click', this.handleMarkerClickFor(item.POINT_ID));
    m.on('mouseout', this.handleMouseoutFor(color));
    m.on('mouseover', this.handleMouseover(item.POINT_ID));
    this.layerGroup.addLayer(m);
    return m;
  },

  handleMarkerClickFor(id) {
    return () => this.props.ensureSelect(id);
  },

  handleMouseoutFor(color) {
    return e => {
      e.target.setStyle(point.normal(color));
      this.props.deselect();
    };
  },

  handleMouseover(id) {
    return (e) => {
      e.target.setStyle(point.hovered);
      this.props.select(id);
    };
  },

  render() {
    return Maybe.match(this.props.selected, {
      None: () => (  // no popup selected, render nothing
        <div style={{display: 'none'}}></div>
      ),
      Some: selected => {
        return AsyncState.match(selected.loadState, {
          Finished: () => Maybe.match(selected.details, {
            Some: details => (<Marker map={this.props.map} position={details.position}/>),
            [_]: () => (<div style={{display: 'none'}}></div>),
          }),
          [_]: () => (<div style={{display: 'none'}}></div>),
        });
      },
    });
  },
});

export default SimplePoints;
