export default () => ({
    port: parseInt(process.env.PORT, 10) || 8082,
    host: '0.0.0.0',
    serviceName: 'transactions',
    statisticsAddress: 'http://localhost:8084',
});
