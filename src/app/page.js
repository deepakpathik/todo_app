'use client';

import { useState, useEffect } from 'react';
import styles from './glass.module.css';
import WeatherWidget from './components/WeatherWidget';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [theme, setTheme] = useState('dark');

  // Initialize theme from local storage or system preference if desired, 
  // currently defaults to dark to match initial design.
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className={styles.glassContainer}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <WeatherWidget />

      <h1 className={styles.title}>Add Tasks</h1>

      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.glassInput}
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.glassButton} onClick={addTodo}>
          Add
        </button>
      </div>

      <div className={styles.todoList}>
        {todos.length === 0 ? (
          <p className={styles.emptyState}>No tasks yet. Add one!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className={styles.todoItem}>
              <span
                className={`${styles.todoText} ${todo.completed ? styles.completed : ''
                  } `}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button
                className={styles.deleteButton}
                onClick={() => deleteTodo(todo.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
