import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/actions/authActions";

import "./login.scss";
import Feedback from "../FeedBack";

function Login({ isConnect }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const Err = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    dispatch(logIn(data));
  };

  // Si l'utilisateur est authentifié, rediriger vers le tableau de bord
  useEffect(() => {
    if (isAuthenticated) {
      isConnect(true);
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="login">
      <span>Login</span>
      <Feedback err={Err} />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn-secondary-outline small">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
