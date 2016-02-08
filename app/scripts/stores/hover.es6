/**
 * This store handles a lot of state- and action-related stuff.
 *
 * There might be a better place for some of this, but it works here.
 */

import isUndefined from 'lodash/lang/isUndefined';
import find from 'lodash/collection/find';

import { createStore } from 'reflux';
import { Maybe, Some, None, _ } from 'results';
import SaneStore from '../utils/sane-store-mixin';

import AsyncState from '../constants/async';
import ViewModes from '../constants/view-modes';

import { select, deselect } from '../actions/select';

import DataStore from './data';
import LoadingDataStore from './loading-data';
import LoadingPolygonsStore from './loading-polygons';
import PolygonsDataStore from './polygons-with-data';
import ViewStore from './view';

/**
 * The data stored is **just** Maybe(selected ID).
 * Everything else is recomputed in the `.get` method
 */
const HoverStore = createStore({
  initialData: None(),
  mixins: [SaneStore],

  init() {
    // select and clear selection
    this.listenTo(deselect, 'deselect');
    this.listenTo(select, 'selectById');

    // update when any dependencies change
    // this._emit comes from SaneStoreMixin
    this.listenTo(DataStore, this.emit, this);
    this.listenTo(LoadingDataStore, this.emit, this);
    this.listenTo(LoadingPolygonsStore, this.emit, this);
    this.listenTo(PolygonsDataStore, this.emit, this);
    this.listenTo(ViewStore, this.emit, this);
  },

  deselect() {
    this.setData(None());
  },

  selectById(id) {
    const shouldUpdate = Maybe.match(this.data, {
      None: () => true,  // always update if store id was None
      Some: currentId => {
        if (id !== currentId) {  // update if selecting a new id
          return true;
        } else {
          return false;  // pass, do nothing if the id has not changed.
        }
      },
    });
    if (shouldUpdate) {
      this.setData(Some(id));
    }
  },

  /**
   * Whenever this store triggers, its data is processed through this method
   * before being given to listeners, so we do all the heavy work here.
   * See sane-store mixin for details.
   * @returns {Maybe} Some(details) if anything is selected, or None
   */
  get() {
    // emit None() if no ID is selected, otherwise compute
    return this.data.andThen(this.getSelected);
  },

  getSelected(id) {
    const loadState = this.getLoadState();
    return AsyncState.match(loadState, {
      Finished: () => ({
        id,
        loadState,
        details: this.getDetail(id),
      }),
      [_]: () => ({
        id,
        loadState,
        details: None(),
      }),
    });
  },

  getLoadState() {
    const pointsState = LoadingDataStore.get();
    const polysState = LoadingPolygonsStore.get();
    const { viewMode } = ViewStore.get();
    return ViewModes.match(viewMode, {
      Points: () => pointsState,
      [_]: () => pointsState.and(polysState),  // only Finished when both Finished
    });
  },

  /**
   * just defers to getPointDetail or getPolyDetail
   * @param {string} id The selected thing's id
   * @returns {object} The detail
   */
  getDetail(id) {
    const { viewMode } = ViewStore.get();
    return ViewModes.match(viewMode, {
      Points: () => this.getPointDetail(id),
      [_]: () => this.getPolyDetail(id),
    });
  },

  getPointDetail(id) {
    const { dataType } = ViewStore.get();
    const pointsData = DataStore.get()[dataType.toParam()];
    const idField = dataType.getIdColumn();
    const q = {[idField]: id};
    const detail = find(pointsData, q);
    if (!isUndefined(detail)) {
      return Some(detail);
    } else {
      return None();
    }
  },

  getPolyDetail(id) {
    const featuresWithData = PolygonsDataStore.get();
    const detail = find(featuresWithData, {id: id});
    if (!isUndefined(detail)) {
      return Some(detail);
    } else {
      return None();
    }
  },

});

export default HoverStore;
