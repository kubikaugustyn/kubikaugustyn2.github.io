var __author__ = "kubik.augustyn@post.cz"

var PATHS = {
    HOME: "Encryptor/CodeTranslator/",
    LOGIN: "Encryptor/CodeTranslator/login",
}

var devMode = document.location.host === "localhost:63342"
if (devMode) {
    PATHS.HOME = "kubikaugustyn.github.io/Encryptor/CodeTranslator/"
    PATHS.LOGIN = "kubikaugustyn.github.io/Encryptor/CodeTranslator/login"
}
