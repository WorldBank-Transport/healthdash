import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import T from '../misc/t';
import OpenClosed from '../../constants/open-closed';
import DataTypes from '../../constants/data-types';
import { Icon } from 'react-font-awesome';
import { _ } from 'results';

require('stylesheets/boilerplate/data-type');

const DataType = React.createClass({

  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
  },

  getInitialState() {
    return {openClosed: OpenClosed.Closed()};
  },

  toggle() {
    this.replaceState({
      openClosed: this.state.openClosed.toggle(),
    });
  },

  renderOthers() {
    return OpenClosed.match(this.state.openClosed, {
      Open: () => (
          <div className="float-options">
            <ul>
              <li>
                <Link activeClassName="active" onClick={this.toggle} to="/dash/regions/death/">
                  <span className="selectable"/><T k="data-type.death" />
                </Link>
              </li>
              <li>
                <Link activeClassName="active" onClick={this.toggle} to="/dash/regions/family-planning/">
                  <span className="selectable"/><T k="data-type.family-planning" />
                </Link>
              </li>
              <li>
                <Link activeClassName="active" onClick={this.toggle} to="/dash/regions/deliveries/">
                  <span className="selectable"/><T k="data-type.deliveries" />
                </Link>
              </li>
              <li>
                <Link activeClassName="active" onClick={this.toggle} to="/dash/regions/health-workers/">
                  <span className="selectable"/><T k="data-type.health-workers" />
                </Link>
              </li>
              <li>
                <Link activeClassName="active" onClick={this.toggle} to="/dash/regions/ipd/">
                  <span className="selectable"/><T k="data-type.ipd" />
                </Link>
              </li>
              <li>
                <Link activeClassName="active" onClick={this.toggle} to="/dash/regions/opd/">
                  <span className="selectable"/><T k="data-type.opd" />
                </Link>
              </li>
              <li>
                <Link activeClassName="active" onClick={this.toggle} to="/dash/regions/tetanous/">
                  <span className="selectable"/><T k="data-type.tetanous" />
                </Link>
              </li>
              <li>
                <Link activeClassName="active" onClick={this.toggle} to="/dash/regions/hiv-center/">
                  <span className="selectable"/><T k="data-type.hiv-center" />
                </Link>
              </li>
            </ul>
          </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },

  render() {
    const direction = OpenClosed.match(this.state.openClosed, {
      Open: () => 'up',
      Closed: () => 'down',
    });
    const activeClass = DataTypes.match(this.props.dataType, {
      Facilities: () => '',
      [_]: () => 'active',
    });
    return (
      <div className="data-type">
        <ul>
          <li>
            <Link activeClassName="active" to="/dash/points/facilities/">
              <T k="data-type.facilities" />
            </Link>
          </li>
          <li>
            <a className={activeClass} onClick={this.toggle}>
              <T k="data-type.others"/> <Icon type={`sort-${direction}`}/>
            </a>
            {this.renderOthers()}
          </li>
        </ul>
      </div>
    );
  },
});

export default DataType;
