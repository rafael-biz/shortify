module.exports = {
    server: {
        port: 8080,
        domain: 'www.shortify.com.br'
    },
    database: {
        user: 'postgres',
        database: 'postgres',
        password: '1234',
        host: '127.0.0.1',
        port: 5432,
        max: 50,
        idleTimeoutMillis: 10000
    }
};