import isUndefined from 'lodash/lang/isUndefined';

/**
 * Duplicates the good, medium, poor colour variables from scss styles, since
 * sometimes we need them in javascript.
 */
const colours = {
  bgColor: '#ffffff',
  textColor: '#555555',
  theme: '#05a2dc',

  // Scale colours
  many: '#3f7086',
  middleMany: '#3690c0',
  middleFew: '#1da3da',
  few: '#b5d3df',

  // Ranking colours
  good: '#82c675',
  medium: '#fbc030',
  poor: '#f05e55',

  unknown: '#7d7d7d',

  healthCentre: 'yellow',
  clinic: 'orange',
  hospital: 'red',
};
export default colours;

export const point = {
  normal: colour => {
    const style = {
      radius: 4,
      color: colours.bgColor,
      opacity: 0.75,
      weight: 1,
      fillOpacity: 1,
      fillColor: colour,
    };
    return style;
  },

  hovered: {
    // color: colours.bgColor, color is kept from normal
    fillOpacity: 0.9,
    // fillColor is kept from normal
    opacity: 1,
    weight: 3,
  },
};


export const polygon = {  // sync with edudash: https://github.com/WorldBank-Transport/edudash/blob/edudash-2.0/app/scripts/services/colors.coffee
  normal: colour => {
    const style = {
      fillColor: colour,
      fillOpacity: 0.75,
      opacity: 0.6,
      weight: 2,
    };
    if (!isUndefined(colour)) {
      style.color = colour;
    }
    return style;
  },
  hovered: {
    color: colours.bgColor,
    fillOpacity: 0.9,
    // fillColor is kept from normal
    opacity: 1,
    weight: 4,
  },
  selected: {
    // TODO
  },
};


export const Color = {};

Color.getFacilityColor = (type) => {
  let c = colours.theme;
  switch (type) {
  case 'HEALTH CENTRE':
    c = colours.healthCentre;
    break;
  case 'CLINIC':
    c = colours.clinic;
    break;
  case 'HOSPITAL':
    c = colours.hospital;
    break;
  }
  return c;
};
