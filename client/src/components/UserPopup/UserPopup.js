import React, {Component} from "react";
import Modal from "../UI/Modal/Modal";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faStar from "@fortawesome/fontawesome-free-solid/faStar";
import faGamepad from "@fortawesome/fontawesome-free-solid/faGamepad";

class UserPopup extends Component {

  render() {
    return (
        <Modal show={this.props.showUserModal}
                modalClosed={this.props.hideUserModal}>
            <div className="userInfo">
                <h2>User Statistics</h2>
                <div>Username: {this.props.username}</div>
                <div>Your Current Score: <FontAwesomeIcon icon={faStar}
                                       color="yellow"/> {this.props.userScore}</div>
                <div>Number of Games: <FontAwesomeIcon icon={faGamepad}
                                       color="white"/> {this.props.userGames}</div>
            </div>     
        </Modal>
    );
  }
};

export default UserPopup;