import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";

export default function SpecialitiesResultsTable(props) {
  //states para guardar los datos de "obtenerDoctores"
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  //State para guardar los datos de "obtenerHospitales"
  const [hospitalsSpecialities, setHospitalsSpecialities] = useState([]);
  const [loadingHospitals, setLoadingHosptials] = useState(false);

  //Funcion para obtener los datos de la API
  const obtenerDoctores = async () => {
    try {
      setLoadingDoctors(true);
      const { data } = await clienteAxios("/api/doctor_information");
      setDoctors(data);
      setLoadingDoctors(false);
    } catch (error) {
      console.log(Object.values(error.response.data.errors));
    }
  };

  //Funcion para obtener los datos de la API
  const obtenerHospitales = async () => {
    try {
      setLoadingHosptials(true);
      const { data } = await clienteAxios("/api/hospital_specialities");
      setHospitalsSpecialities(data);
      setLoadingHosptials(false);
    } catch (error) {
      console.log(Object.values(error.response.data.errors));
    }
  };

  //useEffect para ejecutar al menos una vez la solicitud a la API, cada vez que se visita la pagina
  useEffect(() => {
    obtenerHospitales();
    obtenerDoctores();
  }, []);

  //HTML a renderizar
  return (
    <tr>
      {/* Informaciion en la tabla */}
      <th scope="row">{props.specialities.speciality_id}</th>
      <td>{props.specialities.speciality_name}</td>
      {/* Listado de Doctores */}
      <td>
        {loadingDoctors ? (
          <h1 className="text-center text-2xl font-bold">Cargando...</h1>
        ) : (
          <ul>
            {doctors.map(
              (doctor, index) =>
                props.specialities.id !== null &&
                doctor.speciality_id == props.specialities.id && (
                  <li key={index}>{`♦ ${doctor.name} ${doctor.last_name}`}</li>
                )
            )}
          </ul>
        )}
      </td>
      {/* Fin Listado de Doctores */}
      {/* Listado de Hospitales */}
      <td>
        {loadingHospitals ? (
          <h1 className="text-center text-2xl font-bold">Cargando...</h1>
        ) : (
          <ul>
            {hospitalsSpecialities.map(
              (hospitalSpeciality, index) =>
                props.specialities.id !== null &&
                hospitalSpeciality.medical_speciality_information_id ==
                  props.specialities.id && (
                  <li
                    key={index}
                  >{`♦ ${hospitalSpeciality.hospital.hospital_name}`}</li>
                )
            )}
          </ul>
        )}
      </td>
      {/* Fin Listado de Hospitales */}
      {/* Fin Informaciion en la tabla */}
      {/* Botones para Acciones de tabla (Editar y Eliminar) */}
      {/* Validacion con ternario para saber en que locacion estamos con useLocation y asi decidir que contenido se muestra */}
      {location.pathname === "/administrator/specialties_panel" && (
        <>
          <td>
            <Link
              to={`/administrator/specialties_edit?id=${props.specialities.id}`}
              type="button"
              className="btn text-white bg-indigo-500 hover:bg-indigo-800"
            >
              Editar
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn text-white bg-red-500 hover:bg-red-700"
            >
              Eliminar
            </button>
          </td>
        </>
      )}
      {/* Fin Botones para Acciones de tabla (Editar y Eliminar) */}
    </tr>
  );
}
