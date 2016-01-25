import React from 'react';
import { Icon } from 'react-font-awesome';
import T from '../misc/t';


require('stylesheets/boilerplate/charts-link');

const ChartsLink = React.createClass({
  render() {
    return (
      <div className="charts-link"><Icon type={`area-chart`}/><T k="charts.toggle.closed" /></div>
    );
  },
});
export default ChartsLink;
