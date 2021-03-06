import { Union } from 'results';
//import ViewModes from './view-modes';

const DataTypes = Union({
  Death: {},
  FamilyPlanning: {},
  Deliveries: {},
  HealthWorkers: {},
  IPD: {},
  OPD: {},
  Tetanus: {},
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

  getIdColumn() {
    return DataTypes.match(this, {
      Death: () => '_id',
      FamilyPlanning: () => '_id',
      Deliveries: () => '_id',
      HealthWorkers: () => '_id',
      IPD: () => '_id',
      OPD: () => '_id',
      Tetanus: () => '_id',
      HivCenter: () => '_id',
      Facilities: () => 'FACILITY_ID_NUMBER',
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
      Tetanus: () => 'tetanous',
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
      return DataTypes.Tetanus();
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
