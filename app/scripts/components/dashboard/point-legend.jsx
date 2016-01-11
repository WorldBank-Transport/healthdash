import React, { PropTypes } from 'react';
import T from '../misc/t';
import { MAX_VALUE } from '../../utils/mapUtil';
import { Maybe, _ } from 'results';
import colours from '../../utils/colours';

require('../../../stylesheets/dashboard/legend.scss');

const PointLegend = React.createClass({

  render() {
    return (
        <div className="legend">
          <div className="title"><T k="legend.title" /></div>
            <div className="row">
              <div className="legend-point" style={{'background': colours.theme}}></div>
                <T k="legend.dispensary" />
            </div>
            <div className="row">
              <div className="legend-point" style={{'background': colours.hospital}}></div>
              <T k="legend.hospital" />
            </div>
            <div className="row">
              <div className="legend-point" style={{'background': colours.health_centre}}></div>
              <T k="legend.health-center" />
            </div>
            <div className="row">
              <div className="legend-point" style={{'background': colours.clinic}}></div>
              <T k="legend.clinic" />
            </div>
          </div>
    );
  },
});

export default PointLegend;
