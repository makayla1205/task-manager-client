function TodoTask({list_id, tasks, handleCheckbox, handleDeleteTask}){
    return (
        <ul className="list-group mt-3">

            {tasks.sort((a,b) => a.completed > b.completed).map((obj) => {
                if(obj.list_id === list_id){
                    return <li key={obj.id} className="list-group-item">
                        <input className="form-check-input me-1 mt-2" onChange={() => handleCheckbox(obj)} type="checkbox" checked={obj.completed}/>
                        <label className="form-check-label me-1 fs-5">{obj.title}</label>
                        <div className="btn-group float-end">
                            <button onClick={() => handleDeleteTask(obj.id)} className="btn btn-danger btn-sm"><i className="bi bi-trash-fill"></i></button>
                        </div>
                    </li>
                }
            })}
        </ul>
    )
}
export default TodoTask;