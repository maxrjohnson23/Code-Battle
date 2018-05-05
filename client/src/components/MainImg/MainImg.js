import React, {Component} from "react";
import "./MainImg.css";
import image from "./MainImage/main-img.jpg";

export default class MainImg extends Component {
    render() {
        return (
            <div className="frontImage">
                {/* <img className="frontImage" src={image} /> */}
                <div className="instructionsBox-one">
                    <p>This will be a gif of game play.</p>
                </div>
                <div className="instructionsBox-two">
                    This will be instruction text that goes along side the gif.
                </div>
            </div>
        );
    };
};