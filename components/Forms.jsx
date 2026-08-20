'use client';
import { useState } from 'react';

export function NewsletterForm({ dict }) {
  const [ok, setOk] = useState(false);
  const [email, setEmail] = useState('');
  if (ok) return <div className="form-ok">{dict.home.newsOk}</div>;
  return (
    <form
      className="inline-form"
      onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setOk(true); }}
    >
      <input
        className="input"
        type="email"
        required
        placeholder={dict.home.newsPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-ink">{dict.home.newsCta}</button>
    </form>
  );
}

export function ContactForm({ dict }) {
  const [ok, setOk] = useState(false);
  if (ok) return <div className="form-ok">{dict.contact.ok}</div>;
  return (
    <form
      style={{ display: 'grid', gap: 18 }}
      onSubmit={(e) => { e.preventDefault(); setOk(true); }}
    >
      <div className="field">
        <label htmlFor="cf-name">{dict.contact.name}</label>
        <input id="cf-name" className="input" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">{dict.home.newsPlaceholder}</label>
        <input id="cf-email" className="input" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="cf-msg">{dict.contact.message}</label>
        <textarea id="cf-msg" className="input" rows={5} required />
      </div>
      <button className="btn btn-primary" style={{ justifySelf: 'start' }}>{dict.contact.send}</button>
    </form>
  );
}
