import React, { useState } from 'react';
import bottleImg from './assets/bottle.png';
import './App.css';

const presetDurations = [
  { label: '3 months', value: 3 * 30 },
  { label: '6 months', value: 6 * 30 },
  { label: '1 year', value: 365 },
  { label: '5 years', value: 5 * 365 },
  { label: '10 years', value: 10 * 365 },
];

function App() {
  const [letter, setLetter] = useState('Dear Future Me,\n');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customMonth, setCustomMonth] = useState('June');
  const [customDay, setCustomDay] = useState('1');
  const [customYear, setCustomYear] = useState('2026');
  const [status, setStatus] = useState('');

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    setCustomDate('');
    if (e.target.value) {
      const days = parseInt(e.target.value, 10);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);
      setDate(futureDate.toISOString().split('T')[0]);
    }
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const years = ["2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040"];

  const updateCustomDate = (month, day, year) => {
    const monthIndex = months.indexOf(month) + 1;
    const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
    const formattedDay = day.length === 1 ? `0${day}` : day;
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
    setCustomDate(dateStr);
    setDate(dateStr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    try {
      const res = await fetch('/.netlify/functions/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letter, email, date }),
      });
      
      if (res.ok) {
        setStatus('Your message has been scheduled! Check your email for confirmation.');
        setLetter('Dear Future Me,\n');
        setEmail('');
        setDate('');
        setDuration('');
        setCustomDate('');
      } else {
        const data = await res.json();
        setStatus(data.error || 'Error scheduling your message.');
      }
    } catch (error) {
      setStatus('Error connecting to server. Please try again.');
    }
  };

  return (
    <div className="main-bg">
      <div className="title">Message In a Bottle</div>
      <h2 className="heading">Write a letter to your future self</h2>
      <p className="subtext">
        <span style={{whiteSpace: 'nowrap'}}>
          You write. Pick a date. Send.{' '}
          <span style={{whiteSpace: 'nowrap'}}>That's literally it <span role="img" aria-label="smile">😊</span></span>
        </span>
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <textarea
          className="letter-box"
          value={letter}
          onChange={e => setLetter(e.target.value)}
          rows={8}
        />
        <div className="email-instruction">Make sure you get your letter</div>
        <input
          className="input"
          type="email"
          placeholder="Please enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {duration === '' ? (
          <div className="blue-box">
            <div className="date-row single-row" style={{display: 'flex', alignItems: 'center', width: '100%', padding: 0, background: 'transparent', border: 'none', marginBottom: '2px', justifyContent: 'space-between'}}>
              <div className="date-label">Deliver on</div>
              <div className="date-label right single-right" style={{whiteSpace: 'nowrap', marginLeft: 'auto'}}>
                Or choose a{' '}
                <span
                  className="date-bold date-link"
                  tabIndex={0}
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    setDuration('duration');
                    setCustomDate('');
                  }}
                >
                  duration
                </span>
              </div>
            </div>
            <div className="custom-date-row" style={{display: 'flex', alignItems: 'center', marginTop: '4px', marginBottom: '2px', gap: '12px'}}>
              <select
                className="date-input"
                value={customMonth}
                onChange={e => { setCustomMonth(e.target.value); updateCustomDate(e.target.value, customDay, customYear); }}
                style={{padding: '6px 12px', fontSize: '1rem', borderRadius: '6px', border: 'none', outline: 'none', background: '#fff', color: '#1a2eb8'}}
              >
                {months.map((m, idx) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                className="date-input"
                value={customDay}
                onChange={e => { setCustomDay(e.target.value); updateCustomDate(customMonth, e.target.value, customYear); }}
                style={{padding: '6px 12px', fontSize: '1rem', borderRadius: '6px', border: 'none', outline: 'none', background: '#fff', color: '#1a2eb8'}}
              >
                {days.map((d, idx) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                className="date-input"
                value={customYear}
                onChange={e => { setCustomYear(e.target.value); updateCustomDate(customMonth, customDay, e.target.value); }}
                style={{padding: '6px 12px', fontSize: '1rem', borderRadius: '6px', border: 'none', outline: 'none', background: '#fff', color: '#1a2eb8'}}
              >
                {years.map((y, idx) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="blue-box">
            <div className="date-row single-row" style={{display: 'flex', alignItems: 'center', width: '100%', padding: 0, background: 'transparent', border: 'none', marginBottom: 0, justifyContent: 'space-between'}}>
              <div className="date-label">Deliver in</div>
              <div className="date-label right single-right" style={{whiteSpace: 'nowrap', marginLeft: 'auto'}}>
                Or choose a{' '}
                <span
                  className="date-bold date-link"
                  tabIndex={0}
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    setDuration('');
                    setCustomDate('');
                  }}
                >
                  date
                </span>
              </div>
            </div>
            <div className="preset-options" style={{display: 'flex', gap: '24px', marginTop: '12px', justifyContent: 'flex-start'}}>
              {presetDurations.map((d, idx) => (
                <button
                  type="button"
                  key={d.label}
                  className={duration === String(d.value) ? "preset-btn active" : "preset-btn"}
                  onClick={() => {
                    setDuration(String(d.value));
                    setCustomDate('');
                    const days = parseInt(d.value, 10);
                    const futureDate = new Date();
                    futureDate.setDate(futureDate.getDate() + days);
                    setDate(futureDate.toISOString().split('T')[0]);
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <button className="submit-btn" type="submit">Send to Future Me</button>
      </form>
      {status && <div className="status">{status}</div>}
      <div className="info-section" style={{maxWidth: '700px', margin: '32px auto 0 auto', background: 'transparent', fontSize: '1.15rem', color: '#111', lineHeight: '2', textAlign: 'left'}}>
        <div><b>Message In a Bottle letters are great for…</b></div>
        <div style={{marginTop: '12px'}}>
          <div>❤️ Reliving memories in vivid detail</div>
          <div>📈 Acknowledging growth & achievements</div>
          <div>✅ Setting goals for the future</div>
          <div>😌 Decluttering your mind to find some headspace</div>
        </div>
      </div>
      <div className="art">
        <img src={bottleImg} alt="Message in a bottle" style={{width: '120px', height: 'auto'}} />
      </div>
    </div>
  );
}

// Add info section under main content box
// ...existing code...

export default App;
