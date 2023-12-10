import DatosPersonales from "./DatosPersonales";
import SegurosHogar from "./SegurosHogar";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";

function App(){
    return(
        <>
          <Header />
          <DatosPersonales />
          <Routes>
            <Route path="/seguro" element={<SegurosHogar />} />
          </Routes>
        </>
    )
}

export default App