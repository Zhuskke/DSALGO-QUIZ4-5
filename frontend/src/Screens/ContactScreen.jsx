import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../actions/userActions';

function ContactScreen() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const contact = useSelector(state => state.contact); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(name, email, message));
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {contact.loading && <p>Loading...</p>}
      {contact.error && <p>Error: {contact.error}</p>}
      {contact.success && <p>Form submitted successfully!</p>}
    </div>
  );
}

export default ContactScreen;