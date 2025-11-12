import {useState} from "react";

export function Tareas({tareaInput, completadaInput}) {

    const [completada, setCompletada] = useState(completadaInput)

    const handleCompletar = () => {
        setCompletada(!completada)
    }

    return (

        <div className="tarea-tarjeta">
            <p className="tarea-tarjeta-titulo">{tareaInput}</p>

            {completada ? "✅" : "❌"}

            <button className="tarea-tarjeta-boton" onClick={handleCompletar}>
                {
                    completada
                        ? "Deshacer tarea"
                        : "Completar tarea"
                }
            </button>
        </div>
    )


}