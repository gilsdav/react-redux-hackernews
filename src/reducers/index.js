import { combineReducers } from 'redux';
import storyReducer from './story';
import archiveReducer from './archive';
import { reducer as formReducer } from 'redux-form';
import workReducer from './map';

const rootReducer = combineReducers({
  storyState: storyReducer,
  archiveState: archiveReducer,
  form: formReducer,
  workState: workReducer
});

export default rootReducer;