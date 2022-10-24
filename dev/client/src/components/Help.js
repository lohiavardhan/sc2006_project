import React, { Component } from "react";
import Navbar from "./Navbar";
import "../../static/css/Help.css";


export default class Help extends Component {

    render(){
        return(
            <>
                <Navbar />
                <div>
                    <h1 className = "title" >FAQ Help Page</h1>
                    <h2 className = "subtitle">General Help</h2>
                    <details>
                        <summary>Account Help </summary>
                            <ol>
                                <span>
                                    <li className = "span">Click on home logo</li>
                                    <li className = "span">Click on Account</li>
                                </span>
                            </ol>
                    </details>
                    <div>
                        <details>
                            <summary>WishList Help  </summary>
                                <ol>
                                    <span>
                                        <li className = "span">Click on home logo </li>
                                        <li className = "span">Click on WishList</li>
                                        <li className = "span">Add / Remove item</li>
                                    </span>
                                </ol>
                        </details>
                    </div>
                    <div>
                        <details>
                            <summary>Friend Help  </summary>
                                <ol>
                                    <span>
                                        <li className = "span">Click on home logo </li>
                                        <li className = "span">Click on Account</li>
                                        <li className = "span">Click on friends</li>
                                    </span>
                                </ol>
                        </details>
                    </div>
                    <br/>
                    <p><h3 className = "subtitle">Common Questions </h3></p>
                    <div>
                        <details>
                            <summary style = {{width: "41rem"}}>Why can i not find my item? </summary>
                                <ol>
                                    <span>
                                        <li className = "span">Item is sold out </li>
                                        <li className = "span">Item is not available </li>
                                    </span >
                                </ol>
                        </details>
                    </div>
                </div>


            </>
        )
        
        
    }
}