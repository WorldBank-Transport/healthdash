import React from 'react';
import { connect } from 'reflux';
import Checkbox from '../misc/checkbox';
import YearStore from '../../stores/year';
import { selectYear } from '../../actions/filters';

require('stylesheets/filters/year-selector');

const YearSelector = React.createClass({

  mixins: [
    connect(YearStore, 'years'),
  ],

  select(value) {
    return (e) => {
      e.preventDefault();
      selectYear(value);
    };
  },

  render() {
    if (Object.keys(this.state.years) <= 0) {
      return false;
    }
    const listOfOptions = Object.keys(this.state.years).map(year => {
      return (<li key={`filter-${year}`}><Checkbox action={this.select(year)} checked={this.state.years[year]} label={`filter.year.${year}`} /></li>);
    });
    return (
      <div className="year-selector">
        <ul className="years">
          {listOfOptions}
        </ul>
      </div>
    );
  },
});

export default YearSelector;
