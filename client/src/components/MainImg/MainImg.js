import React, {Component} from "react";
import "./MainImg.css";
import image from "./MainImage/main-img.jpg"

export default class MainImg extends Component {
    render() {
        return (
            <div className="frontImage">
                {/* <img className="frontImage" src={image} /> */}
                <div className="instructionsBox-one">
                    This is what to do.
                </div>
                <div className="instructionsBox-two">
                    This is what to do.
                </div>
            </div>
        );
    };
};