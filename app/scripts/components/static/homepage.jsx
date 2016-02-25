import React from 'react';
import Button from '../boilerplate/button';
import T from '../misc/t';
import Footer from '../boilerplate/footer';
import TChildProps from '../misc/t-set-child-props';

require('stylesheets/boilerplate/static-content');

const Homepage = React.createClass({
  render() {
    return (
      <div className="home-page">
        <div className="homebanner">
          <TChildProps>
            <img alt={{k: 'site-name'}} src="images/homeimg.png" title={{k: 'site-name'}}/>
          </TChildProps>
        </div>
        <div className="homecontent">
          <h2><T k="home.title" /></h2>
          <Button linkTo="/dash/points/facilities/">
            <T k="home.health" />
          </Button>
          <p>
            <T k="home.text" />
          </p>
        </div>
        <Footer/>
      </div>
    );
  },
});

export default Homepage;
