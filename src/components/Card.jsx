import Note from "../../src/assets/Icons/note.png";
import Delete from "../../src/assets/Icons/delete.png"
import Edit from "../assets/Icons/edit.png"
import "../App.css";
import { Link } from "react-router-dom";
import Olho from "../assets/Icons/211661_eye_icon.png"

export default function Card({id, titulo, texto, handleremove, OpenEdit}) {
  
  return (
    <div className="card">
          
        <div className="icons">
            <img src={Delete} alt="" onClick={() => handleremove(id)}/>
            <Link to={`/nota/${id}`}><img src={Olho} alt="" className="olho"/></Link>
            <a href="#"><img src={Edit} alt="" onClick={() => OpenEdit(id, texto, titulo)}/></a>
        </div>
      
      <div className="note-info">
            <h1>{titulo}</h1>
            <p>{texto}</p>
      </div>
     
    </div>
  );
}
