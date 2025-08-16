import { useState, useEffect } from 'react';

import api from '../api';

// const api = api;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get();
        setUser(res.data);
        setName(res.data.first_name || '');
        setEmail(res.data.email);
        setPreview(res.data.photo || '');
      } catch (error) {
        setMsg('Could not load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('first_name', name);
    form.append('email', email);
    if (photo) form.append('photo', photo);

    await api.post('/profile/', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    setMsg('Saved');
  };

  if (!user) return <p>Loading…</p>;

  return (
    <div className="profile">
      <h2>My Profile</h2>

      <form onSubmit={handleSave}>
        {/* Photo */}
        <label>
          Photo
          <input type="file" accept="image/*" onChange={e => {
            setPhoto(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }} />
        </label>
        {preview && <img src={preview} alt="Preview" className="photo-preview" />}

        {/* Name */}
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>

        {/* Email */}
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>

        <button type="submit">Save</button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
}