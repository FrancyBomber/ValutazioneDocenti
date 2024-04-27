import { Routes, Route } from "react-router-dom";
import ListaProf from './components/ListaProf';
import Login from './components/Login'; 
import Domande from './components/Domande'
import Fine from "./components/Fine";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='listaprof' element={<ListaProf />}></Route>
      <Route path='domande' element={<Domande />}></Route>
      <Route path='fine' element={<Fine />}></Route>
    </Routes>
  );
}

export default App;