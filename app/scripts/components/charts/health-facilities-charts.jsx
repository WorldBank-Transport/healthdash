import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from '../../constants/open-closed';
import HealthFacilitiesChart from './health-facilities-barchar';
import PopulationFacilitiesChart from './population-facilities-barchart';
import { Result } from '../../utils/functional';
import HealthPieChart from './health-pie-chart';
import TSetChildProps from '../misc/t-set-child-props';

const HealthFacilitiesCharts = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    metrics: PropTypes.object,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),  // injected
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  render() {
    const types = Result.countBy(this.props.data, 'FACILITY TYPE');
    const owner = Result.countBy(this.props.data, 'OWNERSHIP');
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="row">
            <div className="mainChart">
              <HealthFacilitiesChart {...this.props}/>
            </div>
          </div>
          <div className="row">
            <div className="mainChart">
              <TSetChildProps>
                <PopulationFacilitiesChart {...this.props} seriesName={{k: 'chart.population-facilities.series'}}/>
              </TSetChildProps>
            </div>
          </div>
          <div className="col-all">
            <div className="row-chart-left right-border">
              <TSetChildProps>
                <HealthPieChart data={types} divId="type-piechart" key="type-piechart" title={{k: 'chart.facilities-type-piechart.title'}}/>
              </TSetChildProps>
            </div>
            <div className="row-chart-left right-border">
              <TSetChildProps>
                <HealthPieChart data={owner} divId="owner-piechart" key="owner-piechart" title={{k: 'chart.facilities-ownership-piechart.title'}}/>
              </TSetChildProps>
            </div>
          </div>
        </div>
      </div>);
  },
});

export default HealthFacilitiesCharts;
