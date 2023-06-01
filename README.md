The design is simple because I am focusing on the functionality of certain features:

Problem 1
Implement the following CRUD operations for tasks:

- Create a new task by providing a task title, description, and due date.
- Retrieve a specific task by its ID.
- Update the details of a task (title, description, and/or due date).
- Delete a task by its ID.
- Retrieve all tasks.

Problem 2
Extend the Task Manager API from Problem 1 to include data validation for task creation
and update operations:

- Validate that the task title is not empty and does not exceed a certain length.
- Validate that the due date is a valid date in the future.
- Return appropriate error responses with descriptive messages if any validation
  fails.
- Update the API endpoints from Problem 1 to include the necessary data validation
  checks.

Problem 3
Extend the Task Manager API from Problem 1 to include pagination and sorting options
for retrieving tasks:

- Add pagination support to limit the number of tasks returned per page and provide
  pagination metadata (total number of tasks, total pages, etc.).
- Add sorting support to retrieve tasks in ascending or descending order based on
  the task's due date or any other relevant field.
- Update the API endpoints from Problem 1 to include the necessary pagination and
  sorting options.

Intruction to run this code.

When you are using your VSCODE, Go to source control (Ctrl + Shift + G) and select clone repository.

- Paste this Github repository URL : https://github.com/wynson09/Task-Manager.git
- Next you will select directory path/folder you want to put the clone project.
- Open terminal and type " npm i " to install all nessesary dependencies.
- Next type in the terminal json-server --watch db.json --port 8000.
- Lastly type " npm start " in the to run the code in react.
