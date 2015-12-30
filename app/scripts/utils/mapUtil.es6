import DataTypes from '../constants/data-types';
import { Some, None } from 'results';
import colours from './colours';
import { Result } from './functional';

export const MAX_VALUE = 99999999;

export const getMapRanges = (dataType) =>
  DataTypes.match(dataType, {
    Death: () => Some([{min: 0, max: 500, color: colours.few}, {min: 501, max: 1000, color: colours.middleFew}, {min: 1001, max: 1500, color: colours.middleMany}, {min: 1501, max: MAX_VALUE, color: colours.many}]),
    FamilyPlanning: () => Some([{min: 0, max: 100000, color: colours.few}, {min: 100001, max: 200000, color: colours.middleFew}, {min: 200001, max: 300000, color: colours.middleMany}, {min: 300001, max: MAX_VALUE, color: colours.many}]),
    Deliveries: () => Some([{min: 0, max: 50000, color: colours.few}, {min: 50001, max: 75000, color: colours.middleFew}, {min: 75001, max: 100000, color: colours.middleMany}, {min: 100001, max: MAX_VALUE, color: colours.many}]),
    HealthWorkers: () => Some([{min: 0, max: 2500, color: colours.few}, {min: 2501, max: 5000, color: colours.middleFew}, {min: 5001, max: 7500, color: colours.middleMany}, {min: 7501, max: MAX_VALUE, color: colours.many}]),
    IPD: () => None(),
    OPD: () => None(),
    Tetanous: () => None(),
    HivCenter: () => Some([{min: 0, max: 50, color: colours.few}, {min: 51, max: 100, color: colours.middleFew}, {min: 101, max: 150, color: colours.middleMany}, {min: 151, max: MAX_VALUE, color: colours.many}]),
    Facilities: () => Some([{min: 0, max: 100, color: colours.few}, {min: 101, max: 200, color: colours.middleFew}, {min: 201, max: 300, color: colours.middleMany}, {min: 301, max: MAX_VALUE, color: colours.many}]),
  });

export const getMapValue = (item, dataType) =>
  DataTypes.match(dataType, {
    Death: () => item.value,
    FamilyPlanning: () => item[0]['TOTAL FAMILY PLANNING CLIENTS'],
    Deliveries: () => item[0].TOTAL,
    HealthWorkers: () => item.value,
    IPD: () => -1,
    OPD: () => -1,
    Tetanous: () => -1,
    HivCenter: () => item.length,
    Facilities: () => item.length,
  });

const deathGroupBy = (data) => {
  if (data.length > 0) {
    const keys = Object.keys(data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASE' && key !== 'YEAR' && key !== '_id');
    return Some(Result.sumByAll(data, keys));
  } else {
    return None();
  }
};

const workersGroupBy = (data) => {
  if (data.length > 0) {
    const keys = Object.keys(data[0]).filter(key => key !== 'HEALTH WORKERS' && key !== 'YEAR' && key !== '_id');
    return Some(Result.sumByAll(data, keys));
  } else {
    return None();
  }
};

export const groupByLoc = data => ({ dataType }) => {
  return DataTypes.match(dataType, {
    Death: () => deathGroupBy(data),
    FamilyPlanning: () => Result.sumByGroupBy(data, 'REGION', ['TOTAL FAMILY PLANNING CLIENTS', 'NEW CLIENTS', 'FAMILY PLANNING CONTINUIOUS', 'PROJECTED FAMILY PLANNING CLIENTS (WOMEN AGE 15-49)']),
    Deliveries: () => Result.sumByGroupBy(data, 'REGION', ['TOTAL', 'HEALTH FACILITY DELIVERIES', 'TRADITIONAL BIRTH ATTENDANTS (TBA)', 'ANTENATAL CARE PROJECTION', 'BORN BEFORE ARRIVAL (BBA)', 'HOME DELIVERY']),
    HealthWorkers: () => workersGroupBy(data),
    IPD: () => None(),
    OPD: () => None(),
    Tetanous: () => None(),
    HivCenter: () => Result.groupBy(data, 'REGION'),
    Facilities: () => Result.groupBy(data, 'REGION'),
  });
};
