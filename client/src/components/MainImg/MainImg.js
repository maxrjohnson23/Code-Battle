import React, {Component} from "react";
import "./MainImg.css";
import InstructionCarousel from "./InstructionCarousel/InstructionCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class MainImg extends Component {
    render() {
        return (
            <div className="frontImage">
                <div className="instructionsBox-one">
                    <p>This will be a gif of game play.</p>
                </div>
                <div className="instructionsBox-two">
                    <InstructionCarousel showLoginHandler={this.props.showLoginHandler} />
                </div>
            </div>
        );
    };
};