export const pinoHttpConfig = {
  level: process.env.NODE_ENV !== "prod" ? "debug" : "info",
  transport:
    process.env.NODE_ENV !== "prod"
      ? {
          target: "pino-http-print",
          options: {
            destination: 1,
            all: true,
            colorize: true,
            translateTime: true,
          },
        }
      : undefined,
};
