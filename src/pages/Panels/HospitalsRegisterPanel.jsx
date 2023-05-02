import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HospitalsResultsTable from "../../components/HospitalsResultsTable";
import clienteAxios from "../../config/axios";

export default function HospitalsRegisterPanel() {
  //Variable para obtener la ruta actual y realizar validaciones en las vistas
  const location = useLocation();

  //States para recoger la informacion de los inputs
  const [hospitalIdRef, setHospitalIdRef] = useState("");
  const [hospitalNameRef, setHospitalNameRef] = useState("");
  const [hospitalAddressRef, setHospitalAddressRef] = useState("");
  const [hospitalCityRef, setHospitalCityRef] = useState("");
  const [hospitalDepartmentRef, setHospitalDepartmentRef] = useState("");
  const [hospitalCountryRef, setHospitalCountryRef] = useState("");

  //States para guardar los datos de "obtenerHospitales" Axios
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);

  //Funcion para solicitar la info a la API
  const obtenerHospitales = async () => {
    try {
      setLoadingHospitals(true);
      const { data } = await clienteAxios("/api/hospital_information");
      setHospitals(data);
      setLoadingHospitals(false);
    } catch (error) {
      console.log(Object.values(error.response.data.errors));
    }
  };

  //useEffect para ejecutar al menos una vez la solicitud a la API, cada vez que se visita la pagina
  useEffect(() => {
    obtenerHospitales();
  }, []);

  //Funcion para enviar el Formulario a traves de un boton y no por el form directamente
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Se guardan los datos que se recogieron en los states, y se pasan a objetos
    const datos = {
      hospital_id: hospitalIdRef,
      hospital_name: hospitalNameRef,
      hospital_address: hospitalAddressRef,
      hospital_city: hospitalCityRef,
      hospital_department: hospitalDepartmentRef,
      hospital_country: hospitalCountryRef,
    };

    //Try Catch para realizar la peticion y recoger los errores si los hubiese
    try {
      const respuesta = await clienteAxios.post(
        "/api/hospital_information",
        datos
      );
      swal({
        title: "Realizado",
        text: "Envio de formulario exitosamente",
        icon: "success",
        button: "Aceptar",
      });
    } catch (error) {
      swal({
        title: "Error",
        text: "Error en el envio del formulario",
        icon: "error",
        button: "Aceptar",
      });
      console.log(Object.values(error.response.data.errors));
    }

    setHospitalIdRef("");
    setHospitalNameRef("");
    setHospitalAddressRef("");
    setHospitalCityRef("");
    setHospitalDepartmentRef("");
    setHospitalCountryRef("");

    obtenerHospitales();
  };

  //Return del HTML a mostrar
  return (
    <div className="">
      {/* Validacion con ternario para saber en que locacion estamos con useLocation y asi decidir que contenido se muestra */}
      {location.pathname === "/administrator/hospital_panel" ? (
        <>
          {/* Informacion que le aparece unicamente al rol de administrador */}
          {/* Contenedor de Form Registro Hospitales */}
          <div className="flex pt-3">
            <button
              type="button"
              className="bg-blue-500 text-2xl rounded-xl py-2 px-4 text-white font-semibold m-auto"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Agregar hospitales
            </button>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="bg-white shadow-xl rounded-md  px-5 py-10">
                  <h1 className="text-4xl font-black text-center mb-10">
                    Registra un nuevo Hospital
                  </h1>
                  {/* Form Registro Hospitales */}
                  <form
                    className="grid grid-cols-2"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Input para escribir el ID del hospital */}
                    <div className="mb-4 mx-3 mt-">
                      <label htmlFor="hospital_id">Hospital ID:</label>
                      <input
                        type="text"
                        id="hospital_id"
                        className="mt-2 w-full p-2 bg-slate-100 rounded-md"
                        name="hospital_id"
                        placeholder="Ingresa el ID del Hospital"
                        value={hospitalIdRef}
                        onChange={(e) => setHospitalIdRef(e.target.value)}
                        required
                      />
                    </div>
                    {/* Fin Input para escribir el ID del hospital */}
                    {/* Input para escribir el nombre del hospital */}
                    <div className="mb-4 mx-3">
                      <label htmlFor="hospital_name">
                        Nombre del Hospital:
                      </label>
                      <input
                        type="text"
                        id="hospital_name"
                        className="mt-2 w-full p-2 bg-slate-100 rounded-md"
                        name="hospital_name"
                        placeholder="Ingresa el nombre del Hospital"
                        value={hospitalNameRef}
                        onChange={(e) => setHospitalNameRef(e.target.value)}
                        required
                      />
                    </div>
                    {/* Fin Input para escribir el nombre del hospital */}
                    {/* Input para escribir la direccion del hospital */}
                    <div className="mb-4 mx-3">
                      <label htmlFor="hospital_address">Direccion:</label>
                      <input
                        type="text"
                        id="hospital_address"
                        className="mt-2 w-full p-2 bg-slate-100 rounded-md"
                        name="hospital_address"
                        placeholder="Ingresa la direccion del hospital, sin ciudad, ni departamento, ni país"
                        value={hospitalAddressRef}
                        onChange={(e) => setHospitalAddressRef(e.target.value)}
                        required
                      />
                    </div>
                    {/* Fin Input para escribir la direccion del hospital */}
                    {/* Input para escribir la ciudad del hospital */}
                    <div className="mb-4 mx-3">
                      <label htmlFor="hospital_city">Ciudad:</label>
                      <input
                        type="text"
                        id="hospital_city"
                        className="mt-2 w-full p-2 bg-slate-100 rounded-md"
                        name="hospital_city"
                        placeholder="Ingresa la ciudad del hospital"
                        value={hospitalCityRef}
                        onChange={(e) => setHospitalCityRef(e.target.value)}
                        required
                      />
                    </div>
                    {/* Fin Input para escribir la ciudad del hospital */}
                    {/* Input para escribir el departamento del hospital */}
                    <div className="mb-4 mx-3">
                      <label htmlFor="hospital_department">Departamento:</label>
                      <select
                        id="hospital_department"
                        className="mt-2 w-full p-2 bg-slate-100 rounded-md"
                        value={hospitalDepartmentRef}
                        onChange={(e) =>
                          setHospitalDepartmentRef(e.target.value)
                        }
                        required
                      >
                        <option value="--Default--" selected>
                          --Seleccione una opcion--
                        </option>
                        <option value="Ahuachapán" name="hospital_department">
                          Ahuachapán
                        </option>
                        <option value="Cabañas" name="hospital_department">
                          Cabañas
                        </option>
                        <option value="Chalatenango" name="hospital_department">
                          Chalatenango
                        </option>
                        <option value="Cuscatlán" name="hospital_department">
                          Cuscatlán
                        </option>
                        <option value="La Libertad" name="hospital_department">
                          La Libertad
                        </option>
                        <option value="Morazán" name="hospital_department">
                          Morazán
                        </option>
                        <option value="La Paz" name="hospital_department">
                          La Paz
                        </option>
                        <option value="Santa Ana" name="hospital_department">
                          Santa Ana
                        </option>
                        <option value="San Miguel" name="hospital_department">
                          San Miguel
                        </option>
                        <option value="San Salvador" name="hospital_department">
                          San Salvador
                        </option>
                        <option value="San Vicente" name="hospital_department">
                          San Vicente
                        </option>
                        <option value="Sonsonate" name="hospital_department">
                          Sonsonate
                        </option>
                        <option value="La Unión" name="hospital_department">
                          La Unión
                        </option>
                        <option value="Usulután" name="hospital_department">
                          Usulután
                        </option>
                      </select>
                    </div>
                    {/* Fin Input para escribir el departamento del hospital */}
                    {/* Input para escribir el pais del hospital */}
                    <div className="mb-4 mx-3">
                      <label htmlFor="hospital_country">País:</label>
                      <select
                        id="hospital_country"
                        className="mt-2 w-full p-2 bg-slate-100 rounded-md"
                        value={hospitalCountryRef}
                        onChange={(e) => setHospitalCountryRef(e.target.value)}
                        required
                      >
                        <option value="--Default--" selected>
                          --Seleccione una opcion--
                        </option>
                        <option value="El Salvador" name="hospital_country">
                          El Salvador
                        </option>
                      </select>
                    </div>
                    {/* Fin Input para escribir el pais del hospital */}
                    <input
                      type="submit"
                      value="Crear Registro"
                      className="button-login text-3xl text-center text-white mt-4 font-bold cursor-pointer uppercase"
                    />
                  </form>
                  {/* Fin Form Registro Hospitales */}
                </div>
              </div>
            </div>
          </div>
          {/* Fin Contenedor de Form Registro Hospitales */}
          {/* Contendor de la tabla */}
          <div className=" bg-white rounded-2xl  container-info-citas overflow-auto my-3 sFHD:mx-20 sHD:mx-8">
            <h1 className="text-center font-bold text-3xl text-indigo-700 pt-5">
              Hospitales:
            </h1>
            {loadingHospitals ? (
              <h1 className="text-center text-4xl font-bold p-20">
                Cargando...
              </h1>
            ) : (
              <div className="flex align-items-center p-5 bg-white rounded-2xl container info-container">
                {/* Tabla */}
                <table className="table text-center align-middle">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Direccion</th>
                      <th scope="col">Ciudad</th>
                      <th scope="col">Departamento</th>
                      <th scope="col">País</th>
                      <th colSpan="2">Acciones</th>
                    </tr>
                  </thead>
                  {/* Cuerpo de la tabla que se genera por un map en un componente aparte */}
                  <tbody className="table-group-divider">
                    {hospitals.map((hospital) => (
                      <HospitalsResultsTable
                        key={hospital.id}
                        hospital={hospital}
                        hospitals={hospitals}
                      />
                    ))}
                  </tbody>
                  {/* Fin Cuerpo de la tabla que se genera por un map en un componente aparte */}
                </table>
                {/* Fin Tabla */}
              </div>
            )}
          </div>
          {/* Fin Contendor de la tabla */}
          {/* Fin Informacion que le aparece unicamente al rol de administrador */}
        </>
      ) : (
        <>
          {/* Informacion que le aparece a cualquiera que esta logeado */}
          <div className=" bg-white rounded-2xl my-5 container-info-citas overflow-auto mt-10 mx-20">
            <h1 className="text-center font-bold text-3xl text-indigo-700 pt-5">
              Hospitales:
            </h1>
            {loadingHospitals ? (
              <h1 className="text-center text-4xl font-bold p-20">
                Cargando...
              </h1>
            ) : (
              <div className="flex align-items-center p-5 bg-white rounded-2xl container info-container">
                {/* Tabla */}
                <table className="table text-center align-middle">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Direccion</th>
                      <th scope="col">Ciudad</th>
                      <th scope="col">Departamento</th>
                      <th scope="col">País</th>
                    </tr>
                  </thead>
                  {/* Cuerpo de la tabla que se genera por un map en un componente aparte */}
                  <tbody className="table-group-divider">
                    {hospitals.map((hospital) => (
                      <HospitalsResultsTable
                        key={hospital.id}
                        hospital={hospital}
                        hospitals={hospitals}
                      />
                    ))}
                  </tbody>
                  {/* Fin Cuerpo de la tabla que se genera por un map en un componente aparte */}
                </table>
                {/* Fin Tabla */}
              </div>
            )}
          </div>
          {/* Informacion que le aparece a cualquiera que esta logeado */}
        </>
      )}
    </div>
  );
}
