export const isAdmin = function(req, res, next) {
    const admin = 1;
    try {
        if(admin){
            next();
        }else{
            res.status(401).json({ error: -1, descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada` });
        }
    } catch (error) {
        console.log(error);
    }

}
