import React from 'react';
import T from '../misc/t';
import OpenDataNav from './open-data-nav';

require('stylesheets/boilerplate/footer');


const FooterStatic = React.createClass({
  render() {
    return (
      <div className="footer footer-static">
        <div className="footer-nav">
          <OpenDataNav />
        </div>
        <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">
          <p className="copy"><T k="footer.copy" /></p>
        </a>
      </div>
    );
  },
});

export default FooterStatic;
