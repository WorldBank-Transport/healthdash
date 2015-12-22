import { Union, Some, None, _ } from 'results';
import ViewModes from './view-modes';

const DataTypes = Union({
  Death: {},
  FamilyPlanning: {},
  Deliveries: {},
  HealthWorkers: {},
  IPD: {},
  OPD: {},
  Tetanous: {},
  HivCenter: {},
  Facilities: {},
}, {
  // DataTypes instance methods
  equals(other) {
    if (!(other instanceof DataTypes.OptionClass)) {
      return false;
    } else {
      return other.name === this.name;
    }
  },
  /**
   * Map column names for region, district, ward to each datatset
   * @param {Union<ViewModes>} viewMode the viewMode to lookup
   * @returns {Maybe} Either Some(columnName) or None if the dataset does not have it
   */
  getLocationProp(viewMode) {
    return DataTypes.match(this, {
      Waterpoints: () => ViewModes.match(viewMode, {
        Points: () => Some('position'),  // pulled into this prop by pullLatLng in api module
        Regions: () => Some('REGION'),
        Districts: () => Some('DISTRICT'),
        Wards: () => Some('WARD'),
      }),
      Boreholes: () => ViewModes.match(viewMode, {
        Regions: () => Some('REGION'),
        Districts: () => Some('DISTRICT'),
        [_]: () => None(),
      }),
      Dams: () => ViewModes.match(viewMode, {
        Points: () => Some('position'),  // from pullLatLng in api module
        Regions: () => Some('REGION'),
        Districts: () => Some('DISTRICT'),
        [_]: () => None(),
      }),
    });
  },
  getIdColumn() {
    return DataTypes.match(this, {
      Waterpoints: () => 'WATER_POINT_CODE',
      Boreholes: () => '_id',  // TODO: _id is generated from ckan. need a stable, unique id for all boreholes.
      Dams: () => 'POINT_ID',
    });
  },
  toParam() {
    return DataTypes.match(this, {
      Death: () => 'death',
      FamilyPlanning: () => 'family-planning',
      Deliveries: () => 'deliveries',
      HealthWorkers: () => 'health-workers',
      IPD: () => 'ipd',
      OPD: () => 'opd',
      Tetanous: () => 'tetanous',
      HivCenter: () => 'hiv-center',
      Facilities: () => 'facilities',
    });
  },
}, {
  // DataTypes static methods
  fromParam(param) { 
    if (param === 'death') {
      return DataTypes.Death();
    } else if (param === 'family-planning') {
      return DataTypes.FamilyPlanning();
    } else if (param === 'deliveries') {
      return DataTypes.Deliveries();
    } else if (param === 'health-workers') {
      return DataTypes.HealthWorkers();
    } else if (param === 'ipd') {
      return DataTypes.IPD();
    } else if (param === 'opd') {
      return DataTypes.OPD();
    } else if (param === 'tetanous') {
      return DataTypes.Tetanous();
    } else if (param === 'hiv-center') {
      return DataTypes.HivCenter();
    } else if (param === 'facilities') {
      return DataTypes.Facilities();
    } else {
      throw new Error(`Could not get DataTypes type for param '${param}'`);
    }
  },
});

export default DataTypes;
