import React, { PropTypes } from 'react';
import OpenClosed from  '../../constants/open-closed';
import T from '../misc/t';

require('stylesheets/filters/filters');

const Filters = React.createClass({
  propTypes: {
    clear: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass).isRequired,
    setInclude: PropTypes.func.isRequired,
    setRange: PropTypes.func.isRequired,
  },
  //componentDidUpdate(prevProps) {
    //if (!this.props.dataType.equals(prevProps.dataType)) {
    //  this.props.clear();
    //}
  //},
  render() {
    return OpenClosed.match(this.props.openClosed, {
      Open: () => (
        <div className="filters">
          <div className="filters-title">
            <h3><T k="filters.title" /></h3>
          </div>
          filters
        </div>
      ),
      Closed: () => <div style={{display: 'none'}}></div>,
    });
  },
});

export default Filters;
