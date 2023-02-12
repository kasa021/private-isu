import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from './config.js';
import {ACCOUNT_NAME, ACCOUNT_PASSWORD,url} from './config.js';
import {parseHTML} from 'k6/html';

const testImage = open('./test.png', 'b');


export default function () {
  const loginRes = http.post(url('/login'),{
    account_name: ACCOUNT_NAME,
    password: ACCOUNT_PASSWORD,
  });

  check(loginRes, {
    'is status 200': (r) => r.status === 200,
  });


  const doc = parseHTML(loginRes.body);
  const token= doc.find("input[name=csrf_token]").first().attr("value");

  http.post(url("/"),{
    csrf_token: token,
    file: http.file(testImage,"test.png","image/png"),
    body:"JAVA IS THE BEST!"
  });
}
