import React, { PropTypes } from 'react';
import { Icon } from 'react-font-awesome';

require('stylesheets/dashboard/rating.scss');

const MAX_RATING = 5;
const RATING = [1, 2, 3, 4, 5];

const Rating = React.createClass({
  propTypes: {
    facility: PropTypes.object.isRequired,
  },

  render() {
    const fakeRating = Math.round(Math.random() * MAX_RATING + 1);
    const rating = this.props.facility.RATING || fakeRating;

    return (
      <div className="rating">
        {RATING.map( i => {
          const color = i <= rating ? '#ffcd05' : '#d1d1d1';
          return (<Icon style={{color: color}} type="star"/>);
        })}
      </div>
    );
  },
});

export default Rating;
