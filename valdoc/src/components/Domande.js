import React, { useState, useEffect } from 'react';
import "./App.css";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; //libreria per importare l' alert più bello

function App() {
  const [valori, setValori] = useState([]);
  const [domande, setDomande] = useState([]);
  const navigate = useNavigate();
  
  const ottieni = () => {
    const url = "https://raw.githubusercontent.com/1Lg20/ValutazioneDocenti/main/domandeProf.json"
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setDomande(data);
        setValori(Array(data.length).fill("")); //LA SCRITTA DELLA VALUTAZIONE
      })
      .catch(error => {
        console.error('Errore durante il recupero delle domande:', error);
      });
  }

  useEffect(() => {
    ottieni();
  }, []);

  const votazione = (index, voto) => { // LA SCRITTA DELLA VALUTAZIONE
    setValori(prevValori => {
      const newValori = [...prevValori];
      newValori[index] = voto.target.value;
      return newValori;
    });
  };

  const ripristinaValutazioni = () => {
    setValori(Array(domande.length).fill("")); // LA SCRITTA DELLA VALUTAZIONE
    const rangeInputs = document.querySelectorAll('.val');
    rangeInputs.forEach((input, index) => {
      input.value = "";
    });
  };

  const inviaAlServer = () => {
    if (valori.includes("")) {
      Swal.fire({
        title: "Rispondi alle domande!",
        text: "Per favore, rispondi a tutte le domande prima di inviare.",
        icon: "warning"
      });
    } else {
      Swal.fire({
        title: "Valutazioni Inviate",
        icon: "success"
      });
      navigate("/ListaProf");
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 text-primary text-center mt-3 mb-3'> <h1>VALUTA IL DOCENTE</h1> </div>
      </div>

      {domande.map((domanda, index) => (
        <div key={index}>
          <div className='row'>
            <div className='col-12 text-left text-primary'><h5>Domanda {index + 1}:</h5></div>
          </div>
          <div className='row'>
            <div className='col-12 text-left text-light'><h3>{domanda.question}</h3></div>
          </div>
          <div className='row'>
            <div className='col-12 text-center mt-2'>
              <input className='val' type='range' min={1} max={5} step={1} onChange={(e) => votazione(index, e)} />
            </div>
          </div>
          <div className='row '>
            <div className='col-12 text-center text-primary mb-3'><h6>Valutazione: {valori[index]}</h6></div>
          </div>
        </div>
      ))}

      <div className='row'>
        <div className='col-6 text-center mb-5'>
          <button className='btn btn-secondary' onClick={ripristinaValutazioni}>Ripristina</button>
        </div>
        <div className='col-6 text-center mb-5'>
          <button className='btn btn-primary' onClick={inviaAlServer}>Invia al Server</button>
        </div>
      </div>
    </div>
  );
}

export default App;