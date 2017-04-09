/*
* This service is responsible for the translation of captured notes, when the translation mode is active.
*/

//https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=it&dt=t&q=welcome

angular.module('app').service('translationManager', function ($q) {
    this.settings=chrome.extension.getBackgroundPage().Settings;



this.translate = function(sourceText, callback) {

  var langDir='';
  if(this.settings.translation.sourceLang != ''){
    langDir = this.settings.translation.sourceLang+'-';
  }
  langDir += this.settings.translation.targetLang;

  var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + this.settings.translation.API_KEY_YANDEX + "&text="+sourceText+"&lang="+langDir;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText).text[0]);
    };
  xmlHttp.open( "GET", url, false ); // false for synchronous request
  xmlHttp.send( null );

};

this.start = function(){
// Initializes the client with the API key and the Translate API.
      gapi.client.init({
        'apiKey': API_KEY,
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
      }).then(function() {
        // Executes an API request, and returns a Promise.
        // The method name `language.translations.list` comes from the API discovery.
        return gapi.client.language.translations.list({
          q: 'hello world',
          source: 'en',
          target: 'it',
        });
      }).then(function(response) {
        console.log(response.result.data.translations[0].translatedText);
      }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
      });
    };

});
