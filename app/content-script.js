document.addEventListener('mouseup', function(tab) {

  var storage=chrome.storage.sync;
  storage.get('Settings', function(keys) {
    if(keys.Settings != null){
      var settings=JSON.parse(keys.Settings);

      if(!settings.active){
        return;
      }

      var highlighted = window.getSelection().toString();

      if(highlighted){
        var notes=[];
        var id = 1;
        var date=new Date();

        storage.get('notes', function(obj){
          if(obj.notes != null){
            notes=JSON.parse(obj.notes).slice(0);
          }
          var new_note = {
              id: +date,
              content: highlighted,
              createdAt: date,
              translation: ''
          };

          if(settings.translation.enabled){
              makeTranslation(highlighted, settings.translation.API_KEY_YANDEX, settings.translation.sourceLang, settings.translation.targetLang, function(translated){
                new_note.translation=translated;

                notes.push(new_note);
                storage.set({'notes': JSON.stringify(notes)}, function() {
                    // Notify that we saved a new note and fire a user action.
                });
            });
          }
          else{
            notes.push(new_note);
            storage.set({'notes': JSON.stringify(notes)}, function() {
                // Notify that we saved a new note and fire a user action.
            });
          }
        });
      }
    }
  });

var makeTranslation = function(sourceText, API_KEY_YANDEX, sourceLang, targetLang, callback){

  var langDir='';
  if(sourceLang != ''){
    langDir = sourceLang+'-';
  }
  langDir += targetLang;

  var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + API_KEY_YANDEX + "&text="+sourceText+"&lang="+langDir;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText).text[0]);
  }
  xmlHttp.open( "GET", url, true ); // false for synchronous request
  xmlHttp.send( null );
};

});
