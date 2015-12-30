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


const eachRecord = fn => data => data.map(fn);


export const getHealthFacilities = () =>
  staticData.getWithPostProcess('/data/ckan-health-facilities.json', eachRecord(healthFacProcess));

export const getDeathStats = (onProgress) =>
  ckan.get(API_ROOT, 'bf3f39ed-9789-4b47-862a-de31695d19ef', {}, onProgress);

export const getFamilyPlanning = (onProgress) =>
  ckan.get(API_ROOT, '68bc9db6-f5a9-497b-848b-32fe6e059b5f', {}, onProgress);

export const getDeliveries = (onProgress) =>
  ckan.get(API_ROOT, '00b5cb71-7a6a-463a-8334-bcd4de11350e', {}, onProgress);

export const getHealthWorkers = (onProgress) =>
  ckan.get(API_ROOT, 'aaa2561f-f316-4a26-9fda-6d3151517901', {}, onProgress);

export const getIPD = (onProgress) =>
  ckan.get(API_ROOT, 'a2682ef5-a169-4393-aedb-e5ef31d019fc', {}, onProgress);

export const getOPD = (onProgress) =>
  ckan.get(API_ROOT, '6fd0aa26-4f53-40d1-a6ab-58b659eaa5c5', {}, onProgress);

export const getTetanus = (onProgress) =>
  ckan.get(API_ROOT, 'bbb6017a-a15c-445c-9e75-ca1e4e5fb49c', {}, onProgress); // TODO check this TT2 in ckan

export const getHivFacilities = (onProgress) =>
  ckan.get(API_ROOT, '34433c1b-1a4c-43f3-af5e-31d87bede85a', {}, onProgress);

export const getRegions = () =>
  staticData.getPolygons('/layers/tz_regions.json', 'tz_Regions');

export const getDistricts = () =>
  staticData.getPolygons('/layers/tz_districts.json', 'tz_districts');

export const getWards = () =>
  staticData.getPolygons('/layers/tz_wards.json', 'TzWards');
