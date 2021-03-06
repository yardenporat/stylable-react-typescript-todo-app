import React, { useReducer } from 'react';
import { st, classes } from './app.st.css';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
import { Sidebar } from './layout/Sidebar';
import type { Todo } from './models/todo.model';
import { Header } from './header';

export interface AppProps {
  className?: string;
}

// export const ACTIONS = {
//   ADD_TODO: 'addTodo',
//   DELETE_TODO: 'deleteTodo',
// };

export type Actions =
  | { type: 'addTodo'; payload: { id: string; text: string } }
  | { type: 'deleteTodo'; payload: { id: string } };

function reducer(todos: Todo[], action: Actions): Todo[] {
  switch (action.type) {
    case 'addTodo':
      return [...todos, action.payload];
    case 'deleteTodo':
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

export const App = ({ className }: AppProps): JSX.Element => {
  const initialState = [{ id: '0.0001', text: 'Sample todo' }];
  const [todos, dispatch] = useReducer(reducer, initialState);

  return (
    <main className={st(classes.root, className)}>
      <Sidebar />
      <section className={classes.main}>
        <Header />
        <AddTodo dispatch={dispatch} className={classes.addtodo} />
        <TodoList
          todos={todos}
          dispatch={dispatch}
          className={classes.todolist}
        />
      </section>
    </main>
  );
};
