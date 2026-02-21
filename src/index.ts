import http from 'http';

import appServer from './app';
import config from './config';
import logger from './config/logger';

const main = async (): Promise<void> => {
  // Start Server
  const server: http.Server = appServer.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });

  // Graceful exit handler
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  // Unexpected error Handler
  const unexpectedErrorHandler = (error: unknown) => {
    logger.error('Unexpected error', error);
    exitHandler();
  };

  // Process events
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    logger.info('SIGTERM raised');
    if (server) server.close();
  });
};

main().catch((error: unknown) => {
  logger.error('Fatal error starting server', error);
  process.exit(1);
});
