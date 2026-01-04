const disableJCOREUdpSocket = (showLog = false) => {
    const cls = ObjC.classes.JCOREUdpSocket;
    if (!cls) return;

    console.log('🚫 Disable JCOREUdpSocket');

    cls.$ownMethods
        .map(m => m.toString())
        .forEach(m => {
            Interceptor.attach(cls[m].implementation, {
                onEner: () => {
                    if (showLog) {
                        console.log(`🚫 JCOREUdpSocket ${m} BLOCKED`);
                    }
                },
                onLeave: retval => {
                    try {
                        retval.replace(0);
                    } catch (e) { }
                }
            });
        });
};

const disableJCORETcpSocket = (showLog = false) => {
    const cls = ObjC.classes.JCORETcpSocket;
    if (!cls) return;

    console.log('🚫 Disable JCORETcpSocket');

    cls.$ownMethods
        .map(m => m.toString())
        .forEach(m => {
            Interceptor.attach(cls[m].implementation, {
                onEner: () => {
                    if (showLog) {
                        console.log(`🚫 JCOREUdpSocket ${m} BLOCKED`);
                    }
                },
                onLeave: retval => {
                    try {
                        retval.replace(0);
                    } catch (e) { }
                }
            });
        });
};

export {
    disableJCOREUdpSocket,
    disableJCORETcpSocket
}