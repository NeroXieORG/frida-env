const traceCreateWKWebView = () => {
    const method = ObjC.classes.WKWebView['- initWithFrame:configuration:'];
    Interceptor.attach(method.implementation, {
        onEnter: () => {
            console.log('- [WKWebView initWithFrame:configuration:] called');
        }
    });
}

export {
    traceCreateWKWebView
}