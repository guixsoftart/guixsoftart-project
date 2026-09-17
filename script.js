// GuixSoftArt Web Tools
// Client-side utilities with no external dependencies.

// Text analyzer
const textInput = document.getElementById("textInput");
const characters = document.getElementById("characters");
const words = document.getElementById("words");
const lines = document.getElementById("lines");

function updateTextStats() {
    const text = textInput.value;

    characters.textContent = text.length;

    const wordList = text.trim()
        ? text.trim().split(/\s+/)
        : [];

    words.textContent = wordList.length;

    lines.textContent = text
        ? text.split("\n").length
        : 0;
}

textInput.addEventListener("input", updateTextStats);


// Password generator
const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const generatePasswordButton =
    document.getElementById("generatePassword");
const copyPasswordButton =
    document.getElementById("copyPassword");

const passwordCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";

function generatePassword(length) {
    const values = new Uint32Array(length);
    crypto.getRandomValues(values);

    let result = "";

    for (let i = 0; i < length; i++) {
        result += passwordCharacters[
            values[i] % passwordCharacters.length
        ];
    }

    return result;
}

function refreshPassword() {
    passwordInput.value =
        generatePassword(Number(lengthInput.value));
}

lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
    refreshPassword();
});

generatePasswordButton.addEventListener(
    "click",
    refreshPassword
);

copyPasswordButton.addEventListener("click", async () => {
    if (!passwordInput.value) {
        return;
    }

    await navigator.clipboard.writeText(passwordInput.value);

    copyPasswordButton.textContent = "¡Copiado!";

    setTimeout(() => {
        copyPasswordButton.textContent = "Copiar";
    }, 1200);
});


// Color generator
const colorPicker = document.getElementById("colorPicker");
const hexColor = document.getElementById("hexColor");
const colorPreview = document.getElementById("colorPreview");
const copyColorButton = document.getElementById("copyColor");

function updateColor(color) {
    colorPreview.style.background = color;
    colorPicker.value = color;
    hexColor.value = color;
}

colorPicker.addEventListener("input", () => {
    updateColor(colorPicker.value);
});

hexColor.addEventListener("input", () => {
    const value = hexColor.value.trim();

    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        updateColor(value);
    }
});

copyColorButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(hexColor.value);

    copyColorButton.textContent = "¡Copiado!";

    setTimeout(() => {
        copyColorButton.textContent = "Copiar color";
    }, 1200);
});


// Initial password
refreshPassword();
