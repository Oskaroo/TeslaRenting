import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import { LoginUser } from "../Api/apiCalls";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory(); // Inicjalizacja hooka useHistory

  const handleLoginClick = () => {
    const loginData = {
      Email: email,
      Password: password,
    };

    LoginUser(loginData)
      .then((token) => {
        handleLogin(token); // Wywołanie funkcji handleLogin przekazanej z komponentu nadrzędnego
        history.push("/"); // Przekierowanie użytkownika na stronę główną
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLoginClick}>Login</button>{" "}
      {/* Użyj funkcji handleLoginClick */}
    </div>
  );
}

export default Login;
