import React from 'react';
import { Icon } from 'react-font-awesome';
import FooterStatic from '../boilerplate/footer-static';
import T from '../misc/t';

require('stylesheets/boilerplate/static-content');
require('stylesheets/boilerplate/button');

const Data = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
  },

  getInitialState() {
    return {
      '1': true,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
    };
  },

  componentDidMount() {
    const id = this.props.params.datasetId;
    if (id) {
      const element = document.getElementById(id);
      element.scrollIntoView(true);
    }
  },

  toogle(index, _this) {
    return () => {
      _this.replaceState({
        ..._this.state,
        [index]: !_this.state[index],
      });
    };
  },

  scrollTo(id) {
    return (e) => {
      e.preventDefault();
      const element = document.getElementById(id);
      element.scrollIntoView(true);
    };
  },

  render() {
    return (
      <div className="data-content">
        <div className="main secondary">
          <div className="static-content">
            <h2><T k="static.data-title" /></h2>
            <p><T k="static.data-content" /></p>
            <p><T k="static.data-content-second" /></p>
            <div className="button-wrapper-outer">
              <div className="button-wrapper-inner">
                <div className="button">
                  <a href="http://wsww.opendata.go.tz/organization/ministry-of-health-and-social" target="_blank">
                    <T k="static.open-data-portal" />
                  </a>
                </div>
                <div className="button">
                  <a onClick={this.scrollTo('FAQ')}>
                    <T k="static.faq" />
                  </a>
                </div>
                <div className="button">
                  <a onClick={this.scrollTo('DataSources')}>
                    <T k="static.data-souces" />
                  </a>
                </div>
              </div>
            </div>

            <p><T k="static.data-content"/></p>


            <div className="content-section" id="FAQ">
              <h3><T k="static.faq.title" /></h3>
              <div className="faq-list" role="tablist">
                {Object.keys(this.state).map(index => (
                  <div>
                    <div className="panel-heading" role="tab">
                      <h4 className="panel-title">
                        <a onClick={this.toogle(index, this)}>
                          <Icon type="chevron-down"/>
                          <T k={`static.faq.q${index}`}/>
                        </a>
                      </h4>
                    </div>
                    <div className="panel-collapse collapse in" role="tabpanel" style={{display: this.state[index] ? 'block' : 'none'}}>
                      {(index === 5) ? (<a href="#/speak-out/"><T k={`static.faq.a${index}`} /></a>) : (<T k={`static.faq.a${index}`} />)}
                    </div>
                  </div>)
                )}
              </div>
            </div>
            <div className="content-section" id="DataSources">
              <h3><T k="static.data-souces.title" /></h3>
              <h5 id="health"><T k="data-type.facilities" /></h5>
              <ul className="dataset-links">
                <li><Icon type="link"/><a href="http://www.opendata.go.tz/dataset/list-of-health-facilities-with-geographical-location" target="_blank"><T k="static.link.facilities" /></a></li>
              </ul>
              <h5 id="death"><T k="static.data-type.death" /></h5>
              <ul className="dataset-links">
                <li><Icon type="link"/><a href="http://www.opendata.go.tz/dataset/number-and-causes-of-death-occured-by-region" target="_blank"><T k="static.link.deaths" /></a></li>
              </ul>
              <h5 id="family-planing"><T k="static.data-type.family-planning" /></h5>
              <ul className="dataset-links">
                <li><Icon type="link"/><a href="http://www.opendata.go.tz/dataset/idadi-na-asilimia-ya-wateja-wa-huduma-ya-uzazi-wa-mpango-kwa-mikoa" target="_blank"><T k="static.link.family-planning" /></a></li>
              </ul>
              <h5 id="deliveries"><T k="static.data-type.deliveries" /></h5>
              <ul className="dataset-links">
                <li><Icon type="link"/><a href="http://www.opendata.go.tz/dataset/idadi-ya-wanaojifungulia-kwenye-vituo-vya-kutolea-huduma-za-afya-na-sehemu-zingine" target="_blank"><T k="static.link.deliveries" /></a></li>
              </ul>
              <h5 id="workers"><T k="static.data-type.health-workers" /></h5>
              <ul className="dataset-links">
                <li><Icon type="link"/><a href="http://www.opendata.go.tz/dataset/idadi-ya-wafanyakazi-wa-afya-kwa-mikoa" target="_blank"><T k="static.link.workers" /></a></li>
              </ul>
              <h5 id="ipd"><T k="static.data-type.ipd" /></h5>
              <ul className="dataset-links">
                <li><Icon type="link"/><a href="http://www.opendata.go.tz/dataset/idadi-ya-magonjwa-kutoka-idara-ya-wagonjwa-waliolazwa-kwa-mikoa" target="_blank"><T k="static.link.ipd" /></a></li>
              </ul>
              <h5 id="opd"><T k="static.data-type.opd" /></h5>
              <ul className="dataset-links">
                <li><Icon type="link"/><a href="http://www.opendata.go.tz/dataset/idadi-ya-magonjwa-kutoka-idara-ya-wagonjwa-wa-nje-kwa-mikoa" target="_blank"><T k="static.link.opd" /></a></li>
              </ul>
              <h5 id="tetanus"><T k="static.data-type.tetanous" /></h5>
              <ul className="dataset-links">
                <li><Icon type="link"/><a href="http://www.opendata.go.tz/dataset/number-and-percentage-of-pregnant-women-received-two-or-more-tetanus-toxoid-vaccine-tt2-by-region" target="_blank"><T k="static.link.tetanous" /></a></li>
              </ul>
              <h5 id="hiv"><T k="static.data-type.hiv-center" /></h5>
              <ul className="dataset-links">
                <li><Icon type="link"/><a href="http://www.opendata.go.tz/dataset/list-of-hiv-care-and-treatment-centre-ctc-by-district" target="_blank"><T k="static.link.hiv" /></a></li>
              </ul>
              <h5 id="population"><T k="static.data-type.population" /></h5>
              <ul className="dataset-links">
                <p className="small"><T k="static.dataset.tz-population.explain" /></p>
                <li><Icon type="link"/><a href="https://data.hdx.rwlabs.org/dataset/2012-census-tanzania-wards-shapefiles" target="_blank"><T k="static.dataset.shape-ward" /></a></li>
                <li><Icon type="link"/><a href="http://50.87.153.5/~eastc/sensa/index.php/welcome" target="_blank"><T k="static.dataset.tz-population" /></a></li>
              </ul>
            </div>
          </div>
        </div>
        <FooterStatic/>
      </div>
    );
  },
});

export default Data;
