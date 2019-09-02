import React from 'react'
import moment from 'moment'

const ProjectSummary = ({project}) => {
  return (
    <div className={"card z-depth-0 project-summary " + (project.status ? 'green lighten-5' : 'red lighten-5')}>
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{project.title}</span>
        <h5 className="pink-text costNumber">{project.cost} ₽</h5>
        <p className="grey-text">{moment(project.date.toDate()).subtract(10, 'days').calendar()}</p>
      </div>
    </div>
  )
};

export default ProjectSummary


