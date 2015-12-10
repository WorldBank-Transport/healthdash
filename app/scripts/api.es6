/* eslint camelcase: 0 */  // snake_case query params are not set by us

import ckan from './utils/api/ckan';
import * as staticData from './utils/api/static-data';

const API_ROOT = '//data.takwimu.org/api';


/**
 * @param {object} record The waterpoint database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function pullLatLng(record) {
  /*
  The following slow implementation burns >400ms CPU time for me

    const pulled = omit(record, 'LATITUDE', 'LONGITUDE');
    pulled.position = [record.LATITUDE, record.LONGITUDE];
    return pulled;

  So here's a faster version (48ms):
  */
  const pulled = {};
  for (const k in record) {
    if (record.hasOwnProperty(k) && k !== 'LATITUDE' && k !== 'LONGITUDE') {
      pulled[k] = record[k];
    }
  }
  pulled.position = [record.LATITUDE, record.LONGITUDE];
  return pulled;
}
/**
 * add a POINT_ID and parse the geolocation for a health Facilities
 * @param {object} record The facility database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function healthFacProcess(record) {
  const pulled = pullLatLng(record);
  pulled.POINT_ID = pulled.FACILITY_ID_NUMBER;
  return pulled;
}
/**
 * add a POINT_ID and parse the geolocation for a dams
 * @param {object} record The dam database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function damProcess(record) {
  const pulled = pullLatLng(record);
  pulled.POINT_ID = pulled.DAM_NAME;
  return pulled;
}

/**
 * @param {object} record The population database record
 * @returns {object} The record with a `position` prop with lat/lng array
 */
function toUppercase(record) {
  const pulled = {};
  for (const k in record) {
    if (record.hasOwnProperty(k)) {
      pulled[k] = (typeof record[k] === 'string') ? record[k].toUpperCase() : record[k];
    }
  }
  return pulled;
}


const eachRecord = fn => data => data.map(fn);


const healthFacilitiesQ = {
  fields: [
    'FACILITY_ID_NUMBER',
    'FACILITY_NAME',
    'LATITUDE',
    'LONGITUDE',
    'ZONE',
    'REGION',
    'COUNCIL',
    'COMMON FACILITY HEALTH NAME',
    'FACILITY TYPE',
    'OWNERSHIP',
    'OPERATING_STATUS',
  ],
  distinct: true,
};

export const getHealthFacilities = (onProgress) =>
  ckan.get(API_ROOT, 'b3ef3486-34fd-4389-bc61-af4520df1858', healthFacilitiesQ,
    onProgress, eachRecord(healthFacProcess));


const boreholesQ = {
  fields: [
    'REGION',
    'DISTRICT',
    'LOCATION',
    'BOREHOLE_NO',
    'DIAMETER',
    'DEPTH_METER',
    'STATIC_WATER_LEVEL',
    'DYNAMIC_WATER_LEVEL_METER',
    'DRAW _DOWN_METER',
    'YIELD_METER_CUBED_PER_HOUR',
    'ELECTRICAL_CONDUCTIVITY',
    'CONSULTANT',
    'YEAR_FROM',
    'YEAR_TO',
  ],
};

export const getBoreholes = (onProgress) =>
  ckan.get(API_ROOT, 'c9843a61-eca6-47bb-971d-70bf9c0fe942', boreholesQ, onProgress);

const damsQ = {
  fields: [
    'REGION',
    'DISTRICT',
    'DAM_NAME',
    'BASIN',
    'DAM_HEIGHT',
    'ELEVATION_',
    'RESERVOIR_',
    'LONGITUDE',
    'LATITUDE',
  ],
};

export const getDams = (onProgress) =>
  ckan.get(API_ROOT, '5da4eb70-47a0-4694-b735-397bb3732b99', damsQ, onProgress, eachRecord(damProcess));

const populationQ = {
  fields: [
    'REGION',
    'DISTRICT',
    'WARD',
    'VILLAGE',
    'TOTAL',
  ],
};

export const getPopulation = (onProgress) =>
  ckan.get(API_ROOT, 'ab84afa2-0afa-411e-9630-aeddc7bccb03', populationQ, onProgress, eachRecord(toUppercase));

export const getRegions = () =>
  staticData.getPolygons('/layers/tz_regions.json', 'tz_Regions');

export const getDistricts = () =>
  staticData.getPolygons('/layers/tz_districts.json', 'tz_districts');

export const getWards = () =>
  staticData.getPolygons('/layers/tz_wards.json', 'TzWards');
