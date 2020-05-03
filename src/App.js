import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Chat from "./pages/Chat/Chat";
import { AuthProvider } from "./providers/Auth";
import PrivateRoute from "./components/Routes/PrivateRoute";
import WelcomeRoute from "./components/Routes/WelcomeRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <WelcomeRoute exact path="/" component={Welcome} />
          <PrivateRoute exact path="/chat" component={Chat} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
