import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { deletePayment } from '../../store/actions/projectActions'

class ProjectSummary extends React.Component {

  handleDelete = (e, project) => {
    e.preventDefault();
    this.props.deletePayment(project);
  };

  render() {

      const project = this.props.project;

      return (
          <div className={"card z-depth-0 project-summary " + (project.status ? 'green lighten-5' : 'red lighten-5')}>
              <div className="card-content grey-text text-darken-3">
                  <span className="card-title">{project.title}</span>
                  <span className="pink-text costNumber">{project.cost} ₽</span>
                  <i className="material-icons delete" onClick={(e) => this.handleDelete(e, project)}>delete_forever</i>
                  <p className="grey-text">{moment(project.date.toDate()).subtract(10, 'days').calendar()}</p>
              </div>
          </div>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePayment: (project) => dispatch(deletePayment(project))
    }
};

export default connect(null, mapDispatchToProps)(ProjectSummary);


