import { useEffect, useState } from 'react';
import axios from 'axios';
import { todoContract } from '../Web3';

const API_URL = "http://localhost:3000/todo"; // Backend API

const Todo = () => {
  const [todos, setTodos] = useState<{ id: number; task: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post(API_URL, { task: newTask });
    setNewTask("");
    fetchTodos();
  };

  const toggleComplete = async (id: number) => {
    await axios.patch(`${API_URL}/${id}`);
    fetchTodos();
  };
  const addToBlockchain = async () => {
    if (!(window as any).ethereum) {
      alert("MetaMask is not installed! Please install MetaMask.");
      return;
    }
  
    try {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
  
      const receipt = await todoContract.methods.createTask(newTask).send({ from: accounts[0] });
  
      console.log("Transaction successful:", receipt);
      alert(`Task added! Tx Hash: ${receipt.transactionHash}`);
  
      setNewTask("");
    } catch (error) {
      console.error("Error adding to blockchain:", error);
      alert("Transaction failed! See console for details.");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <input
        className="border p-2 w-full my-2"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={addTodo}>
        Add
      </button>
      <button className="bg-green-500 text-white p-2 ml-2 rounded" onClick={addToBlockchain}>
        Add to Blockchain
      </button>

      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between p-2 border-b">
            <span className={todo.completed ? "line-through" : ""}>{todo.task}</span>
            <button className="text-sm text-blue-500" onClick={() => toggleComplete(todo.id)}>
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;