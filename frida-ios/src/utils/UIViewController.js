const tracePushViewController = () => {
    const cls = ObjC.classes.UINavigationController;
    if (!cls) return;

    const method = cls["- pushViewController:animated:"];
    if (!method) return;

    Interceptor.attach(cls[method].implementation, {
        onEnter: args => {
            const vc = new ObjC.Object(args[2]);
            console.log("[*] pushViewController: " + vc.$className);
        }
    });
};

export {
    tracePushViewController
}
