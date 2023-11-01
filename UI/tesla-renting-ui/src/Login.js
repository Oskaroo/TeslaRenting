import React, { useState } from "react";
import { LoginUser } from "./Api/apiCalls";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const loginData = {
      Email: email,
      Password: password,
    };

    LoginUser(loginData)
      .then((token) => {
        // Login successful, you can handle the token and user authentication here
        console.log(`Login successful. Token: ${token}`);
      })
      .catch((error) => {
        // Handle login errors
        setError(error.message);
      });
  };

  return (
    <div>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
