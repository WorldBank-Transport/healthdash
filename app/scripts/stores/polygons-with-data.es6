import isUndefined from 'lodash/lang/isUndefined';
import { Some, None, Ok } from 'results';
import { createStore } from 'reflux';
import { Result } from '../utils/functional';
import SaneStore from '../utils/sane-store-mixin';
import FilteredDataStore from './filtered-data';
import PolygonsStore from './polygons';
import ViewStore from './view';
import DataTypes from '../constants/data-types';


export const injectData = dataByLoc => polygon => {
  const dataForPoly = dataByLoc[polygon.id];
  return Ok({
    ...polygon,
    properties: {
      ...polygon.properties,
      data: isUndefined(dataForPoly) ? None() : Some(dataForPoly),
    },
  });
};

const deathGroupBy = (data) => {
  if(data.length > 0) {
    const keys = Object.keys(data[0]).filter(key => key != 'CHILD_TYPE' && key != 'DISEASE' && key != 'YEAR' && key != '_id');
    return Some(Result.sumByAll(data, keys));
  } else {
    return None();
  }
}

export const groupByLoc = data => ({ dataType }) => {
  return DataTypes.match(dataType, {
    Death: () => deathGroupBy(data),
    FamilyPlanning: () => None(),
    Deliveries: () => None(),
    HealthWorkers: () => None(),
    IPD: () => None(),
    OPD: () => None(),
    Tetanous: () => None(),
    HivCenter: () => Result.groupBy(data, 'REGION'),
    Facilities: () => Result.groupBy(data, 'REGION'),
  });
};

export const injectDataIntoFeatures = features => dataByLoc =>
  Result.map(injectData(dataByLoc), features)
    .ok();  // convert Result<Ok,Err> to Maybe<Some,None>


const PolygonsDataStore = createStore({
  initialData: [],
  mixins: [SaneStore],
  init() {
    this.listenTo(FilteredDataStore, 'recompute');
    this.listenTo(PolygonsStore, 'recompute');
    // don't need to listen to ViewStore: PolygonsStore will update when view changes
  },
  recompute() {
    const data = FilteredDataStore.get();
    const features = PolygonsStore.get();
    const { dataType } = ViewStore.get();

    const dataFeatures = Some({ dataType })
      .andThen(groupByLoc(data))
      .andThen(injectDataIntoFeatures(features))
      .unwrapOr(this.initialData);

    this.setData(dataFeatures);
  },
});

export default PolygonsDataStore;
