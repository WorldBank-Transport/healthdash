import React from 'react';
import { connect } from 'reflux';
import YearStore from '../../stores/year';
import { selectYear } from '../../actions/filters';
import OpenClosed from '../../constants/open-closed';
import { Icon } from 'react-font-awesome';
import T from '../misc/t';

require('stylesheets/filters/year-selector');

const YearSelector = React.createClass({

  mixins: [
    connect(YearStore, 'years'),
  ],

  getInitialState() {
    return {openClosed: OpenClosed.Closed()};
  },

  select(value) {
    return (e) => {
      e.preventDefault();
      selectYear(value);
    };
  },

  toggle(e) {
    e.preventDefault();
    this.replaceState({
      ...this.state,
      openClosed: this.state.openClosed.toggle(),
    });
  },

  render() {
    if (Object.keys(this.state.years) <= 0) {
      return false;
    }
    const listOfOptions = Object.keys(this.state.years).map(year => {
      return (
        <li key={`filter-${year}`}>
          <a className={this.state.years[year] ? 'active' : ''} onClick={this.select(year)}>
            <span className="selectable"/><span>${year}</span>
          </a>
        </li>);
    });
    const direction = OpenClosed.match(this.state.openClosed, {
      Open: () => 'up',
      Closed: () => 'down',
    });
    return (
      <div className="year-selector">
        <div className="menu-item">
          <a onClick={this.toggle}>
            <T k="filter.year"/> <Icon type={`chevron-circle-${direction}`}/>
          </a>
        </div>
        {
          OpenClosed.match(this.state.openClosed, {
            Open: () => (
              <div className="floating-div">
                <ul className="years">
                  {listOfOptions}
                </ul>
              </div>),
            Closed: () => <div style={{display: 'none'}}></div>,
          })
        }
      </div>
    );
  },
});

export default YearSelector;
