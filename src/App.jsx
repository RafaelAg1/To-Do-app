import './App.css'
import {Tareas} from "./components/Tareas.jsx";
import {useEffect, useState} from "react";

function App() {
    const [creando, setCreando] = useState(false)
    const [titulo, setTitulo] = useState("")
    const [completada, setCompletada] = useState(false)
    const [tareas, setTareas] = useState(() => {
        const tareasLocalStorage = window.localStorage.getItem('tareas')
        if (tareasLocalStorage) {
            return JSON.parse(tareasLocalStorage)
        } else {
            return []
        }
    })

    useEffect(() => {
        const nuevaTarea = [...tareas]
        window.localStorage.setItem('tareas', JSON.stringify(nuevaTarea))


    }, [tareas]);
    const crearTarea = () => {
        setCreando(!creando)
    }
    const nuevaTarea = () => {
        const nuevaTarea = {
            id: titulo,
            titulo: titulo,
            completada: completada
        }

        setTareas(anterior => [...anterior, nuevaTarea])
        setTitulo("")
        setCompletada(false)
        setCreando(false)

    }

    const borrarTareas = () => {
        setTareas([])
        window.localStorage.removeItem('tareas')

    }
    return (
        <div className="app-tarea">
            <h1 className="app-tarea-titulo">Lista de tareas</h1>
            <div className="app-tarea-botones">
                <button className="app-tarea-boton-crear" onClick={crearTarea}>Crear tarea</button>
                <button className="app-tarea-boton-borrar" onClick={borrarTareas}>Borrar Tareas</button>
            </div>
            {
                creando
                    ?
                    <div className="app-tarea-crear">
                        <input type='text' placeholder="Introduce el titulo..."
                               onChange={e => setTitulo(e.target.value)}
                               value={titulo}
                               onKeyUp={(event) => {
                                   if (event.key === 'Enter') {
                                       nuevaTarea()
                                   }
                               }}

                        >
                        </input>
                        <button className='app-tarea-crear-boton'

                                onClick={() => {
                                    nuevaTarea()
                                }}>
                            Añadir a mis tareas
                        </button>
                    </div>
                    : ""
            }
            <div className='app-tarea-lista'>
                {tareas
                    ? tareas.map((tarea) => (
                        <Tareas
                            key={tarea.id}
                            tareaInput={tarea.titulo}
                            completadaInput={tarea.completada}
                        />

                    ))
                    : <p>No tienes tareas aun</p>
                }
            </div>
        </div>
    )
}

export default App
