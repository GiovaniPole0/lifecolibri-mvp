import React, { useState, useEffect } from 'react';
import { Calendar, User, Users, Clock, Heart, FileText, Settings, LogOut, Plus, Check, X, Edit, Trash2, Activity, ChevronRight } from 'lucide-react';

const API_URL = 'https://cnan39np3f.execute-api.us-east-1.amazonaws.com/prod';

const api = {
  async login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }
};

const ColibriLogo = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <defs>
      <linearGradient id="wing1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#10b981'}} />
        <stop offset="100%" style={{stopColor: '#059669'}} />
      </linearGradient>
      <linearGradient id="wing2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#3b82f6'}} />
        <stop offset="100%" style={{stopColor: '#2563eb'}} />
      </linearGradient>
      <linearGradient id="body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ec4899'}} />
        <stop offset="100%" style={{stopColor: '#db2777'}} />
      </linearGradient>
    </defs>
    <path d="M60 80 Q50 70, 40 80 Q50 90, 60 80" fill="url(#wing1)" />
    <path d="M70 85 Q60 75, 50 85 Q60 95, 70 85" fill="url(#wing2)" />
    <ellipse cx="90" cy="100" rx="25" ry="35" fill="url(#body)" />
    <circle cx="110" cy="85" r="18" fill="#fbbf24" />
    <path d="M128 85 L160 80" stroke="#d97706" strokeWidth="3" fill="none" />
    <circle cx="115" cy="82" r="3" fill="#000" />
  </svg>
);

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await api.login(email, password);
      
      if (result.success) {
        onLogin(result.user);
      } else {
        setError(result.message || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao conectar');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (qEmail, qPass) => {
    setEmail(qEmail);
    setPassword(qPass);
    setTimeout(() => handleLogin(), 100);
  };

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdfa 0%, #cffafe 50%, #dbeafe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
      <div style={{maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center'}}>
        
        <div style={{textAlign: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '40px'}}>
            <div style={{background: 'white', padding: '20px', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)'}}>
              <ColibriLogo size={80} />
            </div>
            <div>
              <h1 style={{fontSize: '48px', fontWeight: 'bold', background: 'linear-gradient(to right, #0d9488, #06b6d4, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0}}>Life Colibri</h1>
              <p style={{color: '#666', fontWeight: '600', margin: 0}}>Clínica Digital</p>
            </div>
          </div>
          
          <h2 style={{fontSize: '42px', fontWeight: 'bold', color: '#111', marginBottom: '20px'}}>
            Realize o sonho de <span style={{background: 'linear-gradient(to right, #0d9488, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>construir sua família</span>
          </h2>
        </div>

        <div style={{background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)'}}>
          <h3 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '10px'}}>Bem-vindo!</h3>
          <p style={{color: '#666', marginBottom: '30px'}}>Entre para acessar</p>

          {error && (
            <div style={{marginBottom: '20px', padding: '15px', background: '#fee', borderLeft: '4px solid #f00', borderRadius: '8px'}}>
              <p style={{color: '#c00', margin: 0}}>{error}</p>
            </div>
          )}

          <div style={{marginBottom: '15px'}}>
            <label style={{display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px'}}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{width: '100%', padding: '12px', background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '16px', outline: 'none'}}
              placeholder="seu@email.com"
            />
          </div>

          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px'}}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              style={{width: '100%', padding: '12px', background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '16px', outline: 'none'}}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={{width: '100%', background: 'linear-gradient(to right, #0d9488, #06b6d4)', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px'}}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          <div style={{textAlign: 'center', margin: '20px 0', color: '#999', fontSize: '14px'}}>ou acesse rapidamente</div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
            {[
              { email: 'admin@lifecolibri.com', pass: 'admin123', label: 'Admin', icon: '👨‍💼' },
              { email: 'dr.silva@lifecolibri.com', pass: 'medico123', label: 'Médico', icon: '👨‍⚕️' },
              { email: 'ana@email.com', pass: 'paciente123', label: 'Paciente', icon: '👩' }
            ].map((ql) => (
              <button
                key={ql.label}
                onClick={() => quickLogin(ql.email, ql.pass)}
                style={{padding: '20px 10px', background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'}}
              >
                <div style={{fontSize: '32px', marginBottom: '8px'}}>{ql.icon}</div>
                <div style={{fontSize: '12px', fontWeight: 'bold'}}>{ql.label}</div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => {
  return (
    <div style={{minHeight: '100vh', background: '#f9fafb'}}>
      <div style={{background: 'white', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <ColibriLogo size={40} />
            <div>
              <h1 style={{fontSize: '20px', fontWeight: 'bold', color: '#0d9488', margin: 0}}>Life Colibri</h1>
              <p style={{fontSize: '12px', color: '#666', margin: 0}}>{user.role === 'admin' ? 'Admin' : user.role === 'medico' ? 'Médico' : 'Paciente'}</p>
            </div>
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{fontSize: '28px'}}>{user.avatar}</div>
              <div>
                <div style={{fontSize: '14px', fontWeight: '600'}}>{user.name}</div>
                <div style={{fontSize: '12px', color: '#666'}}>{user.email}</div>
              </div>
            </div>
            <button onClick={onLogout} style={{padding: '8px 16px', color: '#666', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
              Sair
            </button>
          </div>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '48px 24px'}}>
        <div style={{background: 'white', borderRadius: '16px', padding: '48px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center'}}>
          <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #0d9488, #06b6d4)', borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px'}}>
            {user.avatar}
          </div>
          <h2 style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '16px'}}>Bem-vindo, {user.name}!</h2>
          <p style={{color: '#666', marginBottom: '32px'}}>Login realizado com sucesso via API AWS</p>
          
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#d1fae5', color: '#065f46', borderRadius: '999px'}}>
            <Check style={{width: '20px', height: '20px'}} />
            <span style={{fontWeight: '600'}}>Backend AWS Funcionando!</span>
          </div>

          <div style={{marginTop: '48px', padding: '24px', background: '#f9fafb', borderRadius: '12px'}}>
            <h3 style={{fontWeight: 'bold', marginBottom: '16px'}}>Informações do Usuário</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'left'}}>
              <div>
                <div style={{fontSize: '12px', color: '#666', marginBottom: '4px'}}>ID</div>
                <div style={{fontFamily: 'monospace', fontSize: '14px'}}>{user.id}</div>
              </div>
              <div>
                <div style={{fontSize: '12px', color: '#666', marginBottom: '4px'}}>Função</div>
                <div style={{fontWeight: '600', fontSize: '14px', textTransform: 'capitalize'}}>{user.role}</div>
              </div>
              <div style={{gridColumn: '1 / -1'}}>
                <div style={{fontSize: '12px', color: '#666', marginBottom: '4px'}}>Email</div>
                <div style={{fontSize: '14px'}}>{user.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  return user ? <Dashboard user={user} onLogout={() => setUser(null)} /> : <LoginPage onLogin={setUser} />;
};

export default App;
