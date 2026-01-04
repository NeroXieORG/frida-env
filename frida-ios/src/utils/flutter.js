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
    const cls = ObjC.classes.FlutterMethodCall;
    if (!cls) return;
    
    const method = cls['+ methodCallWithMethodName:arguments:'];
    if (!method) return;

    Interceptor.attach(method.implementation, {
        onEnter: args => {
            const methodName = ObjC.Object(args[2]).toString();  // 获取方法名
            const _arguments = ObjC.Object(args[3]).toString();  // 获取参数
            console.log("FlutterMethodCall call method name: " + methodName);
            console.log("arguments: " + _arguments);
        }
    });
}

const traceFlutterMethodChannel = () => {
    const cls = ObjC.classes.FlutterMethodChannel;
    if (!cls) return;

    const method = cls['- invokeMethod:arguments:'];
    if (!method) return;

    Interceptor.attach(method.implementation, {
        onEnter: args => {
            const methodName = ObjC.Object(args[2]).toString();  // 获取方法名
            const _arguments = ObjC.Object(args[3]).toString();  // 获取参数
            console.log('MethodChannel invoked method: ' + methodName);
            console.log('arguments: ' + _arguments);
        }
    });

}
export {
    hasFlutter,
    traceFlutterMethodCall,
    traceFlutterMethodChannel
}