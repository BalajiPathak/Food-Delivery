import { useState, useEffect } from 'react';

function TestConnection() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/test`)
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Backend Connection Test</h2>
      <p>{message}</p>
    </div>
  );
}

export default TestConnection;