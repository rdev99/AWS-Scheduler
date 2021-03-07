import { Client } from "pg";
import { connectionstring } from "./connectDB";

async function taskByID(taskID: string) {
    try {
        const client: Client = new Client(connectionstring);
        await client.connect();
        let ret: any = client.query(
            `SELECT * FROM scheduler
            WHERE id = '${taskID}';
            `).then(res => {
                return res.rows;
            }).catch(err => console.log("Query Error" + err));
        return ret;
    } catch (err) {
        console.error("Tasks not selected properly", err);
    }
}

export { taskByID };