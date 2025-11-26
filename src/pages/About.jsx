import React from 'react';
import '../styles/About.css';

export default function About() {
  return (
    <div className="about-bg">
      <div className="about-card">
        <h1 className="about-title">Добро пожаловать!</h1>
        <p className="about-text">
          Это информация обо мне:  
          Я студентка КБТУ, 4 курс ШИТиИ.
        </p>

        <div className="contacts">
          <h2 className="contacts-title">Персональная информация для связи</h2>
          <ul className="contacts-list">
            <li>Email: a_zhalgaspayeva@kbtu.kz</li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/Zhalgaspayeva"
                target="_blank"
                rel="noreferrer"
              >
                Zhalgaspayeva
              </a>
            </li>
            <li>Telegram: @zhlgspv</li>
          </ul>
        </div>
      </div>
    </div>
  );
}