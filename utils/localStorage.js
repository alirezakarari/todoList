export const getInitialState = () => {
    try {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem('todos')) || [];
        }
    } catch (error) {
        console.error('Error getting todos from localStorage:', error);
    }
    return [];
}

export const saveTodosToLocalStorage = (todos) => {
    try {
        if (typeof window !== "undefined") {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    } catch (error) {
        console.error('Error saving todos to localStorage:', error);
    }
}