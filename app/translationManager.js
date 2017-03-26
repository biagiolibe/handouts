/*
* This service is responsible for the translation of captured notes, when the translation mode is active.
*/

//https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=it&dt=t&q=welcome

angular.module('app').service('translationManager', function ($q) {
    var _this = this;
    this.data = [];
    var sourceLang = 'auto';
    var targetLang = 'it';
    var sourceText = '';
    var API_KEY_GOOGLE='AIzaSyBI1gUFML7u2k19EO9g53DhtrShxVv0aBY';
    var API_KEY_YANDEX='trnsl.1.1.20170325T223816Z.1ab15c5d3036ad4e.af8ad45157efd94fa0079b27eb412eb23cbfbd00';


this.translate = function(text, source_lang, target_lang, callback) {

  if (text){
    sourceText = text;
  }


  if (source_lang){
    sourceLang = source_lang;
  }


  if (target_lang){
    targetLang = target_lang;
  }

  var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+API_KEY_YANDEX+"&text="+sourceText +"&lang=en-it";
// & [format=<text format>]
 //& [options=<translation options>]';

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
  xmlHttp.open( "GET", url, true ); // false for synchronous request
  xmlHttp.send( null );


  // Loads the JavaScript client library and invokes `start` afterwards.
  //gapi.load('client', this.start);

  /*
  var urlAPITranslationReq = "https://translation.googleapis.com/language/translate/v2?key="
                            + API_KEY + "&source="+ sourceLang +"&target="+ targetLang +"&q=" + encodeURI(sourceText);
  */
  /* Option 1

  var translatedText = LanguageApp.translate(sourceText, sourceLang, targetLang);

  /* Option 2

  var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+
            sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

  var result = JSON.parse(UrlFetchApp.fetch(url).getContentText());

  translatedText = result[0][0][0];

  var json = {
    'sourceText' : sourceText,
    'translatedText' : translatedText
  };
/*
  // set JSONP callback
  var callback = 'callback';
  if(e.parameter.callback){
    callback = e.parameter.callback;
  }

  // return JSONP
  return ContentService
           .createTextOutput(callback + '(' + JSON.stringify(json) + ')')
           .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
*/
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
