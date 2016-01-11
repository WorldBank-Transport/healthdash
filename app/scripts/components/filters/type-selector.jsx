import React from 'react';
import Checkbox from '../misc/checkbox';
import { setExclude } from '../../actions/filters'

require('stylesheets/filters/type-selector');

const TypeSelector = React.createClass({

  getInitialState() {
    return {
      DISPENSARY: true,
      'HEALTH CENTRE': true,
      CLINIC: true,
      HOSPITAL: true,    
    };
  },

  select(value) {
    return () => {
      debugger;
      const newState = {
        ...this.state, 
        [value]: !this.state[value],
      };
      const excluded = Object.keys(newState).filter(key => !newState[key]);
      setExclude('FACILITY TYPE', excluded);
      this.replaceState(newState);
    };
  },

  render() {
    const listOfOptions = Object.keys(this.state).map(type => {
      return (
        <li key={`filter-${type}`}>
          <Checkbox action={this.select(type)} checked={this.state[type]} label={`chart.facilities.type.${type}`} />
        </li>);
    });
    return (
      <div className="type-selector">
        <ul className="types">
          {listOfOptions}
        </ul>
      </div>
    );
  },
});

export default TypeSelector;
