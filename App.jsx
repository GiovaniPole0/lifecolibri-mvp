import React, { useState } from 'react';

const API_URL = 'https://cnan39np3f.execute-api.us-east-1.amazonaws.com/prod';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-
cd ~
rm -rf lifecolibri-frontend
mkdir lifecolibri-frontend
cd lifecolibri-frontend

# Criar App.jsx (arquivo principal)
cat > App.jsx << 'EOF'
import React, { useState } from 'react';

const API_URL = 'https://cnan39np3f.execute-api.us-east-1.amazonaws.com/prod';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-
cd ~
rm -rf lifecolibri-frontend
mkdir lifecolibri-frontend
cd lifecolibri-frontend

# Criar App.jsx (arquivo principal)
cat > App.jsx << 'EOF'
import React, { useState } from 'react';

const API_URL = 'https://cnan39np3f.execute-api.us-east-1.amazonaws.com/prod';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) setUser(data.user);
    } catch (error) {
      alert('Erro ao fazer login');
    }
  };

  if (user) {
    return <div><h1>Bem-vindo, {user.name}!</h1></div>;
  }

  return (
    <div>
      <h1>Life Colibri</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default App;
