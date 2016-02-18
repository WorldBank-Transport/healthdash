import { createActions } from 'reflux';
import { getHrwDensities } from '../api';

const hrwDensitiesActions = createActions({
  load: {},
  loadCompleted: {},
  loadFailed: {},
});

// SIDE-EFFECT: xhr request is triggered on hrwDensitiesActions.load()
hrwDensitiesActions.load.listen(() => {
  getHrwDensities()
    .then(hrwDensitiesActions.loadCompleted)
    .catch(hrwDensitiesActions.loadFailed);
});

export default hrwDensitiesActions;
