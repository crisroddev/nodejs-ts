import { Router } from 'express';
import { Todo } from '../models/todo';

const router = Router();

type RequestBody = { text: string };
let todos: Todo[] = [];

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const nexTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(nexTodo);
    res.status(201).json({ message: 'Added Todo', todo: nexTodo, todos: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todosIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todosIndex >= 0) {
        todos[todosIndex] = {
            id: todos[todosIndex].id,
            text: req.body.text
        };
        return res.status(200).json({ message: 'Updated Todo', todos: todos });
    }
    res.sendStatus(404).json({ message: `No todo with id` })
});

router.delete('/todo/:todoId', (req, res, next) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);
    res.status(200).json({ message: 'Deleted Todo', todos: todos });
})

export default router;
