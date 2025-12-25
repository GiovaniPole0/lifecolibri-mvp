import React, { useState } from 'react';

const API_URL = 'https://cnan39np3f.execute-api.us-east-1.amazonaws.com/prod';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) setUser(data.user);
      else alert('Login falhou');
    } catch (e) {
      alert('Erro: ' + e.message);
    }
    setLoading(false);
  };

  if (user) {
    return (
      <div style={{padding: '40px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto'}}>
        <div style={{background: 'linear-gradient(135deg, #0d9488, #06b6d4)', color: 'white', padding: '40px', borderRadius: '16px', marginBottom: '30px', textAlign: 'center'}}>
          <div style={{fontSize: '60px', marginBottom: '20px'}}>{user.avatar}</div>
          <h1 style={{fontSize: '32px', marginBottom: '10px'}}>Bem-vindo, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <p>Função: {user.role}</p>
        </div>
        
        {user.role === 'admin' && (
          <div style={{background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px'}}>
            <h2 style={{marginBottom: '20px'}}>🔧 Painel Administrativo</h2>
            <p>✅ Gerenciar usuários</p>
            <p>✅ Ver todos os agendamentos</p>
            <p>✅ Configurações do sistema</p>
          </div>
        )}
        
        {user.role === 'medico' && (
          <div style={{background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px'}}>
            <h2 style={{marginBottom: '20px'}}>👨‍⚕️ Portal Médico</h2>
            <p>✅ Consultas agendadas</p>
            <p>✅ Prontuários de pacientes</p>
            <p>✅ Configurar disponibilidade</p>
          </div>
        )}
        
        {user.role === 'paciente' && (
          <div style={{background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px'}}>
            <h2 style={{marginBottom: '20px'}}>👤 Portal do Paciente</h2>
            <p>✅ Agendar consultas</p>
            <p>✅ Ver médicos disponíveis</p>
            <p>✅ Meu prontuário</p>
          </div>
        )}
        
        <button 
          onClick={() => setUser(null)} 
          style={{width: '100%', padding: '15px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'}}
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdfa, #cffafe, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Arial'}}>
      <div style={{background: 'white', padding: '40px', borderRadius: '16px', maxWidth: '400px', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
        <h1 style={{fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', background: 'linear-gradient(to right, #0d9488, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>🦜 Life Colibri</h1>
        <p style={{textAlign: 'center', color: '#666', marginBottom: '30px'}}>Clínica Digital</p>
        
        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'block', fontWeight: '600', marginBottom: '8px'}}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px'}}
            placeholder="seu@email.com"
          />
        </div>

        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', fontWeight: '600', marginBottom: '8px'}}>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && login()}
            style={{width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px'}}
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={login}
          disabled={loading}
          style={{width: '100%', padding: '14px', background: 'linear-gradient(to right, #0d9488, #06b6d4)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px'}}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <div style={{textAlign: 'center', color: '#999', marginBottom: '15px', fontSize: '14px'}}>Acesso rápido</div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
          {[
            { email: 'admin@lifecolibri.com', pass: 'admin123', label: 'Admin', icon: '👨‍💼' },
            { email: 'dr.silva@lifecolibri.com', pass: 'medico123', label: 'Médico', icon: '👨‍⚕️' },
            { email: 'ana@email.com', pass: 'paciente123', label: 'Paciente', icon: '👩' }
          ].map((q) => (
            <button
              key={q.label}
              onClick={() => { setEmail(q.email); setPassword(q.pass); setTimeout(login, 100); }}
              style={{padding: '15px 5px', background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}
            >
              <div style={{fontSize: '24px', marginBottom: '5px'}}>{q.icon}</div>
              {q.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
