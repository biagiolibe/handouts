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
          if(settings.translate){

            makeTranslation(highlighted, settings.API_KEY_YANDEX, function(translated){
              new_note.translation=translated;

              notes.push(new_note);
              storage.set({'notes': JSON.stringify(notes)}, function() {
                  // Notify that we saved a new note and fire a user action.
              });
            });

          }

        });
      }
    }
  });

var makeTranslation = function(sourceText, API_KEY_YANDEX, callback){

  var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+API_KEY_YANDEX+"&text="+sourceText +"&lang=en-it";
// & [format=<text format>]
 //& [options=<translation options>]';

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText).text[0]);
    }
  xmlHttp.open( "GET", url, true ); // false for synchronous request
  xmlHttp.send( null );
};

});
