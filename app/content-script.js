document.addEventListener('mouseup', function(tab) {
  var storage=chrome.storage.sync;
  var highlighted = window.getSelection().toString();
  if(highlighted){
    var notes=[];
    var id = 1;
    var date=new Date();

    storage.get('notes', function(obj){
      if(obj.notes !== null){
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
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

      // if(request.type == 'CREATE_FILE'){
      //   var data = new Blob([request.dataContent], { type: request.typeContent });
      //   saveAs(data, request.filename);
      // }
});


String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
