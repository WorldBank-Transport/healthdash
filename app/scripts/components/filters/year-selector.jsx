import React from 'react';
import { connect } from 'reflux';
import Checkbox from '../misc/checkbox';
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
    debugger;
    if (Object.keys(this.state.years) <= 0) {
      return false;
    }
    const listOfOptions = Object.keys(this.state.years).map(year => {
      return (<li key={`filter-${year}`}><Checkbox action={this.select(year)} checked={this.state.years[year]} label={`filter.year.${year}`} /></li>);
    });
    const direction = OpenClosed.match(this.state.openClosed, {
      Open: () => 'up',
      Closed: () => 'down',
    });
    return (
      <div className="year-selector">
        <div>
          <a onClick={this.toggle}>
            <T k="filter.year"/> <Icon type={`chevron-circle-${direction}`}/>
          </a>
        </div>
        {
          OpenClosed.match(this.state.openClosed, {
            Open: () => (
              <ul className="years">
                {listOfOptions}
              </ul>),
            Closed: () => <div style={{display: 'none'}}></div>,
          })
        }
      </div>
    );
  },
});

export default YearSelector;
