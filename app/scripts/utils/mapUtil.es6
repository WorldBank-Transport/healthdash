import DataTypes from '../constants/data-types';
import { Some, None } from 'results';
import colours from './colours';
import { Result } from './functional';

export const MAX_VALUE = 999999999;

export const getMapRanges = (dataType) =>
  DataTypes.match(dataType, {
    Death: () => Some([{min: 0, max: 500, color: colours.few}, {min: 501, max: 1000, color: colours.middleFew}, {min: 1001, max: 1500, color: colours.middleMany}, {min: 1501, max: MAX_VALUE, color: colours.many}]),
    FamilyPlanning: () => Some([{min: 0, max: 100000, color: colours.few}, {min: 100001, max: 200000, color: colours.middleFew}, {min: 200001, max: 300000, color: colours.middleMany}, {min: 300001, max: MAX_VALUE, color: colours.many}]),
    Deliveries: () => Some([{min: 0, max: 50000, color: colours.few}, {min: 50001, max: 75000, color: colours.middleFew}, {min: 75001, max: 100000, color: colours.middleMany}, {min: 100001, max: MAX_VALUE, color: colours.many}]),
    HealthWorkers: () => Some([{min: 0, max: 2500, color: colours.few}, {min: 2501, max: 5000, color: colours.middleFew}, {min: 5001, max: 7500, color: colours.middleMany}, {min: 7501, max: MAX_VALUE, color: colours.many}]),
    IPD: () => Some([{min: 0, max: 50000, color: colours.few}, {min: 50001, max: 75000, color: colours.middleFew}, {min: 75001, max: 100000, color: colours.middleMany}, {min: 100001, max: MAX_VALUE, color: colours.many}]),
    OPD: () => Some([{min: 0, max: 500000, color: colours.few}, {min: 500001, max: 750000, color: colours.middleFew}, {min: 750001, max: 1000000, color: colours.middleMany}, {min: 1000001, max: MAX_VALUE, color: colours.many}]),
    Tetanus: () => Some([{min: 0, max: 70, color: colours.few}, {min: 70.01, max: 80, color: colours.middleFew}, {min: 80.01, max: 90, color: colours.middleMany}, {min: 90.01, max: 100, color: colours.many}]),
    HivCenter: () => Some([{min: 0, max: 50, color: colours.few}, {min: 51, max: 100, color: colours.middleFew}, {min: 101, max: 150, color: colours.middleMany}, {min: 151, max: MAX_VALUE, color: colours.many}]),
    Facilities: () => Some([{min: 0, max: 100, color: colours.few}, {min: 101, max: 200, color: colours.middleFew}, {min: 201, max: 300, color: colours.middleMany}, {min: 301, max: MAX_VALUE, color: colours.many}]),
  });

export const getMapValue = (item, dataType) =>
  DataTypes.match(dataType, {
    Death: () => item.value,
    FamilyPlanning: () => item[0]['TOTAL FAMILY PLANNING CLIENTS'],
    Deliveries: () => item[0].TOTAL,
    HealthWorkers: () => item.value,
    IPD: () => item.value,
    OPD: () => item.value,
    Tetanus: () => item[3]['% TT2 VACCINATION COVERAGE'],
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

const ipdGroupBy = (data) => {
  if (data.length > 0) {
    const keys = Object.keys(data[0]).filter(key => key !== 'CHILD_TYPE' && key !== 'DISEASES' && key !== 'YEAR' && key !== '_id');
    return Some(Result.sumByAll(data, keys));
  } else {
    return None();
  }
};

export const groupByLoc = data => ({ dataType, viewMode }) => {
  return DataTypes.match(dataType, {
    Death: () => deathGroupBy(data),
    FamilyPlanning: () => Result.sumByGroupBy(data, 'REGION', ['TOTAL FAMILY PLANNING CLIENTS', 'NEW CLIENTS', 'FAMILY PLANNING CONTINUIOUS', 'PROJECTED_FAMILY_PLANNING']),
    Deliveries: () => Result.sumByGroupBy(data, 'REGION', ['TOTAL', 'HEALTH FACILITY DELIVERIES', 'TRADITIONAL BIRTH ATTENDANTS (TBA)', 'ANTENATAL CARE PROJECTION', 'BORN BEFORE ARRIVAL (BBA)', 'HOME DELIVERY']),
    HealthWorkers: () => workersGroupBy(data),
    IPD: () => ipdGroupBy(data),
    OPD: () => ipdGroupBy(data),
    Tetanus: () => Result.sumByGroupBy(data, 'REGIONS', ['PROJECTED CLIENTS', 'TOTAL ATTENDANCE', 'TT2 VACCINATION COVERAGE', '% TT2 VACCINATION COVERAGE']),
    HivCenter: () => Result.groupBy(data, viewMode.getColumn()),
    Facilities: () => Result.groupBy(data, viewMode.getColumn()),
  });
};
