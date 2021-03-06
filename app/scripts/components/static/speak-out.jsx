import React from 'react';
import FooterStatic from '../boilerplate/footer-static';
import T from '../misc/t';

require('stylesheets/boilerplate/static-content');

const SpeakOut = React.createClass({
  render() {
    return (
      <div>
      <div className="main secondary">
        <div className="static-content text-center">
          <h2><T k="static.speakout-title" /></h2>
          <p className="text-center"><T k="static.speakout-content" /></p>
          <div className="feedback-form-container">
            <iframe className="feedback-form" src="https://docs.google.com/forms/d/1q0TLkm6p__7NPNScApF5pjv-3UTpxGBkLnAuYXxhz9o/viewform"></iframe>
          </div>
        </div>
      </div>
      <FooterStatic/>
      </div>
    );
  },
});

export default SpeakOut;
