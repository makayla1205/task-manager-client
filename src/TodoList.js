import TodoTask from "./TodoTask";
function TodoList({list, tasks, active, newTask, setNewTask, handleNewTask, handleDeleteTask, handleDeleteList, handleCheckbox, handleDeleteComplete}){
    return(
        <div className="ms-5 me-5">
            <div className="hstack">
                <h1 className="display-5">{list.title}</h1>
                <div className="dropdown ms-3">
                    <button className="btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-three-dots"></i></button>
                    <ul className="dropdown-menu">
                        <li><button onClick={() => handleDeleteList(list.id)} className="dropdown-item" type="button">Delete List</button></li>
                        <li><button onClick={() => handleDeleteComplete(list.id)} className="dropdown-item" type="button">Clear Completed Tasks</button></li>
                    </ul>
                </div>
            </div>
            <form className="mt-3" onSubmit={handleNewTask}>
                <div className="input-group">
                    <input required className="form-control" type="text" placeholder="New Task" value={newTask} onChange={(e) => {setNewTask(e.target.value)}}></input>
                    <button className="btn btn-success" type="submit"><i className="bi bi-plus-square-fill"></i></button>

                </div>
            </form>
            {active === list.id ? <TodoTask list_id={list.id} tasks={tasks} handleDeleteTask={handleDeleteTask} handleCheckbox={handleCheckbox}/> : null}
        </div>

    )
}

export default TodoList;