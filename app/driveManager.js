angular.module('app').service('driveManager', function ($q) {

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '418173806542-l9ubcijpuo27dasr7rj03ie8deb3mas4.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  console.log('authResult');
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    console.log('handleAuthResult');
    authorizeDiv.style.display = 'none';
    loadDriveApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    console.log('handleAuthResult-else');
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Request the auth2 token.
 * Application ID needed. Register extension to the chrome store first.
 */
this.handleAuth =function() {
  chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
    if(chrome.runtime.lastError){
      console.log(chrome.runtime.lastError);
    }
  });
}

/**
 * Load Drive API client library.
 */
function loadDriveApi(callback) {
  gapi.client.load('drive', 'v3', callback);
}

/**
* Create a new file
*/
this.createFile=function(){

  var data='test text';

  var metadata = {
      'name': 'test',
      'mimeType': 'application/text'
    };

    var requestBody =
        'Content-Type: application/text\r\n\r\n' +
        data;

    var request = gapi.client.request({
        'path': '/upload/drive/v3/files',
        'method': 'POST',
        'params': {'uploadType': 'media'},
        'headers': {
          'Content-Type': 'media'
        },
        'body': requestBody});
    if (!callback) {
      callback = function(file) {
        alert(file);
      };
    }
    request.execute(callback);
}

/**
 * Print files.
 */
this.listFiles= function() {
  var request = gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    });
console.log('list');
    request.execute(function(resp) {
      appendPre('Files:');
      var files = resp.files;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          appendPre(file.name + ' (' + file.id + ')');
        }
      } else {
        appendPre('No files found.');
      }
    });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
};
});
