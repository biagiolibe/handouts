var defaultSettings = {
    "active": true,
    "translate":true,
    "API_KEY_YANDEX": 'trnsl.1.1.20170325T223816Z.1ab15c5d3036ad4e.af8ad45157efd94fa0079b27eb412eb23cbfbd00'
};

var Settings = defaultSettings;

function load() {
    chrome.storage.sync.get('Settings', function(key) {
        console.log(key.Settings);
        if (key.Settings != null) {
            Settings=JSON.parse(key.Settings);

        } else {
            chrome.storage.sync.set({'Settings': JSON.stringify(defaultSettings)}, function() {
            });
        }
    });
}
load();
