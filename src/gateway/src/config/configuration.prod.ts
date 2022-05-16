export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  host: '0.0.0.0',
  gamesAddress: 'http://games:8081',
  transactionsAddress: 'http://transactions:8082',
  authAddress: 'http://sessions:8083',
  statisticsAddress: 'http://statistics:8084',
  serviceName: 'gateway',
});
