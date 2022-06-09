import Axios from 'axios';
import {FetchPeople} from "./models/landing-page.models";
import {FETCH_PEOPLE_URL} from "./env";

const apiGlobal = async (url: string, method: string = 'GET', data: any = null) => {
    try {
        const res = await Axios({
            url,
            method,
            data,
            params: (method === 'GET') ? data: null
        })
        return res.data;
    } catch(err) {
        console.error(`Had Error while ${method}ing, Error: ${err}`);
        throw err;
    }
}

export const fetchPeople = async (page: number = 1, searchValue: string | undefined): Promise<FetchPeople> => {
    if(searchValue) return apiGlobal(`${FETCH_PEOPLE_URL}`, 'GET', {name: searchValue, page})
    else return apiGlobal(`${FETCH_PEOPLE_URL}`, 'GET', {page})
}
