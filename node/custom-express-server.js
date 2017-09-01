const ExpressHTTPServer = require('fastboot-app-server/src/express-http-server');
const express = require('express');
const Router = require('./router');

class CustomExpressServer extends ExpressHTTPServer {
    serve(middleware) {
        let app = this.app;
        let username = this.username;
        let password = this.password;

        if (username !== undefined || password !== undefined) {
            this.ui.writeLine(`adding basic auth; username=${username}; password=${password}`);
            app.use(basicAuth(username, password));
        }

        if (this.cache) {
            const router = new Router(app, this.buildCacheMiddleware(), this.distPath);
            router.buildRoutes();
        }

        if (this.distPath) {
            app.get('/', middleware);
            app.use(express.static(this.distPath));
        }

        const router = new Router(app, middleware, this.distPath);
        router.buildRoutes();

        return new Promise(resolve => {
            let listener = app.listen(process.env.PORT || 3000, () => {
                let host = listener.address().address;
                let port = listener.address().port;

                this.ui.writeLine('HTTP server started; url=http://%s:%s', host, port);

                resolve();
            });
        });
    }
}
module.exports = CustomExpressServer;
