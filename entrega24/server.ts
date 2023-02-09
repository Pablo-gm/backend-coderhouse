import { serve, ServerRequest } from "https://deno.land/std@0.100.0/http/server.ts";

const PORT = 8080

const server = serve({ port: PORT });

console.log(`http://localhost:${PORT}`);

function handleRequest(req: ServerRequest) {
    req.respond({
        status: 200,
        headers: new Headers({ "content-type": "text/html; charset=utf-8"}),
        body: "Entrega 24"
    })
}

for await (const req of server) {
    handleRequest(req)
}