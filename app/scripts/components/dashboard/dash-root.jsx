import React, { PropTypes } from 'react';
import { connect } from 'reflux';
// store
import DataStore from '../../stores/data';

// Actions
import { load } from '../../actions/data';

require('stylesheets/dashboard/dash-layout');

const DashRoot = React.createClass({

  mixins: [
    connect(DataStore, 'data'),
  ],

  // Reset bounds and load any required data
  componentDidMount() {
    debugger;
    load('facilities');
  },

  renderChildren() {
    return (<div>
      {this.state.data.facilities.map(item => {return <li>{JSON.stringify(item)}</li>})}
      </div>);
  },


 render() {
  return (<div><h2>dashboard root</h2>{this.renderChildren()}</div>);
 },
});

export default DashRoot;
