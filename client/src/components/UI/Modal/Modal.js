import React, {Component} from "react";

import "./Modal.css";
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {

  render() {
    return (
        <Wrapper>
          <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
          <div
              className="Modal"
              style={{
                transform: this.props.show ? "translateY(0)" : "translateY(-600vh)",
                opacity: this.props.show ? "1" : "0"
              }}>
            {this.props.children}
          </div>
        </Wrapper>
    );
  }
}

export default Modal;