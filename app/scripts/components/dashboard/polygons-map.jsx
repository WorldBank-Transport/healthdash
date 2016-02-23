import pick from 'lodash/object/pick';
import { connect } from 'reflux';
import { Maybe } from 'results';
import React, { PropTypes } from 'react';
import { Map, LayerGroup, geoJson } from 'leaflet';

import PopulationStore from '../../stores/population';

import colours, { polygon as polyColour } from '../../utils/colours';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import { getMapRanges, getMapValue } from '../../utils/mapUtil';

import Legend from './legend';
import Flyout from './flyout';

const PolygonsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    deselect: PropTypes.func,  // injected
    ensureSelect: PropTypes.func,  // injected
    hover: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    hrwDensities: PropTypes.array.isRequired,
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    mapDrillDown: PropTypes.func,  // injected
    polygonsData: PropTypes.array,  // injected
    select: PropTypes.func,  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [
    connect(PopulationStore, 'population'),
  ],

  componentWillMount() {
    this.layerGroup = new LayerGroup(); // create Layer
  },

  shouldComponentUpdate(nextProps) {
    return this.props.polygonsData !== nextProps.polygonsData
      || this.props.hover !== nextProps.hover;
  },

  componentDidUpdate(nextProps) {
    if (this.props.polygonsData !== nextProps.polygonsData) {
      this.updateMap();
    }
  },

  componentWillUnmount() {
    if (this.layerGroup) {
      this.layerGroup.clearLayers();
      delete this.layerGroup;
    }
  },


  handleClickFor(feature) {
    //return () => this.props.mapDrillDown(feature.id); TODO drill down when we have data
    return () => this.props.ensureSelect(feature.id);
  },

  handleMouseoutFor(feature) {
    const colour = this.getFeatureColor(feature);
    return e => {
      this.props.deselect();
      e.target.setStyle(polyColour.normal(colour));
    };
  },

  handleMouseover(feature) {
    return e => {
      //e.target.bringToFront();
      e.target.setStyle(polyColour.hovered);
      this.props.select(feature.id);
    };
  },

  getColorInRange(d) {
    return (rs) => {
      const found = rs.filter(r => getMapValue(d, this.props.dataType) > r.min && getMapValue(d, this.props.dataType) < r.max);
      if (found.length > 0) {
        return found[0].color;
      } else {
        return colours.unknown;
      }
    };
  },

  getFeatureColor(feature) {
    // compute average per polygon
    const ranges = getMapRanges(this.props.dataType);
    return feature.properties.data
      .andThen(d => ranges.andThen(this.getColorInRange(d)))
      .unwrapOr(colours.unknown);
  },

  onEachFeature(feature, layer) {
    layer.on('click', this.handleClickFor(feature));
    layer.on('mouseout', this.handleMouseoutFor(feature));
    layer.on('mouseover', this.handleMouseover(feature));
  },


  updateMap() {
    this.layerGroup.clearLayers();
    const polygons = new geoJson(this.props.polygonsData, {
      style: (feature) => polyColour.normal(this.getFeatureColor(feature)),
      onEachFeature: this.onEachFeature,
    });
    this.layerGroup.addLayer(polygons);
    this.props.map.addLayer(this.layerGroup);
  },

  render() {
    const propsForPopup = pick(this.props,
      [ 'data', 'dataType', 'deselect', 'hover', 'hrwDensities', 'viewMode']);
    return (
      <div>
        (<Flyout {...propsForPopup} population={this.state.population}/>)
        <Legend dataType={this.props.dataType} ranges={getMapRanges(this.props.dataType)}/>
      </div>
    );
  },
});

export default PolygonsMap;
