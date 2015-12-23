import React, { PropTypes } from 'react';
import T from '../misc/t';
import { MAX_VALUE } from '../../utils/mapUtil';

require('../../../stylesheets/dashboard/legend.scss');

const Legend = React.createClass({
  propTypes: {
    ranges: PropTypes.array,
  },

  renderRanges() {
    return (
      <div className="legend">
        <div className="title"><T k="legend.title" /></div>
          <div className="row">
            <div className="legend-block" style={{'background': '#aaa'}}></div>
              <T k="legend.nodata" />
          </div>
          {
            this.props.ranges.map(r => (
              <div className="row">
                <div className="legend-block" style={{'background': r.color}}></div>
                <span className="t">{r.max === MAX_VALUE ? ` > ${r.min}`: `${r.min} - ${r.max}`}</span>
              </div>)
            )
          }
      </div>
    );
  },

  renderDefault() {
    return (
        <div className="legend">
          <div className="title"><T k="legend.title" /></div>
            <div className="row">
              <div className="legend-block" style={{'background': '#f1eef6'}}></div>
                <T k="legend.nodata" />
            </div>
            <div className="row">
              <div className="legend-block" style={{'background': '#bdc9e1'}}></div>
              <T k="legend.lessthan50" />
            </div>
            <div className="row">
              <div className="legend-block" style={{'background': '#74a9cf'}}></div>
              <T k="legend.greaterhan50" />
            </div>
            <div className="row">
              <div className="legend-block" style={{'background': '#0570b0'}}></div>
              <T k="legend.greaterhan75" />
            </div>
          </div>
    );
  },

  render() {
    if(this.props.ranges && this.props.ranges.length > 0) {
      return this.renderRanges();
    } else {
      return this.renderDefault();
    }
  }
});

export default Legend;
