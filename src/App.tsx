import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type TaskStatus = 'todo' | 'in_progress' | 'done'

type Task = {
  id: string
  title: string
  ticketId: string
  status: TaskStatus
  prLink?: string
  createdAt: string
}

const STORAGE_KEY = 'workflow-board-lite.tasks'

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

const STATUS_ORDER: TaskStatus[] = ['todo', 'in_progress', 'done']

const SEED_TASKS: Task[] = [
  {
    id: 'task-seed-1',
    title: 'Set up repository and first commit',
    ticketId: 'CUST-101',
    status: 'done',
    createdAt: '2026-03-19T12:00:00.000Z',
    prLink: 'https://github.com/your-user/ai-workflow-talks/pull/1',
  },
  {
    id: 'task-seed-2',
    title: 'Build board UI from Figma concept',
    ticketId: 'CUST-102',
    status: 'in_progress',
    createdAt: '2026-03-19T12:30:00.000Z',
  },
  {
    id: 'task-seed-3',
    title: 'Write Playwright happy-path test',
    ticketId: 'CUST-103',
    status: 'todo',
    createdAt: '2026-03-19T12:45:00.000Z',
  },
]

const formatStatus = (value: TaskStatus) => STATUS_LABEL[value]

const ticketLink = (ticketId: string) =>
  `https://app.plane.so/luminize/browse/${ticketId.toLowerCase()}`

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    if (!storedTasks) {
      return SEED_TASKS
    }

    try {
      const parsed = JSON.parse(storedTasks) as Task[]
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_TASKS
    } catch {
      return SEED_TASKS
    }
  })
  const [title, setTitle] = useState('')
  const [ticketId, setTicketId] = useState('')
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const filteredTasks = useMemo(
    () =>
      statusFilter === 'all'
        ? tasks
        : tasks.filter((task) => task.status === statusFilter),
    [tasks, statusFilter],
  )

  const counts = useMemo(
    () => ({
      todo: tasks.filter((task) => task.status === 'todo').length,
      in_progress: tasks.filter((task) => task.status === 'in_progress').length,
      done: tasks.filter((task) => task.status === 'done').length,
    }),
    [tasks],
  )

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim() || !ticketId.trim()) {
      return
    }

    setTasks((currentTasks) => [
      {
        id: `task-${crypto.randomUUID()}`,
        title: title.trim(),
        ticketId: ticketId.trim().toUpperCase(),
        status: 'todo',
        createdAt: new Date().toISOString(),
      },
      ...currentTasks,
    ])

    setTitle('')
    setTicketId('')
  }

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task,
      ),
    )
  }

  return (
    <main className="app">
      <header className="hero">
        <p className="kicker">Workflow Board Lite</p>
        <h1>Ship Fast, Show the AI Workflow</h1>
        <p className="subtitle">
          Demo app for ticket tracking, GitHub PR flow, and Playwright
          validation.
        </p>
        <div className="stats" aria-label="board stats">
          <p>
            <span>{counts.todo}</span> Todo
          </p>
          <p>
            <span>{counts.in_progress}</span> In Progress
          </p>
          <p>
            <span>{counts.done}</span> Done
          </p>
        </div>
      </header>

      <section className="panel">
        <form className="task-form" onSubmit={addTask}>
          <label htmlFor="title">Task title</label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Implement PR comment workflow"
          />

          <label htmlFor="ticket">Ticket ID</label>
          <input
            id="ticket"
            name="ticket"
            value={ticketId}
            onChange={(event) => setTicketId(event.target.value)}
            placeholder="CUST-104"
          />

          <button type="submit">Add task</button>
        </form>

        <div className="filters">
          <p>Status filter</p>
          <div className="filter-buttons">
            <button
              type="button"
              className={statusFilter === 'all' ? 'active' : ''}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            {STATUS_ORDER.map((status) => (
              <button
                key={status}
                type="button"
                className={statusFilter === status ? 'active' : ''}
                onClick={() => setStatusFilter(status)}
              >
                {formatStatus(status)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="board">
        {STATUS_ORDER.map((columnStatus) => (
          <article key={columnStatus} className="column">
            <h2>{formatStatus(columnStatus)}</h2>
            <ul>
              {filteredTasks
                .filter((task) => task.status === columnStatus)
                .map((task) => (
                  <li key={task.id}>
                    <p className="task-title">{task.title}</p>
                    <a
                      href={ticketLink(task.ticketId)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {task.ticketId}
                    </a>
                    {task.prLink ? (
                      <a href={task.prLink} target="_blank" rel="noreferrer">
                        PR link
                      </a>
                    ) : (
                      <p className="muted">No PR yet</p>
                    )}
                    <label
                      htmlFor={`${task.id}-status`}
                      className="visually-hidden"
                    >
                      Update status
                    </label>
                    <select
                      id={`${task.id}-status`}
                      value={task.status}
                      onChange={(event) =>
                        updateTaskStatus(task.id, event.target.value as TaskStatus)
                      }
                    >
                      {STATUS_ORDER.map((status) => (
                        <option key={status} value={status}>
                          {formatStatus(status)}
                        </option>
                      ))}
                    </select>
                  </li>
                ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
