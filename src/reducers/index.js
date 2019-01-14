import { combineReducers } from 'redux';
import storyReducer from './story';
import archiveReducer from './archive';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  storyState: storyReducer,
  archiveState: archiveReducer,
  form: formReducer
});

export default rootReducer;