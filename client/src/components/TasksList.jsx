import { useEffect, useState } from 'react'; // sirve para ejecutar código cuando el componente se monta o se desmonta y el segundo para manejar el estado de las tareas
import { getAllTasks } from '../api/tasks.api';
import { TaskCard } from './TaskCard';

export function TasksList() {
    const [tasks, setTasks] = useState([]); // estado inicial de las tareas es un array vacío

    useEffect(() => { // se ejecuta cuando el componente se monta o se desmonta
        async function loadTasks() {
            const res = await getAllTasks();
            setTasks(res.data);
        }
        loadTasks();
    }, []);

  return <div>
    {tasks.map((task) => ( // recorre el array de tareas y por cada tarea muestra un div con el título y la descripción
            <TaskCard key={task.id} task={task}/>
        ))}
        </div>;
}
