// 是否存在 flutter
const hasFlutter = () => {
    const modules = Process.enumerateModules()
    modules.forEach(module => {
        if (module.path.endsWith('flutter')) {
            return true
        }
    })

    return false
}

// hook plugin
const traceFlutterMethodCall = () => {
    const methodName = "+ methodCallWithMethodName:arguments:";
    const hook = ObjC.classes.FlutterMethodCall[methodName];
    try {
        Interceptor.attach(hook.implementation, {
            onEnter: function (args) {
                this.className = ObjC.Object(args[0]).toString();
                this.methodName = ObjC.selectorAsString(args[1]);
                console.log(this.className + ":" + this.methodName);
                console.log("method: " + ObjC.Object(args[2]).toString());
                console.log("args: " + ObjC.Object(args[3]).toString());
            }
        })
    } catch (err) {
        console.log("error in trace FlutterMethodCall");
        console.log(err);
    }
}

export {
    hasFlutter,
    traceFlutterMethodCall,
}