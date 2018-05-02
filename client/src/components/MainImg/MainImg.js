import React, {Component} from "react";
import "./MainImg.css";
import image from "./MainImage/main-img.jpg"

export default class MainImg extends Component {
    render() {
        return (
            <div>
                <img className="frontImage" src={image} />
            </div>

        );
    };
};