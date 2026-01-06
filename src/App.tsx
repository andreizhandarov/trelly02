import './App.css'

const tasks = [
  {
    id: 1,
    title: "Купить продукты на неделю",
    isDone: false,
    addedAt: "1 сентября",
    priority: 2,
  },
  {
    id: 2,
    title: "Полить цветы",
    isDone: true,
    addedAt: "2 сентября",
    priority: 0,
  },
  {
    id: 3,
    title: "Сходить на тренировку",
    isDone: false,
    addedAt: "3 сентября",
    priority: 1,
  },
  {
    id: 4,
    title: "Срочно отправить рабочий отчет",
    isDone: false,
    addedAt: "4 сентября",
    priority: 4,
  },
  {
    id: 5,
    title: "Заплатить за коммунальные услуги",
    isDone: false,
    addedAt: "3 сентября",
    priority: 3,
  },
]

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
      <ul>
        {tasks.map((task) => {
          return(
            <li key={task.id}>
              <div className='taskBox' style={{ backgroundColor: priorityColors[task.priority] }}>
                <div className='title'>
                <h2>Заголовок: </h2> <p className = {task.isDone === true ? 'textDecoration' : ''}>{task.title}</p>
                </div>
                <h2>Статус: <input id='inputChecked' type="checkbox" checked={task.isDone === true ? true : false}/></h2>
                <div className='title'>
                  <h2>Дата создания задачи:</h2> 
                  <p>{task.addedAt}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App
