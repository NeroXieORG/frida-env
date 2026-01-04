const disableSRWebSocket = () => {
    const cls = ObjC.classes.SRWebSocket;
    if (!cls) return;

    console.log('🚫 Disable SRWebSocket');

    Interceptor.attach(cls['- initWithURLRequest:'].implementation, {
        onEnter: args => {
            const request = new ObjC.Object(args[2]);
            console.log('request = ', request.toString());
        }
    });

    cls.$ownMethods
        .map(m => m.toString())
        .filter(m => m !== '- initWithURLRequest:')
        .forEach(m => {
            Interceptor.attach(cls[m].implementation, {
                onEnter: () => console.log(`🚫 SRWebSocket ${m} BLOCKED`),
                onLeave: retval => {
                    try {
                        retval.replace(0);
                    } catch (e) { }
                }
            });
        });
}

export {
    disableSRWebSocket
}


