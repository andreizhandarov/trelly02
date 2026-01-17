import { useEffect, useState } from 'react'
import './App.css'

// const tasks = [
//   {
//     id: 1,
//     title: "Купить продукты на неделю",
//     isDone: false,
//     addedAt: "1 сентября",
//     priority: 2,
//   },
//   {
//     id: 2,
//     title: "Полить цветы",
//     isDone: true,
//     addedAt: "2 сентября",
//     priority: 0,
//   },
//   {
//     id: 3,
//     title: "Сходить на тренировку",
//     isDone: false,
//     addedAt: "3 сентября",
//     priority: 1,
//   },
//   {
//     id: 4,
//     title: "Срочно отправить рабочий отчет",
//     isDone: false,
//     addedAt: "4 сентября",
//     priority: 4,
//   },
//   {
//     id: 5,
//     title: "Заплатить за коммунальные услуги",
//     isDone: false,
//     addedAt: "3 сентября",
//     priority: 3,
//   },
// ]

const priorityColors: { [key: number]: string } = {
  0 : '#ffffff',
  1 : '#ffd7b5',
  2 : '#ffb38a',
  3 : '#ff9248',
  4 : '#ff6700',
}

// const tasks = [];
// const tasks = null;

function App() {

  const [selectedTaskId, setSelectTaskId] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [tasks, setTasks] = useState(null)

  useEffect(() => {
    fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
      headers: {
        'api-key': ''
      }
    })
    .then(res => res.json())
    .then(json => {setTasks(json.data)})
  }, [])

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

                fetch(`https://trelly.it-incubator.app/api/1.0/boards/${task.attributes.boardId}/tasks/${task.id}`, {
                  headers: {
                    'api-key': ''
                  }
                })
                .then(res => res.json())
                .then(json => {setSelectedTask(json.data)})
              }}
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
        {selectedTask === null ? ('Not ditails') : (
            <ul style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <li>Title: {selectedTask.attributes.title}</li>
              <li>BoardTitle: {selectedTask.attributes.boardTitle}</li>
              <li>Description: {selectedTask.attributes.description}</li>
            </ul>
        )}
      </div>
      </div>
      
    </>
  )
}

export default App
