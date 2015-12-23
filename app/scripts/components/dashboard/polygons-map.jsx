import pick from 'lodash/object/pick';
import { Maybe } from 'results';
import React, { PropTypes } from 'react';
import { Map } from 'leaflet';

import colours, { polygon as polyColour } from '../../utils/colours';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import { getMapRanges } from '../../utils/mapUtil';

import { GeoJson } from 'react-leaflet';
import Legend from './legend';

const PolygonsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    deselect: PropTypes.func,  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    mapDrillDown: PropTypes.func,  // injected
    polygonsData: PropTypes.array,  // injected
    select: PropTypes.func,  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  handleClickFor(feature) {
    return () => this.props.mapDrillDown(feature.id);
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

  getFeatureColor(feature) {
    // compute average per polygon
    const ranges = getMapRanges(this.props.dataType);
    return feature.properties.data
      .andThen(d => ranges.filter(r => d.length > r.min && d.length < r.max)[0].color)
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

  renderPopup() {
    const propsForPopup = pick(this.props,
      [ 'data', 'dataType', 'deselect', 'selected', 'viewMode']);
    return (<div {...propsForPopup}/>); // TODO this should be the popup
  },

  render() {
    return (
      <div>
        {this.props.polygonsData.map(this.renderFeature)}

        {/* popup overlay for polygon */}
        {/*this.renderPopup()*/}
        <Legend ranges={getMapRanges(this.props.dataType)}/>
      </div>
    );
  },
});

export default PolygonsMap;