import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, User, MessageSquare } from 'lucide-react';

function App() {
  const [persona, setPersona] = useState('hitesh');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Dynamic visual layout colors mapped explicitly to developer personas
  const currentTheme = persona === 'hitesh' 
    ? { primary: '#eab308', name: 'Hitesh Choudhary', mode: '☕ Chai aur Code Mode' }
    : { primary: '#38bdf8', name: 'Piyush Garg', mode: '🛡️ Production Systems Mode' };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: persona,
          history: messages,
          message: currentInput
        })
      });
      
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Handshake timeout. Check local service endpoint statuses.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'system-ui, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      
      {/* SIDEBAR NAVIGATION CONTROLS */}
      <div style={{ width: '280px', backgroundColor: '#1e293b', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px', borderRight: '1px solid #334155' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: currentTheme.primary, transition: 'color 0.3s' }}>MasterJi AI</h2>
        
        <button 
          onClick={() => { setPersona('hitesh'); setMessages([]); }}
          style={{ padding: '14px', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', backgroundColor: persona === 'hitesh' ? '#eab308' : '#334155', color: persona === 'hitesh' ? '#0f172a' : '#94a3b8', transition: 'all 0.2s' }}
        >
          🚀 Hitesh Choudhary
        </button>
        
        <button 
          onClick={() => { setPersona('piyush'); setMessages([]); }}
          style={{ padding: '14px', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', backgroundColor: persona === 'piyush' ? '#38bdf8' : '#334155', color: persona === 'piyush' ? '#0f172a' : '#94a3b8', transition: 'all 0.2s' }}
        >
          💻 Piyush Garg
        </button>

        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #334155' }}>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, lineHeight: '1.4' }}><strong>Context Isolation:</strong> Session context tracking arrays flush cleanly on persona toggles to protect identity boundaries.</p>
        </div>
      </div>

      {/* CORE DISPLAY WINDOW */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* APP CONTEXT TOP NAVBAR */}
        <div style={{ padding: '20px 24px', backgroundColor: '#1e293b', borderBottom: `2px solid ${currentTheme.primary}`, display: 'flex', alignItems: 'center', transition: 'border-color 0.3s' }}>
          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Active Engine: </span>
            <span style={{ color: '#fff', fontWeight: 'bold' }}>{currentTheme.name}</span>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: '0.85rem', backgroundColor: '#0f172a', padding: '6px 12px', borderRadius: '20px', color: currentTheme.primary, border: `1px solid ${currentTheme.primary}`, fontWeight: '600' }}>
            {currentTheme.mode}
          </div>
        </div>

        {/* MESSAGING AREA LOGS */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.length === 0 && (
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <MessageSquare size={48} style={{ color: currentTheme.primary, marginBottom: '12px', opacity: 0.7 }} />
              <p style={{ color: '#64748b' }}>Initialize conversation execution thread.</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                gap: '14px', 
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', 
                maxWidth: '80%',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justify: 'center', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: msg.sender === 'user' ? currentTheme.primary : '#334155', flexShrink: 0 }}>
                {msg.sender === 'user' ? <User size={18} color="#0f172a" /> : <span>{persona === 'hitesh' ? '🚀' : '💻'}</span>}
              </div>
              
              {/* FIXED LEFT-ALIGNED BUBBLE VIEW */}
              <div style={{ 
                padding: '14px 20px', 
                borderRadius: '12px', 
                backgroundColor: msg.sender === 'user' ? '#1e3a8a' : '#1e293b', 
                border: '1px solid #334155', 
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)',
                textAlign: 'left' // Explicit left-alignment fix for text scanning
              }}>
                <div style={{ color: '#e2e8f0', fontSize: '0.98rem', lineHeight: '1.6' }}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.9rem', paddingLeft: '52px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: currentTheme.primary, borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ width: '6px', height: '6px', backgroundColor: currentTheme.primary, borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ width: '6px', height: '6px', backgroundColor: currentTheme.primary, borderRadius: '50%', display: 'inline-block' }}></span>
              </div>
            </div>
          )}
        </div>

        {/* INTERACTIVE FORM INPUT BAR */}
        <form onSubmit={handleSend} style={{ padding: '24px', backgroundColor: '#1e293b', borderTop: '1px solid #334155', display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Query ${currentTheme.name}...`}
            style={{ flex: 1, padding: '14px 18px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#f8fafc', outline: 'none', fontSize: '0.98rem' }}
          />
          <button type="submit" style={{ padding: '0 24px', borderRadius: '8px', border: 'none', backgroundColor: currentTheme.primary, color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }} disabled={loading}>
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
}

export default App;