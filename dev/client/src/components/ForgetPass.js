import "../../static/css/LoginSignup.css";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { redirect } = this.state;
      const { error_message } = this.state;
      const { isAuth } = this.state;

      if (isAuth) {
        if (!redirect) {
            return (
              <>
                <Navbar key={isAuth} />
                          <div className="otp-container">
                              <div className="otp-background">
                                  {error_message != "NULL" && (
                                      <p className="otp-error">{error_message}</p>
                                  )}
                                  <div className="otp-panel">
                                      <div className="otp-content">
                                          <h3 className="otp-content-title">
                                              Forget Password
                                          </h3>
                                          <p className="otp-content-instruction">
                                              Enter the OTP code that you received
                                              in your email.
                                          </p>
                                          <form onSubmit={this.handleSubmit}>
                                              <div className="otp-content-credential">
                                                  <input
                                                      required
                                                      type="password"
                                                      name="OTP"
                                                      id="OTP"
                                                      placeholder="OTP"
                                                      className="otp-input"
                                                      onChange={this.handleChange}
                                                  />
                                              </div>
                                              <button
                                                  type="submit"
                                                  className="otp-content-btn btn-positive"
                                              >
                                                  Submit
                                              </button>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>
                    </>
                );
            } else {
                return <Navigate to={`/home`} />;
            }
        } else {
            return <Navigate to={`/login`} />;
        }
    }
  
}
