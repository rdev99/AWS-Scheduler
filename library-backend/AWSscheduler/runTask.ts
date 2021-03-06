import { editStatus } from './../dbops/editTask';
import { dbID } from './../validateData/dbID';
import { taskByID } from "../dbops/taskById";
import { invokeLambda } from '../AWSconnect/invokeLambda';
import { triggerLambda } from '../AWSconnect/triggerLambdaHTTP';
import * as fs from 'fs';

async function runTask(taskID: string) : Promise<void> {
    try {
        const invokeSuccessPath = "../invokeSuccess.txt";
        // console.log(process.cwd())
        dbID(taskID)
        .then(res => {
            if(res) {
                taskByID(taskID)
                .then(tasks => {
                    // if (tasks.length > 0) // removed the check assuming the dbID validation
                    const task = tasks[0];
                    if (task.accesskeyid && task.accesskeyid != "") {
                        editStatus(taskID, "Running");
                        invokeLambda(task.urlorarn, task.payload, task.accesskeyid, task.secretaccesskey);
                        if (fs.readFileSync(invokeSuccessPath, 'utf-8') == "success") {    
                            editStatus(taskID, "Completed");
                        } else {
                            editStatus(taskID, "Failed");
                        }
                    } else {
                        editStatus(taskID, "Running");
                        triggerLambda(taskID, task.urlorarn, task.payload);
                    }
                });
            } else {
                console.error("Invalid ID");
            }
        });
    }
    catch(err){
        console.error(err);
    }
}

export {runTask};