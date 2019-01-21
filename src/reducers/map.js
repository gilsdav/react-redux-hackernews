import {
    WORK_ADD
  } from '../constants/actionTypes';
  
  const INITIAL_STATE = {
    works: ['test', 'test2'],
    error: null,
  };
  
  const applyAddWorks = (state, action) => ({
    works: action.works,
    error: null,
  });
  
  function workReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case WORK_ADD : {
        return applyAddWorks(state, action);
      }
      default : return state;
    }
  }
  
  export default workReducer;
