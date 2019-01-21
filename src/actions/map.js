import {
    WORK_ADD
  } from '../constants/actionTypes';
  
  const doAddWorks = works => ({
    type: WORK_ADD,
    works,
  });
  

  export {
    doAddWorks,
  };