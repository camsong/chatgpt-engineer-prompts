// setup dotenv at the beginning, so that you can use it outside of function
import './setup-env.ts';
import server from './server/index.ts'

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`⚡️[chat-data]: Server is running at http://localhost:${port}`);
});
