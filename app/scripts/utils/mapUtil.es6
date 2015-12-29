import DataTypes from '../constants/data-types';
import { Some, None } from 'results';
import colours from './colours';

export const MAX_VALUE = 99999;

export const getMapRanges = (dataType) =>
  DataTypes.match(dataType, {
    Death: () => Some([{min: 0, max: 500, color: colours.few}, {min: 501, max: 1000, color: colours.middleFew}, {min: 1001, max: 1500, color: colours.middleMany}, {min: 1501, max: MAX_VALUE, color: colours.many}]),
    FamilyPlanning: () => None(),
    Deliveries: () => Some([{min: 0, max: 50000, color: colours.few}, {min: 50001, max: 75000, color: colours.middleFew}, {min: 75001, max: 100000, color: colours.middleMany}, {min: 100001, max: MAX_VALUE, color: colours.many}]),
    HealthWorkers: () => None(),
    IPD: () => None(),
    OPD: () => None(),
    Tetanous: () => None(),
    HivCenter: () => Some([{min: 0, max: 50, color: colours.few}, {min: 51, max: 100, color: colours.middleFew}, {min: 101, max: 150, color: colours.middleMany}, {min: 151, max: MAX_VALUE, color: colours.many}]),
    Facilities: () => Some([{min: 0, max: 100, color: colours.few}, {min: 101, max: 200, color: colours.middleFew}, {min: 201, max: 300, color: colours.middleMany}, {min: 301, max: MAX_VALUE, color: colours.many}]),
  });

export const getMapValue = (item, dataType) =>
  DataTypes.match(dataType, {
    Death: () => item.value,
    FamilyPlanning: () => -1,
    Deliveries: () => item[0].TOTAL,
    HealthWorkers: () => -1,
    IPD: () => -1,
    OPD: () => -1,
    Tetanous: () => -1,
    HivCenter: () => item.length,
    Facilities: () => item.length,
  });
