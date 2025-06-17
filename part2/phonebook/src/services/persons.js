import Axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return Axios.get(baseUrl)
        .then(response => response.data)
        .catch(error => {
        console.error("Error fetching persons:", error);
        throw error;
        });
}

const create = (newPerson) => {
    return Axios.post(baseUrl, newPerson)
        .then(response => response.data)
        .catch(error => {
        console.error("Error creating person:", error);
        throw error;
        });
}

const update = (id, updatedPerson) => {
    return Axios.put(`${baseUrl}/${id}`, updatedPerson)
        .then(response => response.data)
        .catch(error => {
        console.error("Error updating person:", error);
        throw error;
        });
}

export default { getAll, create, update };