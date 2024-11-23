const translations = {
    en: {
        title: 'Base64 Converter',
        input: 'Input',
        output: 'Output',
        encode: 'Encode',
        decode: 'Decode',
        clear: 'Clear',
        copy: 'Copy',
        nothingtocopy: "Rien à copier",
        copied: 'Copied!',
        inputPlaceholder: 'Enter text to encode/decode...',
        outputPlaceholder: 'Result will appear here...',
        darkMode: '🌙 Dark',
        lightMode: '☀️ Light',
        toFrench: '🌍 FR',
        toEnglish: '🌍 EN'
    },
    fr: {
        title: 'Convertisseur Base64',
        input: 'Entrée',
        output: 'Sortie',
        encode: 'Encoder',
        decode: 'Décoder',
        clear: 'Effacer',
        copy: 'Copier',
        nothingtocopy: "Rien à copier",
        copied: 'Copié!',
        inputPlaceholder: 'Entrez le texte à encoder/décoder...',
        outputPlaceholder: 'Le résultat apparaîtra ici...',
        darkMode: '🌙 Sombre',
        lightMode: '☀️ Clair',
        toFrench: '🌍 FR',
        toEnglish: '🌍 EN'
    }
};

let currentLang = 'en';
let isDarkTheme = false;

function updateTexts() {
    const t = translations[currentLang];
    document.getElementById('title').textContent = t.title;
    document.getElementById('inputLabel').textContent = t.input;
    document.getElementById('outputLabel').textContent = t.output;
    document.getElementById('encodeBtn').textContent = t.encode;
    document.getElementById('decodeBtn').textContent = t.decode;
    document.getElementById('clearBtn').textContent = t.clear;
    document.getElementById('copyInput').textContent = t.copy;
    document.getElementById('copyOutput').textContent = t.copy;
    document.getElementById('input').placeholder = t.inputPlaceholder;
    document.getElementById('output').placeholder = t.outputPlaceholder;
    document.getElementById('themeToggle').textContent = isDarkTheme ? t.lightMode : t.darkMode;
    document.getElementById('langToggle').textContent = currentLang === 'en' ? t.toFrench : t.toEnglish;
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    updateTexts();
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    updateTexts();
}

function encode() {
    const input = document.getElementById('input').value;
    try {
        const encoded = btoa(input);
        document.getElementById('output').value = encoded;
    } catch (error) {
        document.getElementById('output').value = 'Error: Invalid input for encoding';
    }
}

function decode() {
    const input = document.getElementById('input').value;
    try {
        const decoded = atob(input);
        document.getElementById('output').value = decoded;
    } catch (error) {
        document.getElementById('output').value = 'Error: Invalid input for decoding';
    }
}

function clearAll() {
    document.getElementById('input').value = '';
    document.getElementById('output').value = '';
}

async function copyText(elementId, buttonElement) {
    const text = document.getElementById(elementId).value;
    try {
        if (text.length < 1) {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = translations[currentLang].nothingtocopy;
            setTimeout(() => {
                buttonElement.textContent = originalText;
            }, 1000);
            return;
        }
        await navigator.clipboard.writeText(text);
        const originalText = buttonElement.textContent;
        buttonElement.textContent = translations[currentLang].copied;
        setTimeout(() => {
            buttonElement.textContent = originalText;
        }, 1000);
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
}

// Initialize texts
updateTexts();