import Fastify from "fastify";
import Bouncer from "../routes/bouncer.routes";

function build(opts={}){
    const app=Fastify(opts)
    app.register(Bouncer);
    return app
}
export default build;