import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"
import { Link } from "react-router-dom";

export default function Note() {
  const { id } = useParams();
  const [Note, setNote] = useState([]);

  const getNote = async () => {
    try {
      const response = await axios.get(`https://back-end-alanalmeida8245.vercel.app/nota/${id}`);
      setNote(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="note-page">
        <Link to={"/"}><button className="btn-back">Voltar</button></Link>
      <h1>{Note.titulo}</h1>
      <b>{Note.texto}</b>
    </div>
  );
}
