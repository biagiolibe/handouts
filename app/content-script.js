document.addEventListener('mouseup', function(tab) {

    var storage = chrome.storage.sync;
    storage.get('SETTINGS', function(keys) {
        if (keys.SETTINGS != null) {
            var settings = JSON.parse(keys.SETTINGS);

            if (!settings.active) {
                return;
            }

            var highlighted = window.getSelection().toString();
            var notes = {};

            if (highlighted) {
                storage.get('NOTES', function(obj) {
                    console.log(obj);
                    if (obj.NOTES != null) {
                        notes = JSON.parse(obj.NOTES);
                    }
                    var new_note = createNewNote(highlighted);

                    if (settings.translation.enabled) {
                        makeTranslation(highlighted, settings.translation.API_KEY_YANDEX, settings.translation.sourceLang, settings.translation.targetLang, function(translated) {
                            new_note.translation = translated;
                            notes.TRANSLATIONS.push(new_note);
                            storage.set({ 'NOTES': JSON.stringify(notes) }, function() {
                                //pushIntoStorage('sequences', sequences, function(){});
                            });
                        });
                    } else {
                        notes.NOTES.push(new_note);
                        storage.set({ 'NOTES': JSON.stringify(notes) }, function() {
                            //pushIntoStorage('NOTES', notes, function() {
                            // Notify that we saved a new note and fire a user action.
                        });
                    }
                });
            }
        }
    });

    var createNewNote = function(content) {
        return {
            id: guid(),
            content: content,
            page: 0, //find a way to manage active page
            paragraph: 0,
            createdAt: new Date(),
            translation: ''
        };
    };

    var makeTranslation = function(sourceText, API_KEY_YANDEX, sourceLang, targetLang, callback) {

        var langDir = '';
        if (sourceLang != '') {
            langDir = sourceLang + '-';
        }
        langDir += targetLang;

        var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + API_KEY_YANDEX + "&text=" + sourceText + "&lang=" + langDir;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(JSON.parse(xmlHttp.responseText).text[0]);
            } else {
                callback('');
            }
        };
        xmlHttp.open("GET", url, true); // false for synchronous request
        xmlHttp.send(null);
    };

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

});