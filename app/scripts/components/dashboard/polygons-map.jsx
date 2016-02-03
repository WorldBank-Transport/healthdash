import pick from 'lodash/object/pick';
import { connect } from 'reflux';
import { Maybe } from 'results';
import React, { PropTypes } from 'react';
import { Map } from 'leaflet';

import PopulationStore from '../../stores/population';

import colours, { polygon as polyColour } from '../../utils/colours';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import { getMapRanges, getMapValue } from '../../utils/mapUtil';

import { GeoJson } from 'react-leaflet';
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
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    mapDrillDown: PropTypes.func,  // injected
    polygonsData: PropTypes.array,  // injected
    select: PropTypes.func,  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [
    connect(PopulationStore, 'population'),
  ],

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

  renderFeature(feature) {
    // prefix the key with the viewMode, since regions districts might have the same name
    const key = `${this.props.viewMode.toParam()}-${feature.id}`;
    const pathStyle = polyColour.normal(this.getFeatureColor(feature));
    return (
      <GeoJson
          data={feature}
          key={key}
          map={this.props.map}
          onLeafletClick={this.handleClickFor(feature)}
          onLeafletMouseout={this.handleMouseoutFor(feature)}
          onLeafletMouseover={this.handleMouseover(feature)}
          {...pathStyle} />
    );
  },

  render() {
    const propsForPopup = pick(this.props,
      [ 'data', 'dataType', 'deselect', 'hover', 'viewMode']);
    return (
      <div>
        {this.props.polygonsData.map(this.renderFeature)}

        (<Flyout {...propsForPopup} population={this.state.population}/>)
        <Legend ranges={getMapRanges(this.props.dataType)}/>
      </div>
    );
  },
});

export default PolygonsMap;
