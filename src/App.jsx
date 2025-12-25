import React, { useState, useEffect } from 'react';

// ==================== STORAGE HELPER ====================
const storage = {
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
};

// ==================== INITIALIZE DATA ====================
const initializeData = () => {
  const existingUsers = storage.get('users');
  
  if (!existingUsers) {
    const users = {
      admin: {
        id: 'admin-1',
        email: 'admin@lifecolibri.com',
        password: 'admin123',
        role: 'admin',
        name: 'Administrador Sistema',
        avatar: '👨‍💼'
      },
      medico1: {
        id: 'doc-1',
        email: 'dr.silva@lifecolibri.com',
        password: 'medico123',
        role: 'medico',
        name: 'Dr. João Silva',
        specialty: 'Reprodução Assistida',
        crm: 'CRM 12345-SP',
        avatar: '👨‍⚕️',
        bio: 'Especialista em FIV com 15 anos'
      },
      medico2: {
        id: 'doc-2',
        email: 'dra.santos@lifecolibri.com',
        password: 'medico123',
        role: 'medico',
        name: 'Dra. Maria Santos',
        specialty: 'Ginecologia',
        crm: 'CRM 67890-SP',
        avatar: '👩‍⚕️',
        bio: 'Ginecologista especialista'
      },
      paciente1: {
        id: 'pat-1',
        email: 'ana@email.com',
        password: 'paciente123',
        role: 'paciente',
        name: 'Ana Oliveira',
        age: 32,
        avatar: '👩',
        phone: '(11) 98765-4321'
      }
    };
    
    storage.set('users', users);
    
    const availability = {
      'doc-1': [
        { day: 'Segunda', hours: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
        { day: 'Terça', hours: ['09:00', '10:00', '14:00', '15:00'] },
        { day: 'Quarta', hours: ['09:00', '14:00', '15:00'] },
        { day: 'Quinta', hours: ['09:00', '10:00', '14:00'] },
        { day: 'Sexta', hours: ['09:00', '10:00'] }
      ],
      'doc-2': [
        { day: 'Segunda', hours: ['08:00', '09:00', '10:00'] },
        { day: 'Terça', hours: ['08:00', '09:00'] },
        { day: 'Quarta', hours: ['08:00', '09:00'] },
        { day: 'Quinta', hours: ['08:00', '14:00'] },
        { day: 'Sexta', hours: ['08:00', '09:00'] }
      ]
    };
    
    storage.set('availability', availability);
    storage.set('appointments', []);
  }
};

// ==================== LOGIN ====================
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const users = storage.get('users');
    const user = Object.values(users || {}).find(u => u.email === email && u.password === password);
    
    if (user) {
      onLogin(user);
    } else {
      setError('Email ou senha incorretos');
    }
  };

  const quickLogin = (qEmail, qPass) => {
    setEmail(qEmail);
    setPassword(qPass);
    setTimeout(() => handleLogin(), 100);
  };

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #dbeafe, #e0e7ff, #fce7f3)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Arial'}}>
      <div style={{maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px'}}>
        
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '80px', marginBottom: '20px'}}>🦜</div>
          <h1 style={{fontSize: '48px', fontWeight: 'bold', background: 'linear-gradient(to right, #7c3aed, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0}}>Life Colibri</h1>
          <p style={{color: '#666', fontSize: '18px', marginBottom: '30px'}}>Plataforma de Saúde Reprodutiva</p>
          <p style={{color: '#666', fontSize: '16px', lineHeight: '1.6'}}>Sistema completo com agendamentos, prontuários e gestão de pacientes</p>
        </div>

        <div style={{background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)'}}>
          <h3 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '10px'}}>Entrar</h3>
          <p style={{color: '#666', marginBottom: '30px'}}>Acesse sua conta</p>

          {error && (
            <div style={{marginBottom: '20px', padding: '15px', background: '#fee', borderLeft: '4px solid #f00', borderRadius: '8px', color: '#c00'}}>
              {error}
            </div>
          )}

          <div style={{marginBottom: '15px'}}>
            <label style={{display: 'block', fontWeight: '600', marginBottom: '8px'}}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '16px', outline: 'none'}}
              placeholder="seu@email.com"
            />
          </div>

          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', fontWeight: '600', marginBottom: '8px'}}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              style={{width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '16px', outline: 'none'}}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            style={{width: '100%', padding: '14px', background: 'linear-gradient(to right, #7c3aed, #ec4899)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px'}}
          >
            Entrar
          </button>

          <div style={{textAlign: 'center', margin: '20px 0', color: '#999'}}>Acesso rápido</div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
            {[
              { email: 'admin@lifecolibri.com', pass: 'admin123', label: 'Admin', icon: '👨‍💼' },
              { email: 'dr.silva@lifecolibri.com', pass: 'medico123', label: 'Médico', icon: '👨‍⚕️' },
              { email: 'ana@email.com', pass: 'paciente123', label: 'Paciente', icon: '👩' }
            ].map((q) => (
              <button
                key={q.label}
                onClick={() => quickLogin(q.email, q.pass)}
                style={{padding: '15px 5px', background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}
              >
                <div style={{fontSize: '28px', marginBottom: '5px'}}>{q.icon}</div>
                {q.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// ==================== PACIENTE DASHBOARD ====================
const PacienteDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availability, setAvailability] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const users = storage.get('users');
    const allAppointments = storage.get('appointments') || [];
    const avail = storage.get('availability') || {};
    
    setDoctors(Object.values(users || {}).filter(u => u.role === 'medico'));
    setAppointments(allAppointments.filter(a => a.patientId === user.id));
    setAvailability(avail);
  };

  const createAppointment = () => {
    if (!selectedDoctor || !selectedDay || !selectedTime) {
      alert('Selecione médico, dia e horário');
      return;
    }

    const newApt = {
      id: `apt-${Date.now()}`,
      patientId: user.id,
      patientName: user.name,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      day: selectedDay,
      time: selectedTime,
      status: 'agendado',
      type: 'Consulta'
    };

    const all = storage.get('appointments') || [];
    storage.set('appointments', [...all, newApt]);
    
    setShowModal(false);
    setSelectedDoctor(null);
    setSelectedDay('');
    setSelectedTime('');
    loadData();
  };

  const cancelAppointment = (aptId) => {
    if (!confirm('Cancelar consulta?')) return;
    const all = storage.get('appointments') || [];
    storage.set('appointments', all.map(a => a.id === aptId ? {...a, status: 'cancelado'} : a));
    loadData();
  };

  const getAvailableSlots = () => {
    if (!selectedDoctor || !selectedDay) return [];
    const doctorAvail = availability[selectedDoctor.id] || [];
    const dayAvail = doctorAvail.find(d => d.day === selectedDay);
    if (!dayAvail) return [];
    const bookedTimes = appointments.filter(a => a.doctorId === selectedDoctor.id && a.day === selectedDay && a.status !== 'cancelado').map(a => a.time);
    return dayAvail.hours.filter(h => !bookedTimes.includes(h));
  };

  return (
    <div style={{minHeight: '100vh', background: '#f0fdf4', fontFamily: 'Arial'}}>
      <div style={{background: 'white', borderBottom: '4px solid #10b981', padding: '16px 24px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{fontSize: '36px'}}>🦜</div>
            <div>
              <h1 style={{margin: 0, fontSize: '24px', fontWeight: 'bold'}}>Life Colibri</h1>
              <p style={{margin: 0, fontSize: '12px', color: '#666'}}>Portal do Paciente</p>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{fontSize: '24px'}}>{user.avatar}</div>
            <div>
              <div style={{fontWeight: '600'}}>{user.name}</div>
              <div style={{fontSize: '12px', color: '#666'}}>Paciente</div>
            </div>
            <button onClick={onLogout} style={{marginLeft: '12px', padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Sair</button>
          </div>
        </div>
      </div>

      <div style={{background: 'white', borderBottom: '1px solid #e5e7eb'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '8px', padding: '0 24px'}}>
          {['home', 'appointments', 'doctors', 'records'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{padding: '12px 24px', background: activeTab === tab ? '#d1fae5' : 'white', borderBottom: activeTab === tab ? '3px solid #10b981' : 'none', border: 'none', cursor: 'pointer', fontWeight: activeTab === tab ? 'bold' : 'normal'}}
            >
              {tab === 'home' ? '🏠 Início' : tab === 'appointments' ? '📅 Consultas' : tab === 'doctors' ? '👨‍⚕️ Médicos' : '📋 Prontuário'}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '24px'}}>
        {activeTab === 'home' && (
          <div>
            <div style={{background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', padding: '32px', borderRadius: '16px', marginBottom: '24px'}}>
              <h2 style={{margin: 0, fontSize: '32px'}}>Bem-vindo, {user.name}! 👋</h2>
              <p style={{margin: '8px 0 0 0'}}>Gerencie suas consultas e tratamento</p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px'}}>
              <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6'}}>
                <div style={{fontSize: '32px', fontWeight: 'bold', color: '#1f2937'}}>{appointments.filter(a => a.status === 'agendado').length}</div>
                <div style={{fontSize: '14px', color: '#666'}}>📅 Agendadas</div>
              </div>
              <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981'}}>
                <div style={{fontSize: '32px', fontWeight: 'bold', color: '#1f2937'}}>{appointments.filter(a => a.status === 'concluido').length}</div>
                <div style={{fontSize: '14px', color: '#666'}}>✅ Realizadas</div>
              </div>
              <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid #7c3aed'}}>
                <div style={{fontSize: '32px', fontWeight: 'bold', color: '#1f2937'}}>{doctors.length}</div>
                <div style={{fontSize: '14px', color: '#666'}}>👨‍⚕️ Médicos</div>
              </div>
            </div>

            {appointments.filter(a => a.status === 'agendado').length > 0 && (
              <div style={{background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                <h3 style={{marginTop: 0}}>Próximas Consultas</h3>
                {appointments.filter(a => a.status === 'agendado').map(apt => (
                  <div key={apt.id} style={{padding: '12px', background: '#d1fae5', borderRadius: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <div style={{fontWeight: 'bold'}}>{apt.doctorName}</div>
                      <div style={{fontSize: '14px', color: '#666'}}>{apt.day} às {apt.time}</div>
                    </div>
                    <div style={{padding: '4px 12px', background: '#10b981', color: 'white', borderRadius: '12px', fontSize: '12px'}}>Agendado</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h2>Minhas Consultas</h2>
              <button onClick={() => setActiveTab('doctors')} style={{padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>+ Nova Consulta</button>
            </div>
            {appointments.length === 0 ? (
              <div style={{background: 'white', padding: '48px', textAlign: 'center', borderRadius: '12px'}}>
                <div style={{fontSize: '64px', marginBottom: '16px'}}>📅</div>
                <p>Nenhuma consulta agendada</p>
                <button onClick={() => setActiveTab('doctors')} style={{padding: '12px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '16px'}}>Agendar Consulta</button>
              </div>
            ) : (
              appointments.map(apt => (
                <div key={apt.id} style={{background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                    <div>
                      <h3 style={{margin: '0 0 8px 0'}}>{apt.doctorName}</h3>
                      <div style={{fontSize: '14px', color: '#666'}}>{apt.day} às {apt.time} • {apt.type}</div>
                    </div>
                    <div>
                      <div style={{padding: '4px 12px', background: apt.status === 'agendado' ? '#dbeafe' : apt.status === 'concluido' ? '#d1fae5' : '#fee2e2', color: apt.status === 'agendado' ? '#1e40af' : apt.status === 'concluido' ? '#065f46' : '#991b1b', borderRadius: '12px', fontSize: '12px', marginBottom: '8px'}}>
                        {apt.status === 'agendado' ? '📅 Agendado' : apt.status === 'concluido' ? '✅ Concluído' : '❌ Cancelado'}
                      </div>
                      {apt.status === 'agendado' && (
                        <button onClick={() => cancelAppointment(apt.id)} style={{padding: '4px 12px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px'}}>Cancelar</button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'doctors' && (
          <div>
            <h2>Nossos Médicos</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
              {doctors.map(doc => (
                <div key={doc.id} style={{background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                  <div style={{display: 'flex', gap: '12px', marginBottom: '16px'}}>
                    <div style={{fontSize: '48px'}}>{doc.avatar}</div>
                    <div>
                      <h3 style={{margin: '0 0 4px 0'}}>{doc.name}</h3>
                      <div style={{fontSize: '14px', color: '#7c3aed', fontWeight: 'bold'}}>{doc.specialty}</div>
                      <div style={{fontSize: '12px', color: '#666'}}>{doc.crm}</div>
                    </div>
                  </div>
                  <p style={{fontSize: '14px', color: '#666', marginBottom: '16px'}}>{doc.bio}</p>
                  <button onClick={() => { setSelectedDoctor(doc); setShowModal(true); }} style={{width: '100%', padding: '12px', background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>📅 Agendar Consulta</button>
                </div>
              ))}
            </div>

            {showModal && selectedDoctor && (
              <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
                <div style={{background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '600px', width: '90%'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                    <h3 style={{margin: 0}}>Agendar Consulta</h3>
                    <button onClick={() => { setShowModal(false); setSelectedDoctor(null); setSelectedDay(''); setSelectedTime(''); }} style={{width: '32px', height: '32px', background: '#f3f4f6', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '18px'}}>×</button>
                  </div>
                  
                  <div style={{padding: '16px', background: '#f3f4f6', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center'}}>
                    <div style={{fontSize: '32px'}}>{selectedDoctor.avatar}</div>
                    <div>
                      <div style={{fontWeight: 'bold'}}>{selectedDoctor.name}</div>
                      <div style={{fontSize: '14px', color: '#666'}}>{selectedDoctor.specialty}</div>
                    </div>
                  </div>

                  <div style={{marginBottom: '20px'}}>
                    <label style={{display: 'block', fontWeight: 'bold', marginBottom: '12px'}}>Dia:</label>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px'}}>
                      {(availability[selectedDoctor.id] || []).map(dayAvail => (
                        <button
                          key={dayAvail.day}
                          onClick={() => { setSelectedDay(dayAvail.day); setSelectedTime(''); }}
                          style={{padding: '12px', background: selectedDay === dayAvail.day ? '#10b981' : '#f3f4f6', color: selectedDay === dayAvail.day ? 'white' : '#1f2937', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: selectedDay === dayAvail.day ? 'bold' : 'normal'}}
                        >
                          {dayAvail.day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDay && (
                    <div style={{marginBottom: '20px'}}>
                      <label style={{display: 'block', fontWeight: 'bold', marginBottom: '12px'}}>Horário:</label>
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', gap: '8px'}}>
                        {getAvailableSlots().map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            style={{padding: '12px', background: selectedTime === time ? '#10b981' : '#f3f4f6', color: selectedTime === time ? 'white' : '#1f2937', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: selectedTime === time ? 'bold' : 'normal'}}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {getAvailableSlots().length === 0 && <p style={{textAlign: 'center', color: '#666'}}>Sem horários disponíveis</p>}
                    </div>
                  )}

                  <button
                    onClick={createAppointment}
                    disabled={!selectedDay || !selectedTime}
                    style={{width: '100%', padding: '16px', background: selectedDay && selectedTime ? 'linear-gradient(to right, #10b981, #059669)' : '#d1d5db', color: 'white', border: 'none', borderRadius: '8px', cursor: selectedDay && selectedTime ? 'pointer' : 'not-allowed', fontWeight: 'bold'}}
                  >
                    Confirmar Agendamento
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'records' && (
          <div style={{background: 'white', padding: '48px', textAlign: 'center', borderRadius: '12px'}}>
            <div style={{fontSize: '64px', marginBottom: '16px'}}>📋</div>
            <p>Prontuário será preenchido após consultas</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== MÉDICO DASHBOARD ====================
const MedicoDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const all = storage.get('appointments') || [];
    setAppointments(all.filter(a => a.doctorId === user.id));
  }, [user.id]);

  const updateStatus = (aptId, status) => {
    const all = storage.get('appointments') || [];
    storage.set('appointments', all.map(a => a.id === aptId ? {...a, status} : a));
    setAppointments(all.filter(a => a.doctorId === user.id).map(a => a.id === aptId ? {...a, status} : a));
  };

  return (
    <div style={{minHeight: '100vh', background: '#eff6ff', fontFamily: 'Arial'}}>
      <div style={{background: 'white', borderBottom: '4px solid #3b82f6', padding: '16px 24px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{fontSize: '36px'}}>🦜</div>
            <div>
              <h1 style={{margin: 0, fontSize: '24px', fontWeight: 'bold'}}>Life Colibri</h1>
              <p style={{margin: 0, fontSize: '12px', color: '#666'}}>Portal Médico</p>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{fontSize: '24px'}}>{user.avatar}</div>
            <div>
              <div style={{fontWeight: '600'}}>{user.name}</div>
              <div style={{fontSize: '12px', color: '#666'}}>{user.specialty}</div>
            </div>
            <button onClick={onLogout} style={{marginLeft: '12px', padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Sair</button>
          </div>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '24px'}}>
        <div style={{background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', padding: '32px', borderRadius: '16px', marginBottom: '24px'}}>
          <h2 style={{margin: 0}}>Bem-vindo, {user.name}! 👋</h2>
          <p style={{margin: '8px 0 0 0'}}>{user.specialty} • {user.crm}</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px'}}>
          <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '32px', fontWeight: 'bold'}}>{appointments.filter(a => a.status === 'agendado').length}</div>
            <div style={{fontSize: '14px', color: '#666'}}>⏰ Agendadas</div>
          </div>
          <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '32px', fontWeight: 'bold'}}>{appointments.filter(a => a.status === 'concluido').length}</div>
            <div style={{fontSize: '14px', color: '#666'}}>✅ Realizadas</div>
          </div>
        </div>

        <div style={{background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
          <h3>Consultas</h3>
          {appointments.length === 0 ? (
            <p style={{textAlign: 'center', color: '#666', padding: '32px'}}>Nenhuma consulta</p>
          ) : (
            appointments.map(apt => (
              <div key={apt.id} style={{padding: '16px', background: '#f9fafb', borderRadius: '8px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <div style={{fontWeight: 'bold'}}>{apt.patientName}</div>
                  <div style={{fontSize: '14px', color: '#666'}}>{apt.day} às {apt.time}</div>
                </div>
                <div style={{display: 'flex', gap: '8px'}}>
                  <div style={{padding: '4px 12px', background: apt.status === 'agendado' ? '#fed7aa' : apt.status === 'concluido' ? '#d1fae5' : '#fee2e2', borderRadius: '12px', fontSize: '12px'}}>
                    {apt.status}
                  </div>
                  {apt.status === 'agendado' && (
                    <>
                      <button onClick={() => updateStatus(apt.id, 'concluido')} style={{padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'}}>Concluir</button>
                      <button onClick={() => updateStatus(apt.id, 'cancelado')} style={{padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'}}>Cancelar</button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== ADMIN DASHBOARD ====================
const AdminDashboard = ({ user, onLogout }) => {
  const [users, setUsers] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    setUsers(storage.get('users') || {});
    setAppointments(storage.get('appointments') || []);
  }, []);

  const deleteUser = (userId) => {
    if (!confirm('Excluir usuário?')) return;
    const all = storage.get('users') || {};
    delete all[userId];
    storage.set('users', all);
    setUsers(all);
  };

  const saveUser = () => {
    const all = storage.get('users') || {};
    const key = Object.keys(all).find(k => all[k].id === editForm.id);
    if (key) {
      all[key] = editForm;
      storage.set('users', all);
      setUsers(all);
      setEditUser(null);
    }
  };

  const deleteApt = (aptId) => {
    if (!confirm('Excluir agendamento?')) return;
    const all = storage.get('appointments') || [];
    storage.set('appointments', all.filter(a => a.id !== aptId));
    setAppointments(all.filter(a => a.id !== aptId));
  };

  return (
    <div style={{minHeight: '100vh', background: '#faf5ff', fontFamily: 'Arial'}}>
      <div style={{background: 'white', borderBottom: '4px solid #7c3aed', padding: '16px 24px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{fontSize: '36px'}}>🦜</div>
            <div>
              <h1 style={{margin: 0, fontSize: '24px', fontWeight: 'bold'}}>Life Colibri</h1>
              <p style={{margin: 0, fontSize: '12px', color: '#666'}}>Admin</p>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{fontSize: '24px'}}>{user.avatar}</div>
            <div style={{fontWeight: '600'}}>{user.name}</div>
            <button onClick={onLogout} style={{marginLeft: '12px', padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Sair</button>
          </div>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '24px'}}>
        <div style={{background: 'linear-gradient(to right, #7c3aed, #6d28d9)', color: 'white', padding: '32px', borderRadius: '16px', marginBottom: '24px'}}>
          <h2 style={{margin: 0}}>Painel Administrativo 🛠️</h2>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px'}}>
          <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '28px', fontWeight: 'bold'}}>{Object.values(users).filter(u => u.role === 'medico').length}</div>
            <div style={{fontSize: '14px', color: '#666'}}>👨‍⚕️ Médicos</div>
          </div>
          <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '28px', fontWeight: 'bold'}}>{Object.values(users).filter(u => u.role === 'paciente').length}</div>
            <div style={{fontSize: '14px', color: '#666'}}>👤 Pacientes</div>
          </div>
          <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            <div style={{fontSize: '28px', fontWeight: 'bold'}}>{appointments.length}</div>
            <div style={{fontSize: '14px', color: '#666'}}>📅 Total</div>
          </div>
        </div>

        <div style={{background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '24px'}}>
          <h3>Usuários</h3>
          {Object.values(users).map(u => (
            <div key={u.id} style={{padding: '16px', background: '#f9fafb', borderRadius: '8px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                <div style={{fontSize: '32px'}}>{u.avatar}</div>
                <div>
                  <div style={{fontWeight: 'bold'}}>{u.name}</div>
                  <div style={{fontSize: '14px', color: '#666'}}>{u.email}</div>
                  <div style={{fontSize: '12px', padding: '2px 8px', background: u.role === 'admin' ? '#e9d5ff' : u.role === 'medico' ? '#dbeafe' : '#d1fae5', display: 'inline-block', borderRadius: '6px', marginTop: '4px'}}>{u.role}</div>
                </div>
              </div>
              <div style={{display: 'flex', gap: '8px'}}>
                <button onClick={() => { setEditForm(u); setEditUser(u.id); }} style={{padding: '6px 12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Editar</button>
                {u.role !== 'admin' && <button onClick={() => deleteUser(u.id)} style={{padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Excluir</button>}
              </div>
            </div>
          ))}
        </div>

        <div style={{background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
          <h3>Agendamentos</h3>
          {appointments.map(apt => (
            <div key={apt.id} style={{padding: '12px', background: '#f9fafb', borderRadius: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <div style={{fontWeight: 'bold'}}>{apt.patientName} → {apt.doctorName}</div>
                <div style={{fontSize: '14px', color: '#666'}}>{apt.day} às {apt.time}</div>
              </div>
              <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                <div style={{padding: '4px 12px', background: apt.status === 'agendado' ? '#fed7aa' : apt.status === 'concluido' ? '#d1fae5' : '#fee2e2', borderRadius: '12px', fontSize: '12px'}}>{apt.status}</div>
                <button onClick={() => deleteApt(apt.id)} style={{padding: '4px 8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'}}>Excluir</button>
              </div>
            </div>
          ))}
        </div>

        {editUser && (
          <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
            <div style={{background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '90%'}}>
              <h3>Editar Usuário</h3>
              <div style={{marginBottom: '16px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>Nome</label>
                <input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} style={{width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '8px'}} />
              </div>
              <div style={{marginBottom: '16px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>Email</label>
                <input value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} style={{width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '8px'}} />
              </div>
              <div style={{display: 'flex', gap: '8px'}}>
                <button onClick={saveUser} style={{flex: 1, padding: '12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Salvar</button>
                <button onClick={() => setEditUser(null)} style={{flex: 1, padding: '12px', background: '#d1d5db', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeData();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e9d5ff, #fce7f3)'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '80px', marginBottom: '16px'}}>🦜</div>
          <div style={{fontSize: '24px', fontWeight: 'bold'}}>Life Colibri</div>
          <div style={{color: '#666'}}>Carregando...</div>
        </div>
      </div>
    );
  }

  if (!user) return <LoginPage onLogin={setUser} />;
  if (user.role === 'paciente') return <PacienteDashboard user={user} onLogout={() => setUser(null)} />;
  if (user.role === 'medico') return <MedicoDashboard user={user} onLogout={() => setUser(null)} />;
  if (user.role === 'admin') return <AdminDashboard user={user} onLogout={() => setUser(null)} />;

  return null;
};

export default App;
