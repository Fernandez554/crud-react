import { isEmpty, size } from "lodash";
import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState(null);
  const addTask = (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("valor vacio");
      return;
    }

    const newTask = {
      id: Math.random(1, 1000),
      name: task,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const editTask = (theTask) => {
    setTask(theTask.name);
    setEditMode(true);
    setId(theTask.id);
  };

  const saveTask = (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("valor vacio");
      return;
    }
    const editedTasks = () => tasks.map(item => item.id === id ? {id , name : task} : item)
    setTasks(editedTasks)

    setEditMode(false)
    setId("");
    setTask("");
  };

  const cancelEdit = () => {
    setEditMode(false)
    setId("");
    setTask("");
  }
  return (
    <div className="h-screen w-screen">
      <div className="flex justify-center ">
        <div className="w-full mx-5 p-5 md:w-2/3">
          <h1 className="text-4xl">Tareas</h1>

          <div className="flex flex-col md:flex-row mt-5">
            <div className="w-full md:w-2/3 m-2">
              <h2 className="text-xl text-center">Lista de tareas</h2>
              <hr className="mt-2" />
              {size(tasks) > 0 ? (
                tasks.map((task) => (
                  <div
                    className="grid grid-cols-3 p-2 border border-b-1"
                    key={task.id}
                  >
                    <div className="col-span-2 truncate">{task.name}</div>
                    <div className="flex flex-row">
                      <button
                        className="text-md bg-yellow-500  px-1"
                        onClick={() => editTask(task)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-md bg-red-500 text-white px-1 ml-2"
                        onClick={() => deleteTask(task.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-center  mt-2">
                  Aún no hay tareas programadas
                </h1>
              )}
            </div>
            <div className="w-full md:w-1/3 m-2">
              <h2 className="text-xl  text-center">
                {!editMode ? "Agregar Tarea" : "Modificar Tarea"}
              </h2>
              <form onSubmit={ editMode ? saveTask : addTask  }>
                <input
                  type="text"
                  className="p-1 w-full border border-gray-300 mt-2"
                  placeholder="Ingrese la tarea"
                  onChange={(text) => setTask(text.target.value)}
                  value={task}
                />
                <button className="bg-black text-white w-full text-center py-2 mt-2">
                  {!editMode ? "Agregar +" : "Guardar"}
                </button>
                {editMode && (
                  <button className="bg-gray-200  w-full text-center py-2 mt-2" onClick={()=> cancelEdit} >
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
