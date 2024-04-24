import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //   Create User
  const createUser = (name, email, photoUrl, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userInfo = { user, setUser, loading, createUser };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      return () => {
        unSubscribe();
      };
    });
  }, []);

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
