/**
 * TODO: remove waterpoints-specific hardcoded stuff from this module
 * so that it will be easier to add points for boreholes and dams (if
 * we ever get that data)
 */

import { Map, CircleMarker } from 'leaflet';
import { PruneCluster, PruneClusterForLeaflet } from './prune-cluster';
import React, { PropTypes } from 'react';
import ClusterIcon from './cluster-icon';
import colours from '../../utils/colours';


const ClusteredPoints = React.createClass({
  propTypes: {
    map: PropTypes.instanceOf(Map),  // injected by BoundsMap
    points: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
  },
  componentWillMount() {
    this.pruneCluster = new PruneClusterForLeaflet();
    this.pruneCluster.BuildLeafletClusterIcon = cluster => {
      return new ClusterIcon({
        stats: cluster.stats,
        population: cluster.population,
        textColor: colours.textColor,
        bgColor: colours.bgColor,
      });
    };
    this.pruneCluster.BuildLeafletMarker = (marker, position) => {
      const m = new CircleMarker(position, {
        radius: 8,
        color: '#fff',
        opacity: 0.75,
        weight: 1,
        fillOpacity: 1,
        fillColor: colours.unknown,
      });
      m.setOpacity = () => null;  // PruneCluster tries to call this
      m.on('click', this.handleMarkerClickFor(marker.data.id));  // TODO: does this callback ever get cleaned up when the marker is removed?
                                                                 // ... not sure how to hook into pruneCluster's marker removal to call .off()
      return m;
    };
    const originalProcessView = this.pruneCluster.ProcessView;
    this.pruneCluster.ProcessView = () => {
      let clusterSize;
      const zoom = this.props.map.getZoom();
      if (zoom < 8) {
        clusterSize = 21;
      } else if (zoom < 11) {
        clusterSize = 8;
      } else if (zoom < 13) {
        clusterSize = 3;
      } else {
        clusterSize = 0.01;
      }
      this.pruneCluster.Cluster.Size = clusterSize;
      originalProcessView.apply(this.pruneCluster);
    };
    this.props.map.addLayer(this.pruneCluster);
    this.markerIdMap = {};
  },
  componentDidMount() {
    this.updateCluster();
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.points !== this.props.points;
  },
  componentDidUpdate() {
    this.updateCluster();
  },
  componentWillUnmount() {
    this.props.map.removeLayer(this.pruneCluster);
    delete this.markerIdMap;
  },
  updateCluster() {
    const nextMap = {};

    // Existing markers: remove or keep
    this.props.points.forEach(point => {
      const id = point.POINT_ID;
      if (typeof this.markerIdMap[id] !== 'undefined') {  // already have it
        nextMap[id] = this.markerIdMap[id];  // just copy the ref over
        delete this.markerIdMap[id];  // clear ref from old map
      } else {
        const marker = new PruneCluster.Marker(...point.position);
        marker.data.id = id;
        //marker.category = statuses.indexOf(point.STATUS);
        nextMap[id] = marker;
        this.pruneCluster.RegisterMarker(marker);
      }
    });

    // remove what's left
    const toRemove = [];
    for (const id in this.markerIdMap) {
      if (this.markerIdMap.hasOwnProperty(id)) {
        toRemove.push(this.markerIdMap[id]);
      }
    }
    this.pruneCluster.RemoveMarkers(toRemove);

    // save the new map
    this.markerIdMap = nextMap;

    this.pruneCluster.ProcessView();
  },

  handleMarkerClickFor(id) {
    return () => this.props.select(id);
  },

  render() {
    return (
      <div style={{display: 'none'}}></div>
    );
  },
});

export default ClusteredPoints;
