import React, { PropTypes } from 'react';
import T from '../misc/t';
import { Link } from 'react-router';

const ChartDataLink = React.createClass({
  propTypes: {
    dataId: PropTypes.string,
  },
  render() {
    return (
      <span>
        <T k="chart.click" /> <Link activeClassName="active" to="/data/DataSources"><T k="chart.click.here" /></Link> <T k="chart.data-helptext" />
      </span>
    );
  },
});
export default ChartDataLink;
