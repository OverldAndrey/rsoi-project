export default () => ({
    port: parseInt(process.env.PORT, 10) || 8083,
    host: '0.0.0.0',
    serviceName: 'sessions',
    statisticsAddress: 'http://statistics:8084',
    jwtSecret: '54uhgu8ch54g8bbf3rb4fbdh4rbf4-845hy73fbnfwbsmebdbsm838tg4f4f43br6',
});
