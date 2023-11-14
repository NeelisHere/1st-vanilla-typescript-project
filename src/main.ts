import "./style.css";

interface Task {
  readonly id: string;
  title: string;
  isCompleted: boolean;
}
type deleteTaskFunctionType = (id: String) => void
// type toggleTaskCompletionStatusType = (id: String) => void

let taskList: Task[] = []

const taskContainer = <HTMLDivElement> document.querySelector('.task-container')

const taskInput = <HTMLInputElement> document.getElementsByName('title')[0]

const form = <HTMLFormElement> document.getElementById('my-form')

form.onsubmit = (e: SubmitEvent) => {
	e.preventDefault()
	const task: Task = {
		title: taskInput.value,
		isCompleted: false,
		id: String(Math.random() * 1000).split('.').join()
	}
	taskList.push(task)
	taskInput.value = ''
	renderTaskList(taskList)
}

const renderTaskList = (taskList: Task[]) => {
	taskContainer.innerText = ''
	taskList.forEach((task) => {
		let { id, title, isCompleted } = task
		// console.log(id)
		const taskDiv: HTMLDivElement = document.createElement('div')
		taskDiv.className = 'task' 

		const checkbox: HTMLInputElement = document.createElement('input')
		checkbox.setAttribute('type', 'checkbox')
		checkbox.checked = isCompleted
		checkbox.onchange = () => {
			// isCompleted = checkbox.checked
			titleParagraph.className = checkbox.checked ? 'text-cut' : ''
			
		}

		const titleParagraph: HTMLParagraphElement = document.createElement('p')
		titleParagraph.innerText = title
		titleParagraph.className = checkbox.checked ? 'text-cut' : ''
		
		const button: HTMLButtonElement = document.createElement('button')
		button.innerText = 'Delete'
		button.className = 'delete-button'
		button.onclick = () => {
			deleteTask(id)
		}

		taskDiv.append(checkbox, titleParagraph, button)
		taskContainer.append(taskDiv)
		
	})
}

const deleteTask: deleteTaskFunctionType = (id) => {
	taskList = taskList.filter(task => task.id !== id)
	renderTaskList(taskList)
}

