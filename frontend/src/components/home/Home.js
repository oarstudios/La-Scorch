import React, { useState } from 'react';
import SignInPopup from '../auth/SignInPopup';
import SignUpPopup from '../auth/SignUpPopup';

const Home = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const switchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <>
      <button onClick={() => setShowSignIn(true)}>Sign In</button>
      <button onClick={() => setShowSignUp(true)}>Sign Up</button>

      {showSignIn && <SignInPopup onClose={() => setShowSignIn(false)} onSwitch={switchToSignUp} />}
      {showSignUp && <SignUpPopup onClose={() => setShowSignUp(false)} onSwitch={switchToSignIn} />}
    </>
  );
};

export default Home;
