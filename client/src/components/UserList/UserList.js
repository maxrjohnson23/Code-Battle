import React from 'react';
import User from "./User/User";

const userList = (props) => (
    <div>
      <ul>
        <h2>Current Users</h2>
        {
          props.users.map(u => {
            return <User username={u}/>
          })
        }
      </ul>
    </div>
);

export default userList;
