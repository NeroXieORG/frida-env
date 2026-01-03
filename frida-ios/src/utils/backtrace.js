const printBacktrace = (ctx, maxDepth = 10) => {
    const backtrace = Thread.backtrace(ctx, Backtracer.ACCURATE)
        .slice(0, maxDepth)
        .map((addr) => {
            try {
                return DebugSymbol.fromAddress(addr).toString();
            } catch (e) {
                return `Failed to resolve address: ${addr}`;
            }
        })
        .join('\n');
    console.log(backtrace);
};

export {
    printBacktrace
}