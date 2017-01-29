var defaultSettings = {
    "active": true
};

var Settings = defaultSettings;

function load() {
    chrome.storage.sync.get('Settings', function(key) {
        console.log(key.Settings);
        if (key.Settings != null) {
            Settings=JSON.parse(key.Settings);
            // return JSON.parse(key.Settings);
        } else {
            chrome.storage.sync.set({'Settings': JSON.stringify(defaultSettings)}, function() {
            });
        }
    });
}
load();
