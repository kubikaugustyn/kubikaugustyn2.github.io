import React from "react";
import {imgUrl, imgWidth} from "../count";

class Box extends React.Component {
    constructor(props) {
        super(props);
        this.boxTypeImgSrc = "";
        this.boxTypeImgAlt = "";
        this.boxCount = props.boxCount;
        switch (props.boxType) {
            case 0:
                this.boxTypeImgSrc = imgUrl + "Box.png";
                this.boxTypeImgAlt = "Box";
                break;
            case 1:
                this.boxTypeImgSrc = imgUrl + "bigBox.png";
                this.boxTypeImgAlt = "Big Box";
                break;
            case 2:
                this.boxTypeImgSrc = imgUrl + "megaBox.png";
                this.boxTypeImgAlt = "Mega Box";
                break;
            case 3:
                this.boxTypeImgSrc = imgUrl + "magicBox.png";
                this.boxTypeImgAlt = "Magic Box";
                break;
            default :
                this.boxTypeImgSrc = -imgUrl + "err.svg";
                this.boxTypeImgAlt = "Error";
        }
    }

    render() {
        return <span><img alt={this.boxTypeImgAlt} src={this.boxTypeImgSrc} width={imgWidth} />{this.boxCount}</span>;
    }
}

export default Box