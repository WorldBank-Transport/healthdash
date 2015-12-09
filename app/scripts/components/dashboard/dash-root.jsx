import React, { PropTypes } from 'react';
import { connect } from 'reflux';
// store
import DataStore from '../../stores/data';
import LayoutStore from '../../stores/layout';
import ViewStore from '../../stores/view';

// Actions
import { load } from '../../actions/data';
import { clear, setRange, setInclude } from '../../actions/filters';

// map and overlays:
import BoundsMap from '../leaflet/bounds-map';
import { TileLayer } from 'react-leaflet';
import Filters from '../filters/filters';
import Charts from '../charts/charts';
import SpinnerModal from '../misc/spinner-modal';

require('stylesheets/dashboard/dash-layout');

const DashRoot = React.createClass({

  mixins: [
    connect(DataStore, 'data'),
    connect(LayoutStore, 'layout'),
    connect(ViewStore, 'view'),
  ],

  // Reset bounds and load any required data
  componentDidMount() {
    load('facilities');
  },

  renderLoadingOverlay() {
    return (<div>loading</div>);
  },


 render() {
  const propsForChildren = {
    data: this.state.data.facilities, // TODO remove facilities
  };
  const mapChild = React.cloneElement(this.props.children, {
    ...propsForChildren,
  });
  
  return (
    <div className="main dash-layout">
      <div className="map-container">
        <BoundsMap
            bounds={this.state.view.mapBounds}
            className="leaflet-map">
          <TileLayer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {mapChild}
        </BoundsMap>
        <Filters
            clear={clear}
            openClosed={this.state.layout.filters}
            setInclude={setInclude}
            setRange={setRange}
            {...propsForChildren} />
        {this.renderLoadingOverlay()}
        </div>
        <Charts {...propsForChildren} />
    </div>);
 },
});

export default DashRoot;
