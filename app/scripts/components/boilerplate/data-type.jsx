import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import T from '../misc/t';
import OpenClosed from '../../constants/open-closed';
import DataTypes from '../../constants/data-types';
import { Icon } from 'react-font-awesome';
import { _ } from 'results';
import ViewModes from '../../constants/view-modes';

require('stylesheets/boilerplate/data-type');

const DataType = React.createClass({

  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  getInitialState() {
    return {
      openCloseOthers: OpenClosed.Closed(),
      openCloseViewMode: OpenClosed.Closed(),
    };
  },

  toggle() {
    this.replaceState({
      openCloseOthers: this.state.openCloseOthers.toggle(),
      openCloseViewMode: this.state.openCloseViewMode,
    });
  },

  toggleViewMode() {
    this.replaceState({
      openCloseViewMode: this.state.openCloseViewMode.toggle(),
      openCloseOthers: this.state.openCloseOthers,
    });
  },

  renderOthers() {
    return OpenClosed.match(this.state.openCloseOthers, {
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

  renderViewMode(viewModes) {
    return OpenClosed.match(this.state.openCloseViewMode, {
      Open: () => (
        <div className="float-options">
          <ul>
            {viewModes.map(viewMode =>
              <li>
                <Link activeClassName="active" onClick={this.toggleViewMode} to={`/dash/${viewMode}/facilities/`}>
                  <span className="selectable"/><T k={`dash.${viewMode}`} />
                </Link>
              </li>)}
          </ul>
        </div>),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },

  render() {
    const direction = OpenClosed.match(this.state.openCloseOthers, {
      Open: () => 'up',
      Closed: () => 'down',
    });
    const ViewModedirection = OpenClosed.match(this.state.openCloseViewMode, {
      Open: () => 'up',
      Closed: () => 'down',
    });
    const activeClass = DataTypes.match(this.props.dataType, {
      Facilities: () => '',
      [_]: () => 'active',
    });
    const linkActiveClass = ViewModes.match(this.props.viewMode, {
      Points: () => '',
      [_]: () => 'active',
    });

    return (
      <div className="data-type">
        <ul>
          <li>
            <a className={linkActiveClass} onClick={this.toggleViewMode}>
              <T k="data-type.facilities"/> <Icon type={`sort-${ViewModedirection}`}/>
            </a>
            {this.renderViewMode(['points', 'regions', 'districts'])}
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
