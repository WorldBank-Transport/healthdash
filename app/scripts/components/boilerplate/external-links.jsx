import React from 'react';
import T from '../misc/t';

require('stylesheets/boilerplate/static-content');

const DataSources = React.createClass({
  render() {
    return (
      <div className="data-sources">
        <ul>
        <li>
          <a href="http://www.moh.go.tz"><img src="images/ministry-of-health.png"/>
          Ministry of Health and Social Welfare
          </a>
        </li>
          <li>
            <a href="http://opendata.go.tz/organization/ministry-of-health-and-social"><img src="images/tz-odp.png"/>
            <T k="data.external.govopendataportal" />
              Government Open Data Portal
              Tovuti Kuu ya Takwimu Huria ya Serikali
            </a>
          </li>
        </ul>
      </div>
    );
  },
});
export default DataSources;
