import React from 'react';

export default function ErrorBox({ message }) {
  return (
    <div style={{
      color: 'red',
      background: '#fee',
      padding: '10px',
      borderRadius: '5px',
      margin: '10px 0'
    }}>
      ⚠️ {message}
    </div>
  );
}