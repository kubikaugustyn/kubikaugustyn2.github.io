//  -*- coding: utf-8 -*-
// eslint-disable-next-line no-unused-vars
var __author__ = "kubik.augustyn@post.cz";

var chrome = {
    csi: {
        arguments: null,
        caller: null,
        length: 0,
        name: ""
    },
    getVariableValue: {
        arguments: [
            //Exception: TypeError: 'caller', 'callee', and 'arguments'properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:1:142)],
            //caller: [Exception: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:1:142)],
        ],
        length: 0,
        name: ""
    },
    loadTime: {
        arguments: null,
        caller: null,
        lenght: 0,
        name: ""
    },
    runtime: {
        OnInstalledReason: {
            CHROME_UPDATE: "chrome_update",
            INSTALL: "install",
            SHARED_MODULE_UPDATE: "shared_module_update",
            UPDATE: "update"
        },
        OnRestartRequiredReason: {
            APP_UPDATE: "app_update",
            OS_UPDATE: "os_update",
            PERIODIC: "periodic"
        },
        PlatformArch: {
            ARM: "arm",
            ARM64: "arm64",
            MIPS: "mips",
            MIPS64: "mips64",
            X86_32: "x86-32",
            X86_64: "x86-64"
        },
        PlatformNaclArch: {
            ARM: "arm",
            MIPS: "mips",
            MIPS64: "mips64",
            X86_32: "x86-32",
            X86_64: "x86-64"
        },
        PlatformOs: {
            ANDROID: "android",
            CROS: "cros",
            LINUX: "linux",
            MAC: "mac",
            OPENBSD: "openbsd",
            WIN: "win"
        },
        RequestUpdateCheckStatus: {
            NO_UPDATE: "no_update",
            THROTTLED: "throttled",
            UPDATE_AVAILABLE: "update_available"
        },
        id: undefined
    },
    send: function (){
        return {
            arguments: "TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them \n at Function.invokeGetter (<anonymous>:1:142)",
            caller: "TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them \n at Function.invokeGetter (<anonymous>:1:142)",
            length: 0,
            name: ""
        }
    },
    /*get runtime: ƒ ()
arguments: [Exception: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:1:142)]
caller: [Exception: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:1:142)]
length: 0
name: ""
__proto__: ƒ ()
[[Scopes]]: Scopes[0]
set runtime: ƒ ()
arguments: [Exception: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:1:142)]
caller: [Exception: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:1:142)]
length: 1
name: ""*/
};