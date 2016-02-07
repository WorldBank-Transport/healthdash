import React from 'react';
import { connect } from 'reflux';
import Checkbox from '../misc/checkbox';
import { toggleType } from '../../actions/type';
import TypeStore from '../../stores/type';

require('stylesheets/filters/type-selector');

const TypeSelector = React.createClass({

  mixins: [
    connect(TypeStore, 'types'),
  ],

  select(value) {
    return () => {
      toggleType(value);
    };
  },

  render() {
    const listOfOptions = Object.keys(this.state.types).map(type => {
      return (
        <li key={`filter-${type}`}>
          <Checkbox action={this.select(type)} checked={this.state.types[type]} label={`chart.facilities.type.${type}`} />
        </li>);
    });
    return (
      <div className="type-selector bordered">
        <ul className="types">
          {listOfOptions}
        </ul>
      </div>
    );
  },
});

export default TypeSelector;
