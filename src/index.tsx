import { Button } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import ImageDogeUrl from "./assets/doge.jpg"; // includes domain and port
import "./index.css";

import(/* webpackPreload: true */ "lodash");

const App = () => {
    const [input, setInput] = React.useState("");

    const onClick = async () => {
        const { default: _ } = await import(
          /* webpackChunkName: "lodash" */ "lodash"
        );

        const msg = _.join(["this", "actually", "worked"], " ");
        console.log(msg);
    };

    return (
        <div className="root">
            <div className="header">Hello Webpack</div>

            <img style={{ height: "400px", width: "400px" }} src={ImageDogeUrl} />
            <input value={input} onChange={(event) => setInput(event.target.value)} />

            <Button variant="outlined" color="primary" onClick={() => onClick()}>Clicky</Button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
