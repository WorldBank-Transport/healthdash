import React from 'react';
import { Link } from 'react-router';
import T from '../misc/t';

require('stylesheets/boilerplate/data-type');

const DataType = React.createClass({
  render() {
    return (
      <div className="data-type">
        <ul>
          <li>
            <Link activeClassName="active" to="/dash/points/facilities/">
              <T k="data-type.facilities" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/dash/regions/death/">
              <T k="data-type.death" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/dash/regions/family-planning/">
              <T k="data-type.family-planning" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/dash/regions/deliveries/">
              <T k="data-type.deliveries" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/dash/regions/health-workers/">
              <T k="data-type.health-workers" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/dash/regions/ipd/">
              <T k="data-type.ipd" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/dash/regions/opd/">
              <T k="data-type.opd" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/dash/regions/tetanous/">
              <T k="data-type.tetanous" />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/dash/regions/hiv-center/">
              <T k="data-type.hiv-center" />
            </Link>
          </li>
        </ul>
      </div>
    );
  },
});

export default DataType;
