import pick from 'lodash/object/pick';
import { Maybe } from 'results';
import React, { PropTypes } from 'react';
import { Map } from 'leaflet';
import { CircleMarker } from 'react-leaflet';
import colours from '../../utils/colours';
import SimplePoints from '../leaflet/simple-points';
import Flyout from './flyout';

const PointsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point popup
    data: PropTypes.array,  // injected
    deselect: PropTypes.func,  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    select: PropTypes.func,  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
  },

  handleMarkerClickFor(id) {
    return () => this.props.select(id);
  },

  handleMouseoutFor() {
    this.props.deselect();
  },

  handleMouseover(id) {
    return () => this.props.select(id);
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
        onLeafletMouseover={this.handleMouseover(item.POINT_ID)}
        opacity={0.75}
        radius={4}
        weight={1} />);
  },

  renderFlyout() {
    return Maybe.match(this.props.selected, {
      None: () => false,
      Some: data => (<div className="flyout-inner">{JSON.stringify(data)}</div>),
    });
  },

  render() {
    const propsForPopup = pick(this.props, [ 'data', 'dataType', 'deselect', 'selected', 'viewMode' ]);
    return (
      <div>
        <SimplePoints {...this.props}/>

        {/* A point popup, if a point is selected */}
        <Flyout {...propsForPopup}/>
      </div>
    );
  },
});

export default PointsMap;
