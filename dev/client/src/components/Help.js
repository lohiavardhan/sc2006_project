import "../../static/css/Help.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

export default class Help extends Component{


    

    render() {
        return(
            <>
                <Navbar key={false} />
                <div class = "help-page">
                    
                    <h2>Help</h2>

                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis dignissim tortor, eu pellentesque massa. Aliquam iaculis, velit id vulputate porta, neque tortor viverra ipsum, nec laoreet massa turpis vel arcu. Proin mauris augue, faucibus vitae commodo quis, venenatis eu massa. Morbi facilisis auctor egestas. Phasellus faucibus eros et leo tristique, et fermentum quam commodo. Quisque imperdiet, nisi sed volutpat finibus, nisl ligula dictum orci, non bibendum risus ante consequat mauris. Donec iaculis iaculis cursus. Donec sagittis molestie nibh sed vestibulum. Nam laoreet augue at nibh hendrerit, non commodo purus dictum. Nunc auctor, orci ac auctor egestas, odio augue pulvinar enim, in faucibus diam erat a metus.</p>
                    <p>
                    Aliquam turpis mi, dictum eu metus non, mollis cursus dui. Nullam vulputate nisi imperdiet, tempus tortor viverra, auctor leo. Mauris et urna tincidunt, iaculis ligula quis, pellentesque lacus. Nam sit amet varius dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse commodo pharetra vestibulum. Fusce at nisl sapien. Proin nec dapibus purus. Maecenas eget diam non felis malesuada imperdiet et id arcu. In placerat diam at ipsum interdum, vitae blandit metus varius.
                    </p>
                    <p>
                    Aliquam turpis mi, dictum eu metus non, mollis cursus dui. Nullam vulputate nisi imperdiet, tempus tortor viverra, auctor leo. Mauris et urna tincidunt, iaculis ligula quis, pellentesque lacus. Nam sit amet varius dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse commodo pharetra vestibulum. Fusce at nisl sapien. Proin nec dapibus purus. Maecenas eget diam non felis malesuada imperdiet et id arcu. In placerat diam at ipsum interdum, vitae blandit metus varius.
                    </p>
                    <p>
                    Aliquam turpis mi, dictum eu metus non, mollis cursus dui. Nullam vulputate nisi imperdiet, tempus tortor viverra, auctor leo. Mauris et urna tincidunt, iaculis ligula quis, pellentesque lacus. Nam sit amet varius dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse commodo pharetra vestibulum. Fusce at nisl sapien. Proin nec dapibus purus. Maecenas eget diam non felis malesuada imperdiet et id arcu. In placerat diam at ipsum interdum, vitae blandit metus varius.
                    </p>
                </div>
            
            </>
        );
    }

    

}