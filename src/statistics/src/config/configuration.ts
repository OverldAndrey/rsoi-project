export default () => ({
    port: parseInt(process.env.PORT, 10) || 8084,
    host: '0.0.0.0',
});
