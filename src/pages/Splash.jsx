import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import { useState } from "react";

const Splash = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="h-100 d-flex flex-column justify-content-end">
      <div className="h-75 d-flex flex-column justify-content-between align-items-center">
        <Image src="/logo.png" />
        <div className="w-100">
          <Button
            variant="light"
            size="lg"
            className="w-100 rounded-0"
            onClick={() => setShowRegister(true)}
          >
            Create an account
          </Button>
          <Button
            variant="dark"
            size="lg"
            className="w-100 rounded-0"
            onClick={() => setShowSignIn(true)}
          >
            Log in
          </Button>
        </div>
      </div>

      <Register show={showRegister} onHide={() => setShowRegister(false)} />
      <SignIn show={showSignIn} onHide={() => setShowSignIn(false)} />
    </div>
  );
};

export default Splash;
