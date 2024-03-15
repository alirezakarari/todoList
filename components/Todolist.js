"use client";
import {useState} from 'react';
import {
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Container,
    Checkbox,
    Box,
    NoSsr
} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux"
import {addTodo, toggleTodo, deleteTodo, editTodo} from "@/store/todoSlice"

const TodoList = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos)
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');
    const [title, setTitle] = useState('');

    const handleEdit = (todo) => {
        setEditId(todo.id);
        setEditText(todo.text);
    }
    const handlerAddTodo = (event) => {
        event.preventDefault()
        if (title !== '') {
            dispatch(addTodo(title))
            setTitle('')
        }
    }
    const handlerDeleteTodo = (event, item) => {
        event.preventDefault()
        dispatch(deleteTodo(item))
    }
    const handleToggleTodo = (item) => {
        dispatch(toggleTodo(item))
    }
    const handlerEditTodo = (item) => {
        if (editText !== '') {
            const editItem = Object.assign({}, {...item, text: editText})
            dispatch(editTodo(editItem))
            setEditId(null);
            setEditText('');
        }
    }

    return (
        <NoSsr>
            <Container maxWidth="md">
                <List>
                    {todos.map(todo => (
                        <ListItem key={todo.id}>
                            <Checkbox
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(todo)}
                            />
                            {editId === todo.id ? (
                                <>
                                    <div className="flex justify-between items-center w-full">
                                        <TextField
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                        />
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={() => handlerEditTodo(todo)}
                                        >
                                            Save Edit
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ListItemText>{todo.text}</ListItemText>
                                    <Button
                                        color="primary"
                                        onClick={() => handleEdit(todo)}
                                    >
                                        Edit
                                    </Button>
                                    <Box sx={{m: 0.4}}/>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={(event) => handlerDeleteTodo(event, todo)}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
                <div className="flex justify-center items-center">
                    <TextField
                        label="Add Todo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlerAddTodo}
                    >
                        Add
                    </Button>
                </div>
            </Container>
        </NoSsr>
    );
};

export default TodoList;
