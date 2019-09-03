const initState = {};

const projectReducer = (state = initState, action) => {

  if (action.type === 'CREATE_PROJECT_SUCCESS') {
    console.log('create project success');
    return state;
  }

  if (action.type === 'CREATE_PROJECT_ERROR') {
    console.log('create project error');
    return state;
  }

  else {
    return state;
  }
};

export default projectReducer;