const timestamp = () => new Date().toISOString();

export const logger = {
  info(message: string, extra?: unknown) {
    console.log(`[${timestamp()}] INFO  ${message}`, extra ?? "");
  },
  warn(message: string, extra?: unknown) {
    console.warn(`[${timestamp()}] WARN  ${message}`, extra ?? "");
  },
  error(message: string, extra?: unknown) {
    console.error(`[${timestamp()}] ERROR ${message}`, extra ?? "");
  },
};
