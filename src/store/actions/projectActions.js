export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('projects').add({

      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()

    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
};

export const deletePayment = (project) => {
  return (dispatch, getState, {getFirestore}) => {

    const firestore = getFirestore();

    firestore.collection("projects").doc(project.id).delete().then(function() {
      console.log('delete project success');
    }).catch(() => {
      console.log('delete project error');
    });
  }
};