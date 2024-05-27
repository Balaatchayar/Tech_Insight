import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebaseConfig";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <div className="fixed-top border-bottom shadow-sm" style={{ backgroundColor: "whitesmoke" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="1.png"
              width={30}
              height={30}
              alt="logo"
              className="d-inline-block align-top"
            />
            <span className="ms-2 fw-bold">TechInsight</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
           
                </Link>
              </li>
              {user && (
                <li className="nav-item">
                  
                </li>
              )}
            </ul>
            <div className="d-flex">
              {user ? (
                <>
                  <span className="navbar-text me-3">
                    Signed in as {user.displayName }
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => signOut(auth)}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="d-flex align-items-center">
         
                  <Link className="btn btn-outline-primary btn-sm" to="/login">
                    
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
