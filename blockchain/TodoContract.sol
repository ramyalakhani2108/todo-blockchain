// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoContract {
    struct Todo {
        string task;
        bool completed;
    }

    Todo[] public todos;

    // Function to add a new task
    function createTask(string memory _task) public {
        todos.push(Todo(_task, false));
    }

    // Function to toggle completion of a task
    function toggleComplete(uint _index) public {
        require(_index < todos.length, "Invalid index");
        todos[_index].completed = !todos[_index].completed;
    }

    // Function to retrieve all tasks
    function getTodos() public view returns (Todo[] memory) {
        return todos;
    }
}   