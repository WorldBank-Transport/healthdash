import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import { _ } from 'results';  // catch-all for match
// store
import FilteredDataStore from '../../stores/filtered-data';
import LayoutStore from '../../stores/layout';
import LoadingDataStore from '../../stores/loading-data';
import MetricsStore from '../../stores/metrics';
//import LoadingPolygonsStore from '../../stores/loading-polygons';
import PolygonsDataStore from '../../stores/polygons-with-data';
import ViewStore from '../../stores/view';

// Actions
import { load } from '../../actions/data';
import { clear, setRange, setInclude } from '../../actions/filters';
import { select, deselect } from '../../actions/select';
import { loadPolygons, clearPolygons } from '../../actions/polygons';

// map and overlays:
import BoundsMap from '../leaflet/bounds-map';
import { TileLayer } from 'react-leaflet';
import Filters from '../filters/filters';
import Charts from '../charts/charts';
import SpinnerModal from '../misc/spinner-modal';

//import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';

// components
import TSetChildProps from '../misc/t-set-child-props';
import DataType from '../boilerplate/data-type';

require('stylesheets/dashboard/dash-layout');

const DashRoot = React.createClass({

  propTypes: {
    children: PropTypes.node.isRequired,
  },

  mixins: [
    connect(FilteredDataStore, 'data'),
    connect(LayoutStore, 'layout'),
    connect(LoadingDataStore, 'loadingData'),
    connect(MetricsStore, 'metrics'),
    connect(PolygonsDataStore, 'polygonsData'),
    connect(ViewStore, 'view'),
  ],

  // Reset bounds and load any required data
  componentDidMount() {
    load(this.state.view.dataType);
    this.loadPolygons();
  },

  // Reload data if necessary
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.view.dataType.equals(prevState.view.dataType)) {
      load(this.state.view.dataType);
    }
    if (!this.state.view.viewMode.equals(prevState.view.viewMode)) {
      this.loadPolygons();
    }
  },

  loadPolygons() {
    ViewModes.match(this.state.view.viewMode, {
      Points: () => clearPolygons(),
      [_]: () => loadPolygons(this.state.view.viewMode),
    });
  },

  renderLoadingOverlay() {
    // TODO add loading for poly
    return (
      <TSetChildProps>
        <SpinnerModal
            message={{k: `loading.data.${this.state.view.dataType.toParam()}`}}
            retry={() => null}
            state={this.state.loadingData} />
      </TSetChildProps>
    );
  },

  render() {
    const propsForChildren = {
      data: this.state.data,
      dataType: this.state.view.dataType,
      viewMode: this.state.view.viewMode,
      metrics: this.state.metrics,
    };
    const mapChild = React.cloneElement(this.props.children, {
      ...propsForChildren,
      polygonsData: this.state.polygonsData,
      select,
      deselect,
    });

    return (
      <div className="main dash-layout">
        <div className="dash-top">
          <div className="map-nav">
            <DataType {...propsForChildren} />
          </div>
        </div>
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
