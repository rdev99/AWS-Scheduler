import { latestTask } from '../dbops/latestTask'
import { runTask } from './runTask'

 function runNext(endTime: number) : void {
    latestTask()
    .then( res => {
        if (res.length > 0) {
            const task = res[0];
            const msTime = task.invoke_time.getTime();
            // console.log(msTime, endTime);
            if (msTime <= endTime) {
                runTask(task.id.toString())
                .then(res => runNext(endTime))
                .catch(err => console.error(err));
            } else {
                return process.exit(0);
            }
        } else {
            // console.error("No latest task");
            return process.exit(0);
        }
    })
    .catch(err => console.error("Error in getting next task to run", err));
}

export {runNext};