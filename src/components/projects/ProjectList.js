import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const ProjectList = ({projects, auth}) => {
  return (

    <div className="project-list section">

      { projects && projects.map(project => {

        const authorOfProjectID = project.authorId;
        const userID = auth.uid;

        if (authorOfProjectID === userID) {
          return (
              <Link to={'/project/' + project.id} key={project.id}>
                <ProjectSummary project={project}/>
              </Link>
          )
        }

        else {
          return null;
        }

      })}

    </div>
  )
};

export default ProjectList
