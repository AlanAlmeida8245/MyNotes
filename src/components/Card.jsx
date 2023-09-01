import Note from "../../src/assets/Icons/note.png";
import Delete from "../../src/assets/Icons/delete.png"
import Edit from "../assets/Icons/edit.png"
import "../App.css";
import { Link } from "react-router-dom";
import Olho from "../assets/Icons/211661_eye_icon.png"
import {BsFillTrash3Fill} from "react-icons/bs"
import {FaEye} from "react-icons/fa"
import {BiSolidCommentEdit} from "react-icons/bi"

export default function Card({id, titulo, texto, handleremove, OpenEdit}) {
  
  return (
    <div className="card">
          
        <div className="icons">
            <BsFillTrash3Fill className="iconsa" onClick={() => handleremove(id)} />
            <Link to={`/nota/${id}`}><FaEye className="iconsa" /></Link>
            <a href="#"><BiSolidCommentEdit className="iconsa" onClick={() => OpenEdit(id, texto, titulo)}/></a>
        </div>
      
      <div className="note-info">
            <h1>{titulo}</h1>
            <p>{texto}</p>
      </div>
     
    </div>
  );
}
