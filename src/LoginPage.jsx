import React from 'react';




export default function LoginPage() {

  function validateEmail() {
    var email = document.getElementById("email").value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      // document.write("Please enter a valid email address.");
      
    }
    
  }

  function validatePassword() {
    var password = document.getElementById("password").value;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, and one digit.");
    }
    
    
  }

  function validateForm() {
    if (!validateEmail() || !validatePassword()) {
      
    }
    
  }

  

 

  return (
    <>
    <div className='log-body'>
     
  
  <div className="login-box">
  
       
      <div className="header"><h2>Welcome Back</h2></div>
      <div className="login-card">
          <form >
              <div className="email-box">
                  <input type="email" className="e-box" for="email" placeholder="Enter Your Email or Mobile Number"  id="email" name="email" required/>
                  <label className="email-lb">Email /Mobile Number</label>
              </div>
              <div className="password-box">
                  <input type="password" className="p-box"for="password" placeholder="Enter your password" id="password" name="password" required/>
                  <label className="password-lb">Password</label>     
              </div>
              <input type="submit" value="Log in" onClick={validateForm}/>
              <div className="new-user-box">
                  <a href="#" > <h4>New user?</h4></a>
                  <h5>Forget your password</h5>
              </div>
          </form>
          
      </div>
     
  </div>
</div>
    </>
  );
}
