import React from 'react'
import moment from 'moment'

const Notifications = (props) => {

  const { notifications, auth } = props;

  return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Notifications</span>
            <ul className="online-users">
              {notifications && notifications.map(item => {

                const authorOfNotificationID = item.userId;
                const userID = auth.uid;

                if (authorOfNotificationID === userID) {
                  return (
                      <li key={item.id}>
                        <span>You</span>
                        <span className="pink-text">{item.content}</span>
                        <div className="note-date grey-text">{moment(item.time.toDate()).fromNow()}</div>
                      </li>
                  )
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
        </div>
      </div>
  )
};

export default Notifications
