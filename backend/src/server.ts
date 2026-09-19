import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const app = createApp();

app.listen(env.port, () => {
  logger.info(`Aurametric API listening on http://localhost:${env.port}`);
});
