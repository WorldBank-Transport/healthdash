import React, { PropTypes } from 'react';
import { connect } from 'reflux';
// store
import FilteredDataStore from '../../stores/filtered-data';
import LayoutStore from '../../stores/layout';
import LoadingDataStore from '../../stores/loading-data';
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

import DataTypes from '../../constants/data-types';

// components
import TSetChildProps from '../misc/t-set-child-props';

require('stylesheets/dashboard/dash-layout');

const DashRoot = React.createClass({

  propTypes: {
    children: PropTypes.node.isRequired,
  },

  mixins: [
    connect(FilteredDataStore, 'data'),
    connect(LayoutStore, 'layout'),
    connect(LoadingDataStore, 'loadingData'),
    connect(ViewStore, 'view'),
  ],

  // Reset bounds and load any required data
  componentDidMount() {
    load(DataTypes.Facilities());
  },

  renderLoadingOverlay() {
    // TODO add loading for poly
    return (
      <TSetChildProps>
        <SpinnerModal
            message={'loading.data.health'}
            retry={() => null}
            state={this.state.loadingData} />
      </TSetChildProps>
    );
  },

  render() {
    const propsForChildren = {
      data: this.state.data,
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
