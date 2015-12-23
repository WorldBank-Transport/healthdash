import { createAction } from 'reflux';

export const select = createAction();
export const ensureSelect = createAction();  // alternate to avoid pushing extra history state
export const deselect = createAction();
