const ipv4String = (addr) => {
    return [
        addr.add(4).readU8(),
        addr.add(5).readU8(),
        addr.add(6).readU8(),
        addr.add(7).readU8()
    ].join(".");
}

const ipv6ToIpv4 = (addr) => {
    // sockaddr_in6:
    // offset 8 开始是 sin6_addr（16 字节）
    // NAT64: IPv4 在最后 4 字节
    const b0 = addr.add(8 + 12).readU8();
    const b1 = addr.add(8 + 13).readU8();
    const b2 = addr.add(8 + 14).readU8();
    const b3 = addr.add(8 + 15).readU8();

    return b0 + "." + b1 + "." + b2 + "." + b3;
}