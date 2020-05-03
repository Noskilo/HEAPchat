import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
