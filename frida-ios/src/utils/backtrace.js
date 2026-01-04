const printBacktrace = (ctx, maxDepth = 10) => {
    Thread.backtrace(ctx, Backtracer.ACCURATE)
        .slice(0, maxDepth)  // 限制堆栈深度
        .forEach(addr => {
            try {
                const symbol = DebugSymbol.fromAddress(addr);
                if (symbol) {
                    console.log(symbol.toString());
                } else {
                    console.log(`Address ${addr} has no associated symbol.`);
                }
            } catch (e) {
                console.log(`Failed to resolve address ${addr}:`, e);
            }
        });
};

export {
    printBacktrace
}