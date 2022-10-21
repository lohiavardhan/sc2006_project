import React, { Component } from "react";
import "../../static/css/TypedReact.css";

class TypedReact extends Component {
    componentDidMount() {
        // If you want to pass more options as props, simply add
        // your desired props to this destructuring assignment.
        const { strings } = this.props;
        // You can pass other options here, such as typing speed, back speed, etc.
        const options = {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
        };
        // this.el refers to the <span> in the render() method
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount() {
        // Make sure to destroy Typed instance on unmounting
        // to prevent memory leaks
        this.typed.destroy();
    }

    render() {
        return (
            <>
                <>
                    <span
                        className="typed-text"
                        ref={(el) => {
                            this.el = el;
                        }}
                    />
                </>
            </>
        );
    }
}

export default TypedReact;
