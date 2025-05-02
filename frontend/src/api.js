import { API_URL } from "./utils"

export const CreateTask = async (taskObj) => {
    // const url = API_URL;
    const url = `${API_URL}/tasks`;
    // console.log('url', url)
    const options = {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;

    } catch (e) {
        return e
    }
}


export const GetAllTasks = async (taskObj) => {
    // const url = API_URL;
    const url = `${API_URL}/tasks`;
    // console.log('url', url)
    const options = {
        method: 'GET',
        headers: {
            'content-Type': 'application/json'
        },
       
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;

    } catch (e) {
        return e
    }
}


export const DeleteTasks = async (id) => {
    // const url = API_URL;
    const url = `${API_URL}/tasks/${id}`;
    // console.log('url', url)
    const options = {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json'
        },
       
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;

    } catch (e) {
        return e
    }
}



export const checkTasks = async (id,reqBody) => {
    // const url = API_URL;
    const url = `${API_URL}/tasks/${id}`;
    // console.log('url', url)
    const options = {
        method: 'PUT',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;

    } catch (e) {
        return e
    }
}