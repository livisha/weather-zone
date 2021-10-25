import React, { useState, useEffect} from 'react';
import './App.css';
import fire from './firebase';
import Login from './components/login/Login';
import Home from './components/home/Home';

// Here function component named as App includes the functions and parameters required for login details. 
// The App function returns the component on the basis of whether user signed in or not.


const App = () => {
  // Use state hook is used to initialize the variables and prividing the function to update there values.
  const [user, setUser] = useState("");//contains the information whether user is signed-in or not.

  // Contains the login ID and Password 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If error arrises it get stored here
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // Detects whether account already exists or not
  const [hasAccount, setHasAccount] = useState(false);

  // Function that clears the value of email and password if the value is not required.
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  // Function clear the error once it encountered
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  // Login function for connecting the already existing user using the firebase authentication function and checking for the errors.
  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account created & signed in!");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  // Sign-up function for creating new account of user using the firebase authentication function and checking for the errors.
  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account created & signed in!");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  // Function used to sign-out the user account.
  const handleLogout = () => {
    fire.auth().signOut();
  };

  // Auth Listener used to change the state if user is already logged in once.
  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  // UseEffect hook tell React that the needs to be called first.
  useEffect(() => {
    authListener();
  });

  // Using If-Else conditioning operator to check which component is to be shown first on basis of user present.
  return (
    <div className="login-section">
        {user ? (
          <Home handleLogout={handleLogout} />
        ) : (
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        )}
      </div>
  );
}
// Export the the App function be default.
export default App;
