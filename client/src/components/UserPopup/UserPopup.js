import React, {Component} from "react";
import Modal from "../UI/Modal/Modal";

class UserPopup extends Component {

  render() {
    return (
        <Modal show={this.props.showUserModal}
                modalClosed={this.props.hideUserModal}>
            <div className="userInfo">
                <h2>User Statistics</h2>
                <div>Username: {this.props.username}</div>
                <div>Your Current Score: {this.props.userScore}</div>
                <div>Number of Games:</div>
            </div>     
        </Modal>
    );
  }
};

export default UserPopup;