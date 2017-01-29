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
              createdAt: date
          };
          notes.push(new_note);
          storage.set({'notes': JSON.stringify(notes)}, function() {
              // Notify that we saved a new note and fire a user action.

          });
        });
      }
    }
  });
});
