import axios from 'axios';

export const API_KEY = 'CWB-11123A65-0E01-4AE9-B4BD-C1649709ED9B';

export default axios.create({
    baseURL: 'https://opendata.cwb.gov.tw/api',
});