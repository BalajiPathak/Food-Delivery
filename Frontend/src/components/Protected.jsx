function Protected({ token, logout }) {
  return (
    <div>
      <h2>Protected Page</h2>
      <p>Welcome! You are logged in.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Protected;
