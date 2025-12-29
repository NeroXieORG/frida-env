
import { class_copyPropertyList, property_getName, property_getAttributes, free } from './oc_runtime';

function getClassPropertyList(className) {
    const targetClass = ObjC.classes[className];
    if (!targetClass) {
        console.log(`Class[${className}] not found`);
        return [];
    }

    // 获取属性列表
    let outCount = Memory.alloc(Process.pointerSize);
    const propertyList = class_copyPropertyList(targetClass.handle, outCount);

    //
    const properties = [];
    for (let i = 0; i < outCount.readUInt(); i++) {
        const propertyPtr = propertyList.add(i * Process.pointerSize).readPointer();
        const namePtr = property_getName(propertyPtr);
        const name = namePtr.readCString();
        const attributesPtr = property_getAttributes(propertyPtr);
        const attributes = attributesPtr.readCString();
        properties.push({ name, attributes });
    }

    // 释放内存
    free(propertyList);

    return properties;
}

export {
    getClassPropertyList,
}




