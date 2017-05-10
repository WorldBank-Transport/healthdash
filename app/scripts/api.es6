/* eslint camelcase: 0 */  // snake_case query params are not set by us

import ckan from './utils/api/ckan';
import * as staticData from './utils/api/static-data';
import securityApi from './utils/api/security-api';

const API_ROOT = '//opendata.go.tz/api';
const SECURITY_API_ROOT = '//opendata.go.tz/';
const GOOGLE_API = 'https://www.googleapis.com/';
const URL_SHORTENER = 'urlshortener/v1/url';

const HEALTH_FACILITIES_DATA_URL = 'http://opendata.go.tz/api/action/datastore_search?resource_id=f9192849-9b32-4827-90fa-522ec1e84c1e&limit=2147483647'
const DEATH_STATS_RESOURCE_ID = '61f0768b-59e1-4f24-81dc-0a4f02b15c75'
const FAMILY_PLANNING_RESOURCE_ID = '4e75aa54-a8d4-431c-8eb2-e21e472aa02d'
const DELIVERIES_RESOURCE_ID = '448deff0-11cf-445c-97ce-39ad81876fe2'
const HEALTH_WORKERS_RESOURCE_ID = 'e73c7f34-ca45-4702-adf2-7a30b02d8e76'
const IPD_RESOURCE_ID = '9b3f43f2-57f8-48c6-9584-e81c86633266'
const OPD_RESOURCE_ID = '4db8e931-a140-4619-8fb5-52d434d2b84d'
const TETANUS_RESOURCE_ID = 'd4c39974-cc81-4a84-aa71-1c2dd325dbe1'
const HIV_FACILITIES_RESOURCE_ID = '67ce1d38-c23a-4eb5-b580-2be4c28e25c5'
const HRW_DENSITIES_RESOURCE_ID = '494e2c86-c98a-4a0a-a5e9-1d593bb592d0'

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
 * hack to fix an issue since the property PROJECTED FAMILY PLANNING CLIENTS (WOMEN AGE 15-49) could not be retrieve
 * @param {object} record The family database record
 * @returns {object} The record with a `PROJECTED_FAMILY_PLANNING` prop
 */
function familyProcess(record) {
  const pulled = {...record};
  pulled.PROJECTED_FAMILY_PLANNING = record[Object.keys(record)[2]];
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


export const getHealthFacilities = () =>
  staticData.getWithPostProcess(HEALTH_FACILITIES_DATA_URL, eachRecord(healthFacProcess));

export const getDeathStats = (onProgress) =>
  ckan.get(API_ROOT, DEATH_STATS_RESOURCE_ID, {}, onProgress);

export const getFamilyPlanning = (onProgress) =>
  ckan.get(API_ROOT, FAMILY_PLANNING_RESOURCE_ID, {}, onProgress, eachRecord(familyProcess));

export const getDeliveries = (onProgress) =>
  ckan.get(API_ROOT, DELIVERIES_RESOURCE_ID, {}, onProgress);

export const getHealthWorkers = (onProgress) =>
  ckan.get(API_ROOT, HEALTH_WORKERS_RESOURCE_ID, {}, onProgress);

export const getIPD = (onProgress) =>
  ckan.get(API_ROOT, IPD_RESOURCE_ID, {}, onProgress);

export const getOPD = (onProgress) =>
  ckan.get(API_ROOT, OPD_RESOURCE_ID, {}, onProgress);

export const getTetanus = (onProgress) =>
  ckan.get(API_ROOT, TETANUS_RESOURCE_ID, {}, onProgress); // TODO check this TT2 in ckan

export const getHivFacilities = (onProgress) =>
  ckan.get(API_ROOT, HIV_FACILITIES_RESOURCE_ID, {}, onProgress);

export const getHrwDensities = (onProgress) =>
  ckan.get(API_ROOT, HRW_DENSITIES_RESOURCE_ID, {}, onProgress);

export const getRegions = () =>
  staticData.getPolygons('/layers/tz_regions.json', 'tz_Regions');

export const getDistricts = () =>
  staticData.getPolygons('/layers/tz_districts.json', 'tz_districts');

export const getWards = () =>
  staticData.getPolygons('/layers/tz_wards.json', 'TzWards');

export const getPopulationStatic = () =>
  staticData.getWithPostProcess('/data/ckan-population.json', eachRecord(toUppercase));

export const postShare = (shareData) =>
  securityApi.post(SECURITY_API_ROOT, 'share', shareData);

export const getShare = (shareId) =>
  securityApi.get(SECURITY_API_ROOT, 'share', {id: shareId});

export const urlShortener = (url) =>
  securityApi.post(GOOGLE_API, URL_SHORTENER, {longUrl: url});

export const postMap2Pdf = (body) =>
  securityApi.postAndGetFile(SECURITY_API_ROOT, 'pdf', body);
