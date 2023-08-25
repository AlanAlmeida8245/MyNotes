

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Note from "./Note";
import App from "../App";

export default function RoutesPage()
{
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/nota/:id" element={<Note />}  />
                <Route path="/" element={<App />}  />
           
            </Routes>
        </BrowserRouter>
        </>
    )
}