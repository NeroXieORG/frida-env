
const pushViewControllerLog = () => {
    const targetClass = ObjC.classes.UINavigationController;
    if (!targetClass) return;

    const targetMethod = targetClass["- pushViewController:animated:"];
    if (!targetMethod) return;

    Interceptor.attach(targetMethod.implementation, {
        onEnter: args => {
            const vc = new ObjC.Object(args[2]);
            console.log("[*] pushViewController: " + vc.$className);
        }
    });
};

export {
    pushViewControllerLog
}
