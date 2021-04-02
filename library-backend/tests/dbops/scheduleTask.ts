import { scheduleTask } from "../../dbops/scheduleTask";
scheduleTask("https://znhvn9olqk.execute-api.us-east-2.amazonaws.com/default/hello-test", "2021-03-27T12:50:54.9571247Z")
.then(res => console.log(res))
.catch(err => console.error(err)); 
// timestamp or url is not neccesarily valid as of now. No data validations.
scheduleTask("arn:aws:lambda:us-east-2:977476:function:hello-test", "2021-03-27T13:20:54.9571247Z", "accessKeyIDaccessKeyMake16OrMoreID", "secretAccessKey", "some payload")
.then(res => console.log(res))
.catch(err => console.error(err)); 