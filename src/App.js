import './App.css';
import TodoList from './TodoList'
import {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap-icons/font/bootstrap-icons.css";
import uuid from "react-uuid";
import axios from "axios";


function App() {
    const [lists, setLists] = useState([{id: 1, title:"Grocery"}, {id: 2, title:"Reminders"} ])
    const [tasks, setTasks] = useState([{id: 1, title: "eggs", completed: 1, list_id: 1}, {id: 2, title: "homework", completed: 1, list_id: 2}, {id: 3, title: "milk", completed: 0, list_id: 1}, {id: 4, title: "shopping", completed: 0, list_id: 2}])
    const [active, setActive] = useState()
    const [newList, setNewList] = useState("");
    const [newTask, setNewTask] = useState("")

    useEffect(() => {
        document.title = "Task Manager"
        axios.get('https://task-manager-react-1.herokuapp.com/api/list').then((response) => {
            setLists(response.data)
        })
        axios.get('https://task-manager-react-1.herokuapp.com/api/task').then((response) => {
            setTasks(response.data)
        })
    }, [])

    const handleChangeList = (list_id) => {
        setActive(list_id)
    }

    const handleNewList = (e) => {
        e.preventDefault()
        const id = uuid()
        axios.post('https://task-manager-react-1.herokuapp.com/api/list/add', {
            id: id,
            title: newList
        }).then(() => {
            setLists(prevLists => [...prevLists, {
                id: id,
                title: newList
            }] )
            setNewList("")
            setActive(id)
        })
    }

    const handleNewTask = (e) => {
        e.preventDefault()
        const id = uuid()
        axios.post('https://task-manager-react-1.herokuapp.com/api/task/add', {
            id: id,
            title: newTask,
            list_id: active
        }).then(() => {
            setTasks(prevState => [...prevState, {
                id: id,
                title: newTask,
                completed: 0,
                list_id: active
            }])
            setNewTask("")
        })

    }

    const handleDeleteTask = (id) => {
        axios.delete(`https://task-manager-react-1.herokuapp.com/api/task/delete/${id}`).then(() => {
            const filteredTasks = tasks.filter(item => item.id !== id)
            setTasks(filteredTasks)
        })

    }

    const handleDeleteList = (id) => {
        axios.delete(`https://task-manager-react-1.herokuapp.com/api/list/delete/${id}`).then(() => {
            const filteredLists = lists.filter(item => item.id !== id)
            setLists(filteredLists)
            const filteredTasks = tasks.filter(item => item.list_id !== id)
            setTasks(filteredTasks)
        })

    }
    const handleCheckbox = (task) => {
        axios.post(`https://task-manager-react-1.herokuapp.com/api/task/update/${task.id}`, {
            title: task.title,
            completed: !task.completed
        }).then(() => {
            const newState = tasks.map(obj => {
                if (obj.id === task.id) {
                    return {...obj, completed: !obj.completed};
                }
                return obj;
            });
            setTasks(newState);
        })
    }

    const handleDeleteComplete = (id) => {
        axios.delete(`https://task-manager-react-1.herokuapp.com/api/complete/delete/${id}`).then(() => {
            axios.get('https://task-manager-react-1.herokuapp.com/api/task').then((response) => {
                setTasks(response.data)
            })
        })
    }

    return (
        <div className="App">
            <div className="row">
                <div className="col-4 left p-5">
                    <h1 className="display-5"><i className="bi bi-journal-check me-1"></i>Task Manager</h1>
                    <hr/>
                    <form className="pb-3 mt-4" onSubmit={handleNewList}>
                        <div className="input-group">
                            <input required className="form-control" type="text" placeholder="New List" value={newList} onChange={(e) => {setNewList(e.target.value)}}></input>
                            <button className="btn btn-success" type="submit"><i className="bi bi-pencil-fill"></i></button>
                        </div>
                    </form>
                    <div className="d-grid gap-2">
                        {lists.map((obj) => {
                            return <button key={obj.id} className={active === obj.id ? "btn btn-dark" : "btn btn-light" } onClick={() => handleChangeList(obj.id)}>{obj.title}
                                <span className={active === obj.id ? "badge text-bg-light ms-2" : "badge text-bg-dark ms-2" }>{tasks.filter(task => {
                                    if(task.list_id === obj.id){
                                        return true
                                    }
                                }).length}</span></button>
                        })}
                    </div>
                </div>
                <div className="col-8 right p-5">
                    {lists.map((obj) => {
                        if(obj.id === active) {
                            return <TodoList key={obj.id} list={obj} tasks={tasks} active={active} handleChangeList={handleChangeList} newTask={newTask} setNewTask={setNewTask} handleNewTask={handleNewTask} handleDeleteTask={handleDeleteTask} handleDeleteList={handleDeleteList} handleCheckbox={handleCheckbox} handleDeleteComplete={handleDeleteComplete}/>
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
