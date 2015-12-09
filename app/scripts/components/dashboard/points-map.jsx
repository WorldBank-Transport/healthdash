import pick from 'lodash/object/pick';
//import { Maybe } from 'results';
import React, { PropTypes } from 'react';
import { Map } from 'leaflet';

import ClusteredWaterpoints from '../leaflet/clustered-points';


const PointsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point popup
    data: PropTypes.array,  // injected
    deselect: PropTypes.func,  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    select: PropTypes.func,  // injected
  },
  render() {
    const propsForPopup = pick(this.props,
      [ 'data', 'dataType', 'deselect', 'selected', 'viewMode' ]);
    const popup = this.props.children ?
      React.cloneElement(this.props.children, propsForPopup) : null;

    return (
      <div>
        <ClusteredWaterpoints
            map={this.props.map}
            points={this.props.data}
            select={this.props.select} />

        {/* A point popup, if a point is selected */}
        {popup}

      </div>
    );
  },
});

export default PointsMap;