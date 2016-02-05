import React from 'react';
import { connect } from 'reflux';
import YearStore from '../../stores/year';
import LayoutStore from '../../stores/layout';
import { selectYear } from '../../actions/filters';
import { toggleYear } from '../../actions/layout';
import OpenClosed from '../../constants/open-closed';
import { Icon } from 'react-font-awesome';
import T from '../misc/t';

require('stylesheets/filters/year-selector');

const YearSelector = React.createClass({

  mixins: [
    connect(LayoutStore, 'layout'),
    connect(YearStore, 'years'),
  ],

  select(value) {
    return (e) => {
      e.preventDefault();
      selectYear(value);
      toggleYear();
    };
  },

  render() {
    const [disabled, action] = (Object.keys(this.state.years) <= 0) ? ['disabled', () => null] : ['', toggleYear];
    const listOfOptions = Object.keys(this.state.years).map(year => {
      return (
        <li key={`filter-${year}`}>
          <a className={this.state.years[year] ? 'active' : ''} onClick={this.select(year)}>
            <span className="selectable"/><span>{year}</span>
          </a>
        </li>);
    });
    const direction = OpenClosed.match(this.state.layout.year, {
      Open: () => 'up',
      Closed: () => 'down',
    });
    return (
      <div className="year-selector">
        <div className={`menu-item ${disabled}`}>
          <a onClick={action}>
            <T k="filter.year"/> <Icon type={`sort-${direction}`}/>
          </a>
        </div>
        {
          OpenClosed.match(this.state.layout.year, {
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
