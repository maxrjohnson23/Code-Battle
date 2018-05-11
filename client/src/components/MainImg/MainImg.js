import React, {Component} from "react";
import "./MainImg.css";
import InstructionCarousel from "./InstructionCarousel/InstructionCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import gameplay from "../../../images/gameplay.gif";

export default class MainImg extends Component {
    render() {
        return (
            <div className="frontImage">
                <div className="instructionsBox-one">
                    <div className="gameplay">
                    </div>
                    {/* <img src={"./public/gameplay.gif"} alt="" width="60vw" /> */}
                </div>
                <div className="instructionsBox-two">
                    <InstructionCarousel showLoginHandler={this.props.showLoginHandler} />
                </div>
            </div>
        );
    };
};