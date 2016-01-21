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

  healthCentre: '#a2dc04',
  clinic: '#ffcd05',
  hospital: '#cc2213',
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
  let c = undefined;
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
  case 'DISPENSARY':
    c = colours.theme;
    break;
  case 'PRIVATE':
    c = colours.healthCentre;
    break;
  case 'FAITH BASED ORGANIZATION':
    c = colours.clinic;
    break;
  case 'PARASTATAL':
    c = colours.hospital;
    break;
  case 'PUBLIC':
    c = colours.theme;
    break;
  case 'ABOVE 5 YEARS':
    c = colours.theme;
    break;
  case 'UNDER 5 YEARS':
    c = colours.healthCentre;
    break;
  case 'HEALTH FACILITY DELIVERIES':
    c = colours.healthCentre;
    break;
  case 'TRADITIONAL BIRTH ATTENDANTS (TBA)':
    c = colours.clinic;
    break;
  case 'BORN BEFORE ARRIVAL (BBA)':
    c = colours.hospital;
    break;
  case 'HOME DELIVERY':
    c = colours.theme;
    break;
  case 'NEW CLIENTS':
    c = colours.clinic;
    break;
  case 'FAMILY PLANNING CONTINUIOUS':
    c = colours.theme;
    break;
  case 'PROJECTED_FAMILY_PLANNING':
    c = colours.theme;
    break;
  case 'TOTAL FAMILY PLANNING CLIENTS':
    c = colours.clinic;
    break;
  case 'PROJECTED CLIENTS':
    c = colours.theme;
    break;
  case 'TOTAL ATTENDANCE':
    c = colours.clinic;
    break;
  }
  return c;
};
