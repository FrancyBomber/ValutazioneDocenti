import React, { useState, useEffect } from 'react';
import './App.css';
import xImage from './x.png';
import vImage from './v.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; //libreria per importare l' alert più bello

function ListaProf() {
  const url = 'https://raw.githubusercontent.com/1Lg20/ValutazioneDocenti/main/ProfJSON.json';
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);

  const ottieni = () => {
    const url = "https://raw.githubusercontent.com/1Lg20/ValutazioneDocenti/main/ProfJSON.json";

    fetch(url)
        .then((dati) => dati.json())
        .then((ris) => {
            setProfessors(ris);
        })
        .catch((error) => {
            console.error('Errore durante il recupero dei dati:', error);
        });
  };

  useEffect(() => {
    ottieni();
  }, []);

  const Valutare = () => {
    navigate("/Domande");
  };

  const resetValutazioni = () => {
    Swal.fire({
      title: "Valutazioni Resettate",
      icon: "info"
    });
  };

  const inviaValutazioni = () => {
    Swal.fire({
      title: "Valutazioni Inviate",
      icon: "success"
    });
    navigate("/Fine");
  };

  const esci = () =>{
    navigate("/");
  }

  return (
    <div className="App">
      <div className="container mt-5 text-center">
        <h1 className="text-primary">VALUTA I DOCENTI</h1>

        {professors.map((professore, index) => (
          <div className="row mt-3" key={index}>
            <div className="col-md-4 text-left fw-bold text-light"> {professore.nome} </div>
            <div className="col-md-4 text-center text-success fw-bold" >
              {professore.materie["Classe4L"].map((materia, index) => (
                <div key={index}>{materia}</div>
              ))}
            </div>
            <div className="col-md-4 text-right">
              <button className="btn btn-warning " onClick={Valutare}>VALUTA</button>            
            </div>
          </div>
        ))}

        <div className="row mt-3">
          <div className="col-4 text-center">
            <button className="btn btn-secondary mt-3 mb-5" onClick={resetValutazioni}>Ripristina</button>
          </div>
          <div className="col-4 text-center">
            <button className="btn btn-danger mt-3 mb-5" onClick={esci}>ESCI</button>
          </div>
          <div className="col-4 text-center">
            <button className="btn btn-primary mt-3 mb-5" onClick={inviaValutazioni}>Invia Valutazioni</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListaProf;