const free = new NativeFunction(
    Module.findGlobalExportByName("free"),
    'void',
    ['pointer']
);

const objc_getClass = new NativeFunction(
    Module.findGlobalExportByName("objc_getClass"),
    'pointer',
    ['pointer']
);

const class_copyIvarList = new NativeFunction(
    Module.findGlobalExportByName("class_copyIvarList"),
    'pointer',
    ['pointer', 'pointer']
);

const ivar_getName = new NativeFunction(
    Module.findGlobalExportByName("ivar_getName"),
    'pointer',
    ['pointer']
);

const ivar_getTypeEncoding = new NativeFunction(
    Module.findGlobalExportByName("ivar_getTypeEncoding"),
    'pointer',
    ['pointer']
);
const class_copyPropertyList = new NativeFunction(
    Module.findGlobalExportByName('class_copyPropertyList'),
    'pointer',
    ['pointer', 'pointer']
);

const property_getName = new NativeFunction(
    Module.findGlobalExportByName('property_getName'),
    'pointer',
    ['pointer']
);

const property_getAttributes = new NativeFunction(
    Module.findGlobalExportByName('property_getAttributes'),
    'pointer',
    ['pointer']
);

export {
    free,
    objc_getClass,
    class_copyPropertyList,
    property_getName,
    property_getAttributes,
    class_copyIvarList,
    ivar_getName,
    ivar_getTypeEncoding,
}