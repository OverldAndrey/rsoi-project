export default () => ({
    port: parseInt(process.env.PORT, 10) || 8081,
    host: '0.0.0.0',
    serviceName: 'games',
    statisticsAddress: 'http://localhost:8084'
});
