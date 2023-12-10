import { useEffect, useState } from 'react'
import '/css/app.css'
import Swal from 'sweetalert2'

function SegurosHogar() {
  const [propiedades, setPropiedades] = useState([]);
  const [selectedPropiedad, setSelectedPropiedad] = useState('');
  const [ubicaciones, setUbicaciones] = useState([]);
  const [selectedUbicacion, setSelectedUbicacion] = useState('');
  const [metrosCuadrados, setMetrosCuadrados] = useState(20);
  const [cotizacion, setCotizacion] = useState(null);
  const [error, setError] = useState(null);
  const costoM2 = 35.82;

  useEffect(() => {
    fetch("./data.json/propiedades.json")
      .then(response => response.json())
      .then(propiedadesData => setPropiedades(propiedadesData))
      .catch(error => console.error('Error al solicitar propiedades: ', error));

    fetch("./data.json/ubicacion.json")
      .then(response => response.json())
      .then(ubicacionesData => setUbicaciones(ubicacionesData))
      .catch(error => console.error('Error al solicitar ubicacion: ', error));
  }, []);

  const handleCotizar = () => {
    if (!selectedPropiedad || !selectedUbicacion) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Datos incompletos...",
      });
      setError("Por favor, selecciona el tipo de propiedad y la ubicación.");
      return;
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cotizacion exitosa!",
      showConfirmButton: false,
      timer: 1500
    });
    const factorPropiedad = propiedades.find(item => item.tipo === selectedPropiedad)?.factor || 1;
    const factorUbicacion = ubicaciones.find(item => item.ubicacion === selectedUbicacion)?.factor || 1;

    const precioTotal = factorPropiedad * factorUbicacion * metrosCuadrados * costoM2;

    setError(null);
    setCotizacion(precioTotal);
  };

  return (
    <>
      <form className='formulario'>
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select
          className='entradas'
          id='propiedad' 
          value={selectedPropiedad}
          onChange={(e) => setSelectedPropiedad(e.target.value)}
        >
          <option value="" disabled>...</option>
          {propiedades.map(item => (
            <option key={item.tipo} value={item.tipo}>
              {item.tipo}
            </option>
          ))}
        </select>

        <label htmlFor="ubicacion">Selecciona su ubicación</label>
        <select
          className='entradas'
          id='ubicacion'
          value={selectedUbicacion}
          onChange={(e) => setSelectedUbicacion(e.target.value)}
        >
          <option value="" disabled>...</option>
          {ubicaciones.map(ubi => (
            <option key={ubi.ubicacion} value={ubi.ubicacion}>
              {ubi.ubicacion}
            </option>
          ))}
        </select>

        <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
        <input
          className='entradas'
          type="number"
          id="metros2"
          value={metrosCuadrados}
          min="20"
          max="500"
          onChange={(e) => setMetrosCuadrados(e.target.value)}
          required
        />
        
        {error && <p className='error'>{error}</p>}
        <button type="button" onClick={handleCotizar}>
          COTIZAR
        </button>
        {cotizacion !== null && (
          <div>
            <h2>Cotización:</h2>
            <p className='precioTotal'>{`Precio Total: $${cotizacion.toFixed(2)}`}</p>
          </div>
        )}
      </form>
    </>
  );
}

export default SegurosHogar