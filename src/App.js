import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [tipus, setTipus] = useState("comment");
 
  useEffect(() => {
    fetch("https://localhost:7231/" + tipus)
      .then((res) => (res.ok ? res.json() : []))
      .then((tartalom) => {
        setItems(tartalom)
      });
  }, [tipus]);
 
  return (
    <div className="container">
      <div className="row m-5 border p-5">
        <FormKomponens setTipus={setTipus} />
        <ListaKomponens elemek={items} />
      </div>
    </div>
  );
 }
 
 const FormKomponens = ({ setTipus }) => (
    <form
      className="w-100"
      onSubmit={(event) => {
        event.preventDefault();
        setTipus(event.target.elements.contentType.value);
      }}
    >
      <select
        name="contentType"
        className="form-control mb-2"
      >
        <option value="Comment">Kommentek</option>
        <option value="Post">Posztok</option>
      </select>
      <button
        className="btn btn-primary mb-2"
        type="submit"
      >
        Kiválaszt
      </button>
    </form>
 );
 
 const ListaKomponens = ({ elemek }) => (
  <ul>
    {elemek.map((elem) => (
      <li key={elem.id} className="list-group-item">
        {elem.body}
      </li>
    ))}
  </ul>
 );
 
export default App;
