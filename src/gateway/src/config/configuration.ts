export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  host: '0.0.0.0',
  gamesAddress: 'http://localhost:8081',
  transactionsAddress: 'http://localhost:8082',
  authAddress: 'http://localhost:8083',
  statisticsAddress: 'http://localhost:8084',
});
