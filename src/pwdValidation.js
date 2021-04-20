function pwdPreValidation(pwd, pwd2) {
    let preValMessage = [];
    if (pwd.length < 8) {
        preValMessage.push("Your password must be at least 8 characters")
    }

    if (pwd.match(/[A-Z]/g) == null || (pwd.match(/[A-Z]/g) != null && pwd.match(/[A-Z]/g).length < 1)) {
        preValMessage.push("Your password must contain at least One Capital Letter")
    }

    if (pwd.match(/[0-9]/g) == null || (pwd.match(/[0-9]/g) != null && pwd.match(/[0-9]/g).length < 1)) {
        preValMessage.push("Your password must contain at least One Number")
    }

    if (pwd.match(/[!¡·$£€%&/?¿*|@#~€]/g) == null || (pwd.match(/[!¡·$£€%&/?¿*|@#~€]/g) != null && pwd.match(/[!¡·$£€%&/?¿*|@#~€]/g).length < 1)) {
        preValMessage.push("Your password must contain at least One Special Character like: '[!¡·$£€%&/?¿*|@#~€]'")
    }
    if (pwd2 && pwd2 !== "" && pwd !== pwd2) {
        preValMessage.push("Both passwords must match")
    }
    return preValMessage
}

export default pwdPreValidation