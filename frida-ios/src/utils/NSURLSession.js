const disableURLSessionTaskResume = (showLog = false) => {
    const cls = ObjC.classes.NSURLSessionTask;
    if (!cls) return;

    const originalM = cls["- resume"].implementation;
    if (!originalM) return;

    const replaceM = new NativeCallback((self, _cmd) => {
        if (showLog) {
            const task = new ObjC.Object(self);
            const request = task.originalRequest();
            if (request) {
                const url = request.URL().absoluteString().toString();
                console.log("⛔ Block -[NSURLSessionTask resume]:", url);
            }
        }

        return;
    }, "void", ["pointer", "pointer"]);

    Interceptor.replace(originalM, replaceM);
}

export {
    disableURLSessionTaskResume
}