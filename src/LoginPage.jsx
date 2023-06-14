import React, { Component } from 'react';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  validateEmail = () => {
    const { email } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false; // Return false to indicate validation failure
    }
    return true; // Return true to indicate validation success
  }

  validatePassword = () => {
    const { password } = this.state;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, and one digit.");
      return false; // Return false to indicate validation failure
    }
    return true; // Return true to indicate validation success
  }

  validateForm = (event) => {
    event.preventDefault(); // Prevent form submission
    const isValidEmail = this.validateEmail();
    const isValidPassword = this.validatePassword();
    if (isValidEmail && isValidPassword) {
      // Perform further actions if validation succeeds
      // For example, you can submit the form or navigate to another page
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <>
        <div className='log-body'>
          <div className="login-box">
            <div className="header"><h2>Welcome Back</h2></div>
            <div className="login-card">
              <form onSubmit={this.validateForm}>
                <div className="email-box">
                  <input
                    type="email"
                    className="e-box"
                    htmlFor="email"
                    placeholder="Enter Your Email or Mobile Number"
                    id="email"
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                    required
                  />
                  <label className="email-lb">Email /Mobile Number</label>
                </div>
                <div className="password-box">
                  <input
                    type="password"
                    className="p-box"
                    htmlFor="password"
                    placeholder="Enter your password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={this.handleInputChange}
                    required
                  />
                  <label className="password-lb">Password</label>
                </div>
                <input type="submit" value="Log in" />
                <div className="new-user-box">
                  <a href="#" target="_blank"> <h4>New user?</h4></a>
                  <h5>Forget your password</h5>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
