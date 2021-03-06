import React, { PropTypes } from 'react';
import T from '../misc/t';
import { MAX_VALUE } from '../../utils/mapUtil';
import { Maybe, _ } from 'results';
import DataTypes from '../../constants/data-types';
import {FormattedNumber, IntlMixin} from 'react-intl';

require('../../../stylesheets/dashboard/legend.scss');

const Legend = React.createClass({
  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    ranges: PropTypes.array,
  },

  mixins: [IntlMixin],

  renderRanges(ranges) {
    return (
      <div className="legend">
        <div className="title"><T k="legend.title" /></div>
        <div className="subtitle"><T k={`legend.subtitle.${this.props.dataType.toParam()}`} /></div>
          <div className="row">
            <div className="legend-block" style={{'background': '#aaa'}}></div>
              <T k="legend.nodata" />
          </div>
          {
            ranges.map(r => (
              <div className="row">
                <div className="legend-block" style={{'background': r.color}}></div>
                <span className="t">{r.max === MAX_VALUE ?
                 (<span> &gt; <FormattedNumber value={r.min}/></span>) :
                 (<span><FormattedNumber value={r.min}/> - <FormattedNumber value={r.max}/></span>)}
                </span>
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
              <div className="legend-block" style={{'background': '#aaa'}}></div>
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
    return Maybe.match(this.props.ranges, {
      Some: () => this.renderRanges(this.props.ranges.data),
      [_]: () => this.renderDefault(),
    });
  },
});

export default Legend;
