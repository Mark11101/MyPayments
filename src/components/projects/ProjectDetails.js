import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ProjectDetails = (props) => {

  const { project, auth } = props;

  if (!auth.uid) {
    return <Redirect to='/signin' />
  }

  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <br/>
            <p>Comment:</p>
            <p>{project.comment}</p>
            <br/>
            <p>Requisites:</p>
            <p>{project.requisites}</p>
            <br/>
            <h5 className="pink-text costNumber">{project.cost} ₽</h5>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            {project.status ? <div>Payment is paid</div> : <div>Payment is't paid</div>}
            <div>{moment(project.date.toDate()).subtract(10, 'days').calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center white-text">
        <p>Loading payments...</p>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;

  return {
    project: project,
    auth: state.firebase.auth
  }

};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'projects'
  }])
)(ProjectDetails)
