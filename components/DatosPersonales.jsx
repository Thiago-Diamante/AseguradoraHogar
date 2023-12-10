import { useState } from "react";
import { Link } from "react-router-dom";
import '/css/app.css'

function DatosPersonales() {
  const [userData, setUserData] = useState({
      nombre: "",
      apellido: "",
      edad: 0
  })
  const [formValid, setFormValid] = useState(false);

  const handleNombreChange = (e) => {
    setUserData({
      ...userData,
      nombre: e.target.value
    });
    validateForm();
  };
  
  const handleApellidoChange = (e) => {
    setUserData({
      ...userData,
      apellido: e.target.value
    });
    validateForm();
  };
  
  const handleEdadChange = (e) => {
    setUserData({
      ...userData,
      edad: e.target.value
    });
    validateForm();
  };
  
  const validateForm = () => {
    const { nombre, apellido, edad } = userData;
    const isValid = nombre.trim() !== "" && apellido.trim() !== "" && edad > 0;
    setFormValid(isValid);
  };

  return (
      <>
        <form className="formulario">
          <label htmlFor="nombre">Ingrese su nombre</label>
          <input className="entradas" type="text" id="nombre" required onChange={handleNombreChange}></input>

          <label htmlFor="apellido">Ingrese su apellido</label>
          <input className="entradas" type="text" id="apellido" required onChange={handleApellidoChange}></input>

          <label htmlFor="edad">Ingrese su edad</label>
          <input className="entradas" type="number" id="edad" min="18" max="130" required onChange={handleEdadChange}></input>
          {!formValid && (
          <p style={{ color: "red" }}>Por favor, complete todos los campos.</p>
          )}
          <button disabled={!formValid}><Link to={formValid ? "/seguro" : "#"}>Continuar</Link></button>
        </form>
      </>
  )
}

export default DatosPersonales