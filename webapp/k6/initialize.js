import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from './config.js';


export default function () {
  http.get(`${BASE_URL}/initialize`,{
    timeout:"10s",
  }); 
}
