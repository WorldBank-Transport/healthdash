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
            <Link activeClassName="active" to="">
              <T k="dash.national"/>
            </Link>
          </li>
          <li>
            <Link to="">
            <T k="dash.regional"/>
            </Link>
          </li>
          <li>
            <Link to="/dash/points/facilities/">
              <T k="dash.healthfacilities"/>
            </Link>
          </li>
          <li>
            <Link to="">
              <T k="dash.otherselections" />
            </Link>
          </li>
          <li>
            <Link to="">
              <T k="dash.share" />
            </Link>
          </li>
        </ul>
      </div>
    );
  },
});

export default DataType;
