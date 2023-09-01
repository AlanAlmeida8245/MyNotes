import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import axios from "axios";

import Card from "./components/Card";
import RoutesPage from "./Pages/Routes";

function App() {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [Notes, setNotes] = useState([]);
  const [EditForm, setEditForm] = useState(false);
  const [editID, setEditID] = useState("");
  const [edittitulo, setEditTitulo] = useState("");
  const [edittexto, setEditTexto] = useState("");

  const createNote = async () => {
    if (titulo === "" || texto == "") return alert("preencha todos os campos");

    const response = await axios.post("https://back-end-alanalmeida8245.vercel.app/criar", {
      titulo: titulo,
      texto: texto,
    });
    console.log(response.data);
    const newNote = response.data.dados; // Obtenha a nova nota do servidor
    setNotes((prevNotes) => [...prevNotes, newNote]); // Adiciona a nova nota à matriz existente
    setShowForm(false);
    setTitulo("");
    setTexto("");
  };

  const EditNote = async (id) => {
    if (edittitulo === "" || edittexto == "")
      return alert("preencha todos os campos");

    try {
      const response = await axios.patch("https://back-end-alanalmeida8245.vercel.app/editar", {
        id: id,
        novotitulo: edittitulo,
        novotexto: edittexto,
      });
      getNotes();
      setEditForm(false);
      setEditTexto("");
      setEditTitulo("");
    } catch (error) {
      console.log(error);
    }
  };

  const getNotes = async () => {
    try {
      const response = await axios.get("https://back-end-alanalmeida8245.vercel.app/notas");
      setNotes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleShowForm = () => {
    setShowForm(!showForm);
    setEditForm(false);
  };
  const handleEditForm = (id, titulo, texto) => {
    setEditForm(!EditForm);
    setShowForm(false);
    setEditID(id);
    setEditTexto(texto);
    setEditTitulo(titulo);
    setTitulo(titulo);
  };

  const handleRemoveCard = async (cardId) => {
    try {
      const response = await axios.delete("https://back-end-alanalmeida8245.vercel.app/deletar", {
        data: {
          id: cardId,
        },
      });
      console.log(response.data);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="topo">
        <h1>MyNotes</h1>
        <p>Crie Notas, compartilhe pensamentos</p>
      </div>

      <section className="container-grid">
        <div className="DataSide">
          <div className="header">
            <h2>Crie um nova Nota</h2>
            <button className="btn-add" onClick={handleShowForm}>
              {showForm ? "Cancelar " : "Nova Nota"}
            </button>
          </div>
          {showForm && (
            <>
              <label htmlFor="">Titulo: </label>
              <div>
                <input
                  type="text"
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="ex: Roteiro para video"
                  className="inputTexto"
                />
              </div>
              <label htmlFor="">Texto: </label>
              <div>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => setTexto(e.target.value)}
                  placeholder="Digite o Texto da nota aqui"
                ></textarea>
              </div>
              <button onClick={createNote}>Criar Nota</button>
            </>
          )}

          {EditForm && (
            <>
              <div className="header" id="#">
                <h2>Editar Nota: {titulo}</h2>

                <button className="btn-closeEdit" onClick={handleEditForm}>
                  Cancelar
                </button>
              </div>
              <label htmlFor="" className="labelEdit">
                Novo Titulo:{" "}
              </label>
              <div>
                <input
                  type="text"
                  onChange={(e) => setEditTitulo(e.target.value)}
                  placeholder="ex: Roteiro para video"
                  className="inputTexto"
                  value={edittitulo}
                />
              </div>
              <label htmlFor="" className="labelEdit">
                Novo Texto:{" "}
              </label>
              <div>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => setEditTexto(e.target.value)}
                  placeholder="Digite o Texto da nota aqui"
                >
                  {edittexto}
                </textarea>
              </div>
              <button onClick={() => EditNote(editID)} className="btn-saveEdit">
                Salvar Alterações
              </button>
            </>
          )}
        </div>

        <div className="NotesSide">
          {Notes.length > 0 ? (
            Notes.map((note, index) => (
            
                <Card
                  titulo={note.titulo}
                  texto={note.texto}
                  key={index}
                  id={note._id}
                  handleremove={() => handleRemoveCard(note._id)}
                  OpenEdit={() =>
                    handleEditForm(note._id, note.titulo, note.texto)
                  }
                />
            
            ))
          ) : (
            <p className="txt">Não há notas disponíveis.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
