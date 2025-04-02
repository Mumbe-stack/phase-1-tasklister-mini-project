document.addEventListener("DOMContentLoaded", () => {
 
    const form = document.getElementById('create-task-form');
    const taskInput = document.getElementById('new-task-description');
    const taskList = document.getElementById('tasks');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); 
  
      const taskDescription = taskInput.value.trim();
  
      if (taskDescription !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = taskDescription;
        taskList.appendChild(listItem);
        taskInput.value = ''; 
        const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        taskList.removeChild(listItem); 
      });

      listItem.appendChild(deleteButton); 
      taskList.appendChild(listItem);
      taskInput.value = '';
      }
    });
});

