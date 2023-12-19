
// Task manager application
(function () {
  
    // Array to store tasks
    let tasks = [];
  
    // Function to render the task list
    function renderTaskList() {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
  
      // Loop through the tasks and create task elements
      tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.status === 'complete') {
          taskElement.classList.add('complete');
          
        }
  
        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = task.title;
  
        const descriptionElement = document.createElement('div');
        descriptionElement.textContent = task.description;
  
        const dueDateElement = document.createElement('div');
        dueDateElement.textContent = task.dueDate;
  
        const statusElement = document.createElement('div');
        statusElement.classList.add('status');
        statusElement.textContent = task.status;
  
        const actionsElement = document.createElement('div');
        actionsElement.classList.add('actions');
        
  
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          editTask(index);
          
        });
        
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteTask(index);
        });
  
        if (task.status !== 'complete') {
          actionsElement.appendChild(editButton);
        }
  
        actionsElement.appendChild(deleteButton);
  
        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(dueDateElement);
        taskElement.appendChild(statusElement);
        taskElement.appendChild(actionsElement);
  
        taskList.appendChild(taskElement);
      });
    }

    function saveTask({ id, task }) {
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
          console.error("User ID not found");
          return;
      }
  
      const endpoint = `https://657c8d8a853beeefdb99a11f.mockapi.io/api/v1/user/${userId}/Task`;
  
      const data = {
          id: id,
          task: task
      };
  
      fetch(endpoint, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
              console.log('Task saved successfully:', data);
          })
          .catch(error => {
              console.error('Error saving task:', error);
          });
  }
    
  
    // Function to add a new task
    function addTask(title, description, dueDate, status) {
      const task = {
        title,
        description,
        dueDate,
        status
      };
  
      tasks.push(task);
      renderTaskList();
      resetForm();
    }
    
  
    // Function to edit a task
    function editTask(index) {
      const task = tasks[index];
  
      const titleInput = document.getElementById('task-title');
      const descriptionInput = document.getElementById('task-description');
      const dueDateInput = document.getElementById('due-date');
      const statusInput = document.getElementById('status');
  
      titleInput.value = task.title;
      descriptionInput.value = task.description;
      dueDateInput.value = task.dueDate;
      statusInput.value = task.status;
  
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => {
        task.title = titleInput.value;
        task.description = descriptionInput.value;
        task.dueDate = dueDateInput.value;
        task.status = statusInput.value;
  
        renderTaskList();
        resetForm();
        document.getElementById('task-form').removeChild(updateButton);
      });
  
      document.getElementById('task-form').appendChild(updateButton);
    }
  
    // Function to delete a task
    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTaskList();
    }
    
    
  
    // Function to reset the form
    function resetForm() {
      document.getElementById('task-title').value = '';
      document.getElementById('task-description').value = '';
      document.getElementById('due-date').value = '';
      document.getElementById('status').value = 'pending';
    }
  
    // Add task form submit event listener
    document.getElementById('task-form').addEventListener('submit', function onSubmit(event) {
      event.preventDefault();
  
      const titleInput = document.getElementById('task-title');
      const descriptionInput = document.getElementById('task-description');
      const dueDateInput = document.getElementById('due-date');
      const statusInput = document.getElementById('status');
  
      const title = titleInput.value;
      const description = descriptionInput.value;
      const dueDate = dueDateInput.value;
      const status = statusInput.value;
  
      addTask(title, description, dueDate, status);
    });

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
     
      localStorage.removeItem('user');
      renderAuthForm();
    });
  
  
    // Initial rendering of the task list
    renderTaskList();
  })();
  

  