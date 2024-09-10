import axios from 'axios';

const request = axios.create({
    baseURL: "https://news-portal-server.ainurrofiq.site",
})

export default request;