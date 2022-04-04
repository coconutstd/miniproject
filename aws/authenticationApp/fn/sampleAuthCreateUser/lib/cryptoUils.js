const crypto = require("crypto")

function computHash(password, salt, fn) {
    const len = 512
    const iterations = 4096
    const digest = "sha512"

    if (arguments.length === 3) {
        crypto.pbkdf2(
            password,
            salt,
            iterations,
            len,
            digest,
            function (err, derivedKey) {
                if (err) return fn(err)
                else fn(null, salt, derivedKey.toString("base64"))
            }
        )
    } else {
        fn = salt
        crypto.randomBytes(len, function (err, salt) {
            if (err) return fn(err)
            salt = salt.toString("base64")
            computHash(password, salt, fn)
        })
    }
}

module.exports.computHash = computHash
