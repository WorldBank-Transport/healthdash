import React from 'react';
import { Icon } from 'react-font-awesome';
import FooterStatic from '../boilerplate/footer-static';
import T from '../misc/t';

require('stylesheets/boilerplate/static-content');
require('stylesheets/boilerplate/button');

const Data = React.createClass({

  getInitialState() {
    return {
      '1': true,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
    };
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
              <a href="http://wsww.opendata.go.tz/organization/ministry-of-health-and-social">
                <T k="static.open-data-portal" />
              </a>
            </div>
            <div className="button">
              <a onClick={this.scrollTo('DataSources')}>
                <T k="static.data-souces" />
              </a>
            </div>
            <div className="button">
              <a onClick={this.scrollTo('FAQ')}>
                <T k="static.faq" />
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
              <ul className="dataset-links">
                <li><Icon type="link"/><T k="static.dataset.links" /><a href="http://www.opendata.go.tz/organization/ministry-of-health-and-social">http://www.opendata.go.tz/organization/ministry-of-health-and-social</a></li>
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
