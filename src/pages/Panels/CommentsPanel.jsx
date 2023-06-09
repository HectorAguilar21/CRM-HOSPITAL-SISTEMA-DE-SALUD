import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clienteAxios from "../../config/axios";

export default function CommentsPanel() {
  //Variable para obtener la ruta actual y realizar validaciones en las vistas
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idComment = searchParams.get("id");

  //States para guardar los datos de "obtenerComentarios" Axios
  const [coments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  //States para guardar los datos de "obtenerComentario" Axios
  const [comment, setComment] = useState({});

  //Funcion para solicitar la info a la API
  const obtenerComentarios = async () => {
    try {
      setLoadingComments(true);
      const { data } = await clienteAxios(
        `/api/comment_appointment_information`
      );
      setComments(data);
      setLoadingComments(false);
    } catch (error) {
      console.log(Object.values(error.response.data.errors));
    }
  };

  //Funcion para solicitar la info a la API
  const obtenerComentario = async () => {
    try {
      const { data } = await clienteAxios(
        `/api/comment_appointment_information/${idComment}`
      );
      setComment(data);
    } catch (error) {
      console.log(Object.values(error.response.data.errors));
    }
  };

  //useEffect para ejecutar al menos una vez la solicitud a la API, cada vez que se visita la pagina
  useEffect(() => {
    obtenerComentario();
    obtenerComentarios();
  }, []);

  return (
    <div className=" bg-white rounded-2xl my-5 container-info-citas overflow-auto mt-10 mx-20">
      <h1 className="text-center font-bold text-3xl text-indigo-700 pt-5">
        Comentarios:
      </h1>
      {loadingComments ? (
        <h1 className="text-center text-4xl font-bold p-20">Cargando...</h1>
      ) : (
        <div className="flex align-items-center p-5 bg-white rounded-2xl container info-container">
          {/* Tabla */}
          <table className="table text-center align-middle">
            <thead>
              <tr>
                <th scope="col">Cita ID</th>
                <th scope="col">Doctor</th>
                <th scope="col">Comentario</th>
              </tr>
            </thead>
            {/* Cuerpo de la tabla que se genera por un map en un componente aparte */}
            <tbody className="table-group-divider">
              {coments.map(
                (comment) =>
                  idComment !== null &&
                  comment.comment_appointment_id == idComment && (
                    <tr key={comment.id}>
                      <td>{comment.comment_appointment_id}</td>
                      <td>{comment.comment_doctor_id}</td>
                      <td>{comment.comment_appointment}</td>
                    </tr>
                  )
              )}
            </tbody>
            {/* Fin Cuerpo de la tabla que se genera por un map en un componente aparte */}
          </table>
          {/* Fin Tabla */}
        </div>
      )}
    </div>
  );
}
