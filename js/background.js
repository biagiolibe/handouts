/*
* Background js controller.
* Initialize all components of the Handouts app:
*   -- Settings.
*   -- db notes structure
*/

var storage = chrome.storage.sync;

var defaultSettings = {
    "active": true,
    "mainAccount":'',
    "translation":{
                  "enabled":true,
                  "API_KEY_YANDEX": 'trnsl.1.1.20170325T223816Z.1ab15c5d3036ad4e.af8ad45157efd94fa0079b27eb412eb23cbfbd00',
                  "sourceLang":'',
                  "targetLang":'it'
                  }
};
var base_struct = {

};
var settings = defaultSettings;

var loadSettings = function(){
    storage.get('Settings', function(key) {
        console.log(key.Settings);
        if (key.Settings != null) {
            settings=JSON.parse(key.Settings);

        } else {
            storage.set({'Settings': JSON.stringify(defaultSettings)}, function() {
            });
        }
    });
};

var initializeDB = function(){
    //initialiaze db notes structure.
};

function initialize() {
    loadSettings();
    initializeDB();
}
initialize();
