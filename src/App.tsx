import { useEffect, useState } from 'react'
import './App.css'

const priorityColors: { [key: number]: string } = {
  0 : '#ffffff',
  1 : '#ffd7b5',
  2 : '#ffb38a',
  3 : '#ff9248',
  4 : '#ff6700',
}

function App() {

  const [selectedTaskId, setSelectTaskId] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [tasks, setTasks] = useState(null)
  const [selectBoardId, setSelectBoardId] = useState(null)

  useEffect(() => {
    fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
      headers: {
        'api-key': ''
      }
    })
    .then(res => res.json())
    .then(json => {setTasks(json.data)})
  }, [])

  useEffect(() => {
    if(!selectedTaskId){
      return
    }

    fetch(`https://trelly.it-incubator.app/api/1.0/boards/${selectBoardId}/tasks/${selectedTaskId}`, {
                  headers: {
                    'api-key': ''
                  }
                })
                .then(res => res.json())
                .then(json => {setSelectedTask(json.data)})
  }, [selectedTaskId])

  if (tasks === null) {
    return (
      <div>
        <h1>Список задач</h1>
        <span>Загрузка...</span>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div>
        <h1>Список задас</h1>
        <span>Задачи отсутствуют</span>
      </div>
    )
  }


  return (
    <>
      <h1>Список задач</h1>
      <button onClick={() => {
        setSelectTaskId(null)
        setSelectedTask(null)
        }}>Сбросить выделение</button>
      <div style={{display: 'flex', gap: '20px'}}>
      <ul>
        {tasks.map((task) => {
          return(
            <li key={task.id}>
              <div className='taskBox' onClick={() => {
                setSelectTaskId(task.id),
                setSelectBoardId(task.attributes.boardId)
              }
            }
                  style={
                    { backgroundColor: priorityColors[task.attributes.priority], 
                      border: task.id === selectedTaskId ? '6px solid blue' : '6px solid black'}
                  }>
                <div className='title'>
                <h2>Заголовок: </h2> 
                <p style={
                  {textDecoration: task.attributes.status ? 'line-through' : 'none'}
                  }>{task.attributes.title}
                </p>
                </div>
                <h2>Статус: <input id='inputChecked' type="checkbox" defaultChecked={task.attributes.status === 2}/></h2>
                <div className='title'>
                  <h2>Дата создания задачи:</h2> 
                  <p>{new Date(task.attributes.addedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <div>
        <h2>Task ditail</h2>
        {!selectedTaskId && !selectedTask && <span>"Not ditails"</span>}
        {((selectedTaskId && !selectedTask) || (selectedTask && selectedTaskId !== selectedTask.id))  && <span>Loading...</span>}
        {selectedTask && selectedTaskId === selectedTask.id && (
          <div>  
              <ul style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <li>Title: {selectedTask.attributes.title}</li>
                <li>BoardTitle: {selectedTask.attributes.boardTitle}</li>
                <li>Description: {selectedTask.attributes.description}</li>
              </ul>
          </div>)}
      </div>
      </div>
      
    </>
  )
}

export default App
