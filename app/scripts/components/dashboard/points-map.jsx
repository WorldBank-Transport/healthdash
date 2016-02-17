import React, { PropTypes } from 'react';
import pick from 'lodash/object/pick';
import { Maybe } from 'results';
import { Map } from 'leaflet';
import SimplePoints from '../leaflet/simple-points';
import Flyout from './flyout';
import PointLegend from './point-legend';

const PointsMap = React.createClass({
  propTypes: {
    children: PropTypes.node,  // for selected point popup
    data: PropTypes.array,  // injected
    deselect: PropTypes.func,  // injected
    ensureSelect: PropTypes.func,  // injected
    hover: PropTypes.instanceOf(Maybe.OptionClass),  // injected
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    select: PropTypes.func,  // injected
    selected: PropTypes.instanceOf(Maybe.OptionClass),  // injected
  },

  render() {
    const propsForPopup = pick(this.props, [ 'data', 'dataType', 'hover', 'viewMode', 'selected' ]);
    return (
      <div>
        <SimplePoints {...this.props}/>

        <Flyout {...propsForPopup}/>
        <PointLegend />
      </div>
    );
  },
});

export default PointsMap;
