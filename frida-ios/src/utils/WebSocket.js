const disableSRWebSocket = () => {
    console.log('[*] disableSRWebSocket');
    const cls = ObjC.classes.SRWebSocket;
    if (!cls) {
        console.log('❌ SRWebSocket class not found');
        return;
    }
    
    Interceptor.attach(cls['- initWithURLRequest:'].implementation, {
        onEnter: args => {
            const request = new ObjC.Object(args[2]);
            console.log('request = ', request.toString());
        }
    });

    ['- open', '- close'].forEach(method => {
        Interceptor.attach(cls[method].implementation, {
            onEnter: () => console.log(`🚫 SRWebSocket ${method} BLOCKED`),
            onLeave: retval => {
                try {
                    retval.replace(0);
                } catch (e) {
                    console.log('❌ Error replacing retval:', e);
                }
            }
        });
    });
}

export {
    disableSRWebSocket
}


