const key = require("@k3rn31p4nic/google-translate-api");

exports.TranslateInput = async function (text, lang) {
    try {
        let translated = await key(text, {to: lang})
        return translated.text;  
    } catch (error) {
        return error;
    }

}