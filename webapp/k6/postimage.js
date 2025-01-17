import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from './config.js';
import {getRandomAccount,url} from './config.js';
import {parseHTML} from 'k6/html';


export default function () {
    const [ACCOUNT_NAME,ACCOUNT_PASSWORD] = getRandomAccount();
    const loginRes = http.post(url('/login'),{
    account_name: ACCOUNT_NAME,
    password: ACCOUNT_PASSWORD,
  });

  check(loginRes, {
    'is status 200': (r) => r.status === 200,
  });

  const res = http.get(url(`/@${ACCOUNT_NAME}`));
  //console.log(res.body);
  const doc = parseHTML(res.body);
  //console.log(doc);
  const token= doc.find("input[name=csrf_token]").first().attr("value");
  //console.log(token);
  const post_id = doc.find("input[name=post_id]").first().attr("value");
  //console.log(post_id);

  const comment_res = http.post(url(`/comment`),{
    post_id: post_id,
    csrf_token: token,
    comment:"Hello k6!"
  });
  check(comment_res, {
    'is status 200': (r) => r.status === 200,
  });
  //console.log(ACCOUNT_NAME);
}
