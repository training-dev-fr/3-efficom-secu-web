const fs = require('fs');
const LOG_FILE = './log/req.log';

const log = (req, res, next) => {
    let status = res.status;
    res.status = (code) => {
        let logString = [(new Date()).toLocaleString()]
        logString.push(req.method);
        logString.push(req.path);
        logString.push(req.ip);
        logString.push("\n Content-Type:", req.headers["content-type"]);
        if (req.body) {
            if(!req.body.password){
                logString.push("\n", JSON.stringify(req.body));
            }else{
                logString.push("\n", JSON.stringify({...req.body,password: "********"}));
            }
        }
        logString.push(code);
        fs.appendFileSync(LOG_FILE,logString.join(" ") + "\n");
        status(code);
    }
    next();
}

module.exports = log;

/* 17/04/2025 08:23:05 POST /user/login 192.168.5.27
{
    "Content-type" : "application/json"
}
{
    "email":"avaast@myges.fr",
    "password":"******"
}
*/