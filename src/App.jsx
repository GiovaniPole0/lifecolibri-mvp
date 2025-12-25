import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await fetch('https://cnan39np3f.execute-api.us-east-1.amazonaws.com/prod/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) setUser(data.user);
    } catch (e) {
      alert('Erro: ' + e.message);
    }
  };

  if (user) {
    return (
      <div style={{padding: '40px', fontFamily: 'Arial'}}>
        <h1>✅ Bem-vindo, {user.name}!</h1>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    );
  }

  return (
    <div style={{padding: '40px', maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial'}}>
      <h1>🦜 Life Colibri</h1>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        style={{width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px'}}
      />
      <input 
        type="password" 
        placeholder="Senha" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        style={{width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px'}}
      />
      <button onClick={login} style={{width: '100%', padding: '12px', fontSize: '16px', cursor: 'pointer'}}>
        Entrar
      </button>
      <p style={{marginTop: '20px', fontSize: '12px', color: '#666'}}>
        Teste: admin@lifecolibri.com / admin123
      </p>
    </div>
  );
}

export default App;
