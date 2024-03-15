import { createSlice } from '@reduxjs/toolkit';
import { getInitialState, saveTodosToLocalStorage } from "@/utils/localStorage"


const todosSlice = createSlice({
    name: 'todos',
    initialState: getInitialState(),
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: crypto.randomUUID(),
                text: action.payload,
                completed: false,
            };
            state.push(newTodo);
            saveTodosToLocalStorage(state);
        },
        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload.id);
            if (todo !== undefined) {
                todo.completed = !todo.completed;
                saveTodosToLocalStorage(state);
            }
        },
        deleteTodo: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.splice(index, 1);
                saveTodosToLocalStorage(state);
            }
        },
        editTodo: (state, action) => {
            const { id, text } = action.payload;
            const todoToEdit = state.find((todo) => todo.id === id);
            if (todoToEdit !== undefined) {
                todoToEdit.text = text;
                saveTodosToLocalStorage(state)
            }
        },
    },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
