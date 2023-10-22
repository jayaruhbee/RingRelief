// in order to utilize axios everywhere
import axios from 'axios'

// create axios instance. 
// This is not creating an api call its just creating an instance and saving that instance to the api.
// so you dont have to add url on every page youre doing an api call
export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});


