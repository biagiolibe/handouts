angular.module('app').service('storageManager', function($q) {
    var _this = this;
    this.data = {};
    this.options = {};

    this.findAll = function(callback) {
        chrome.storage.sync.get('NOTES', function(keys) {
            if (keys.NOTES != null) {
                try {
                    _this.data = JSON.parse(keys.NOTES);
                } catch (e) {
                    this.removeAll();
                } finally {
                    callback(_this.data);
                }

            }
        });
    };

    this.updateSettings = function(settings) {
        chrome.storage.sync.set({ 'SETTINGS': JSON.stringify(settings) }, function() {});
    };


    this.sync = function() {
        chrome.storage.sync.set({ 'NOTES': JSON.stringify(this.data) }, function() {
            console.log('Data is stored in Chrome storage');
        });
    };


    this.add = function(newContent) {
        var date = new Date();
        var id = +date;
        var note = {
            id: guid(),
            content: content,
            page: 0, //find a way to manage active page
            paragraph: 0,
            createdAt: new Date(),
            translation: ''
        };
        this.data.NOTES.push(note);
        this.sync();
    };

    this.remove = function(note) {
        this.data.NOTES.splice(this.data.NOTES.indexOf(note), 1);
        this.sync();
    };

    this.removeAll = function() {
        this.data.NOTES = [];
        this.sync();
    };

    this.hashCode = function(string) {
        var hash = 0,
            i, chr, len;
        if (this.length === 0) return hash;
        for (i = 0, len = this.length; i < len; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

});