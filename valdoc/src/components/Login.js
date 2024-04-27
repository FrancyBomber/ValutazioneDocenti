import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Swal from 'sweetalert2'; //libreria per importare l' alert più bello
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = () => {
    const credentialsUrl = 'https://raw.githubusercontent.com/1Lg20/ValutazioneDocenti/main/Credenziali.json';

    fetch(credentialsUrl)
      .then(response => {
        if (!response.ok) {
          console.error("Errore! Il JSON non risponde ... !");
        }
        return response.json();
      })
      .then(credentials => {
        const user = credentials.find(
          cred => cred.username === email && cred.password === password
        );

        if (user) {
          successo_cred()
          navigate("/ListaProf");
        } else {
          errore_cred()
        }
      });
  };

  const successo_cred = () => { //funzione per l' alert
    Swal.fire({
      title: "Login Effettuato",
      text: "Email e Password CORRETTE!",
      icon: "success"
    });
  }

  const errore_cred = () => { //funzione per l' alert
    Swal.fire({
      title: "Errore",
      text: "Email o Password ERRATE!",
      icon: "error"
    });
  };

  const Reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <img className="img mt-5" src="https://scaling.spaggiari.eu/CNII0004/logo/83.png&rs=%2FtccTw2MgxYfdxRYmYOB6HjkoZcUOGTiYi6QRxuVV5sOGTp63rmnr%2BRTYVh7%2BFO%2FGwXtspJHA9p4BXfBXCcE%2BNfMTv1f63V8Ma7anOoEpmr1vY686jQADlCXWoD41fhLPKDeb5KzEXlN3xj5VLED2HK76ruGkCrzhAMWUaH%2BXdg%3D" alt="logo" />
        </div>
      </div>
      <div className="row">
        <div className="col text-primary mt-5 text-center">
          <h1 className='fw-bold'>VALUTAZIONE DOCENTI</h1>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col text-light">
          <h3>USERNAME:</h3>
        </div>
      </div>
      <div className="col mb-3">
        <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="row mb-3">
        <div className="col mt-3 text-light">
          <h3>PASSWORD:</h3>
        </div>
      </div>
      <div className="col mb-5">
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="row mt-3">
        <div className="col-md-6 text-center">
          <button className="btn btn-secondary mt-3" onClick={Reset}> Ripristina </button>
        </div>
        <div className="col-md-6 text-center">
          <button className="btn btn-primary mt-3" onClick={Login}> Login </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;