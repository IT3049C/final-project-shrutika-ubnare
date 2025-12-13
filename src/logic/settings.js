const SETTINGS_KEY = "gamehub-settings";

export function loadSettings() {
    try {
        const raw = window.localStorage.getItem(SETTINGS_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function saveSettings(settings) {
    try {
        window.localStorage.setItem(SETTINGS_KEY,
            JSON.stringify(settings));
    } catch {
        // ignore
    }
}