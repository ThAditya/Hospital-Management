import app from "./app.js";
import { serverPort } from "./serversettings.js";

app.listen(serverPort, () => {
  console.log(
    `🚀 Server Running On Port ${serverPort} | Local - http://localhost:${serverPort}`
  );
});
