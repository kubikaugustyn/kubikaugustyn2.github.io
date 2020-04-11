import React from "react";
import CoinWithInvisibleBackground from "./coinWithInvisibleBackground";

class CoinWithCount extends React.Component {
    constructor(props) {
        super(props);
        this.count = props.coinCount
    }

    render() {
        return <span><CoinWithInvisibleBackground />{this.count}</span>;
    }
}

export default CoinWithCount