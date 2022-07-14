import fastify from "fastify";
import Bouncer from "../routes/bouncer.routes";

function build(opts={}){
    const app=fastify(opts)
    app.register(Bouncer);
    return app
}
export default build;