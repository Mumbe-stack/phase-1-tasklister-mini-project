// src/index.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  const taskInput = document.getElementById('new-task-description');
  const taskList = document.getElementById('tasks');

  // Add "wash the dishes" as an initial task
  const initialTask = document.createElement('li');
  initialTask.textContent = "wash the dishes";
  taskList.appendChild(initialTask);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskDescription = taskInput.value.trim();

    if (taskDescription !== '') {
      const listItem = document.createElement('li');
      listItem.textContent = taskDescription;

      taskList.appendChild(listItem);
      taskInput.value = '';
    }
  });
});

// test/indexTest.js (using Mocha and jsdom)
const fs = require('fs');
const { JSDOM } = require('jsdom');
const { assert } = require('chai');

describe('Task Lister Functionality', () => {
  let dom;
  let document;

  beforeEach(() => {
    const html = fs.readFileSync('index.html', 'utf-8');
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    global.window = dom.window;
    global.document = document;

    return new Promise((resolve) => {
        dom.window.addEventListener('load', resolve);
    });
  });

  it('should display "wash the dishes" on page load', () => {
    const taskList = document.getElementById('tasks');
    const listItems = taskList.querySelectorAll('li');
    assert.strictEqual(listItems.length, 1);
    assert.strictEqual(listItems[0].textContent, 'wash the dishes');
  });

  it('should add a task when the form is submitted', () => {
    const taskInput = document.getElementById('new-task-description');
    const form = document.getElementById('create-task-form');
    const taskList = document.getElementById('tasks');

    taskInput.value = 'do laundry';
    form.dispatchEvent(new dom.window.Event('submit'));

    const listItems = taskList.querySelectorAll('li');
    assert.strictEqual(listItems.length, 2);
    assert.strictEqual(listItems[1].textContent, 'do laundry');
    assert.strictEqual(taskInput.value, '');
  });

  it('should prevent the default form submission', () => {
    const form = document.getElementById('create-task-form');
    let defaultPrevented = false;

    form.addEventListener('submit', (event) => {
        defaultPrevented = event.defaultPrevented;
    });

    form.dispatchEvent(new dom.window.Event('submit'));
    assert.isTrue(defaultPrevented);
  });
});