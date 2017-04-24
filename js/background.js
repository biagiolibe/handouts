/*
 * Background js controller.
 * Initialize all components of the Handouts app:
 *   -- Settings.
 *   -- db notes structure
 */

var storage = chrome.storage.sync;

var defaultSettings = {
    "active": true,
    "mainAccount": '',
    "translation": {
        "enabled": false,
        "API_KEY_YANDEX": 'trnsl.1.1.20170325T223816Z.1ab15c5d3036ad4e.af8ad45157efd94fa0079b27eb412eb23cbfbd00',
        "sourceLang": '',
        "targetLang": 'it'
    }
};
var base_struct = {
    NOTES: [],
    TRANSLATIONS: [],
};
var settings = defaultSettings;

var loadSettings = function() {
    storage.get('SETTINGS', function(key) {
        if (key.Settings != null) {
            settings = JSON.parse(key.Settings);
            console.log('Default settings loaded!');
        } else {
            storage.set({ 'SETTINGS': JSON.stringify(defaultSettings) }, function() {
                console.log('Default settings created!');
            });
        }
    });
};

var initializeDB = function() {
    //initialiaze db notes structure.
    storage.set({ 'NOTES': JSON.stringify(base_struct) }, function() {
        console.log('Database configured!');
    });
};

function initialize() {
    console.log('Installing Handouts...');
    loadSettings();
    initializeDB();
    console.log('Handouts installed and configured!');
}
initialize();