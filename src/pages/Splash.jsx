import { useState } from "react";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import SignIn from "../components/SignIn";
import Register from "../components/Register";

const Splash = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <main className="w-25 mx-auto py-5 d-flex flex-column justify-items-center">
      <Image src="logo.png" fluid className="mb-5" />
      <div className="d-flex justify-content-between">
        <Button variant="light" size="lg" onClick={() => setShowRegister(true)}>
          Create an account
        </Button>
        <Button variant="dark" size="lg" onClick={() => setShowSignIn(true)}>
          Log in
        </Button>
      </div>

      <Register show={showRegister} onHide={() => setShowRegister(false)} />
      <SignIn show={showSignIn} onHide={() => setShowSignIn(false)} />
    </main>
  );
};

export default Splash;
