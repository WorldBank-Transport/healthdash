import DataTypes from '../constants/data-types';
import { Some, None } from 'results';
import colours from './colours';

export const MAX_VALUE = 99999;

export const getMapRanges = (dataType) => 
  DataTypes.match(dataType, {
    Death: () => None(),
    FamilyPlanning: () => None(),
    Deliveries: () => None(),
    HealthWorkers: () => None(),
    IPD: () => None(),
    OPD: () => None(),
    Tetanous: () => None(),
    HivCenter: () => [{min: 0, max: 50, color: colours.few}, {min: 51, max: 100, color: colours.middleFew}, {min: 101, max: 150, color: colours.middleMany}, {min: 151, max: MAX_VALUE, color: colours.many}],
    Facilities: () => Some(),
  });