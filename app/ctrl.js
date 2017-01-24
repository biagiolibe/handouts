'use strict';

angular.module('app').controller('ctrl', function ($scope, storageManager, driveManager, fileManager) {

    $scope.storageManager = storageManager;
    $scope.driveManager=driveManager;
    $scope.fileManager=fileManager;
    var views={
      home:true,
      filePreview:false
    };

    $scope.$watch('storageManager.data', function() {
        $scope.noteList = $scope.storageManager.data;
    });

    $scope.storageManager.findAll(function(data){
        $scope.noteList = data;
        $scope.$apply();
    });

    $scope.add = function() {
        storageManager.add($scope.newContent);
        $scope.newContent = '';
    }

    $scope.remove = function(note) {
        storageManager.remove(note);
    }

    $scope.removeAll = function() {
        storageManager.removeAll();
    }

    /*
    * Create a new drive document
    */
    $scope.create = function(){
      driveManager.createFile();
    }

    /*
    * List all document
    */
    $scope.list = function(){
      driveManager.handleAuth();
    }

    $scope.generateFile = function(fileType){
      var text='';

      for (var note in $scope.noteList) {
        text = text + $scope.noteList[note].content + '\n\n';
      }
      $scope.text_document = {
        text_content:text,
        document_type: fileType,
        content_length:text.length
      };

      views.filePreview=true;
      views.home=false;

    }

    $scope.createFile=function(txtContent, fileType){
      if(fileType == 'TXT'){
        fileManager.createTXT(txtContent, 'handouts_document');
      }
      else if(fileType == 'PDF'){
        fileManager.createPDF(txtContent, 'handouts_document');
      }
    }


    $scope.isFilePreview=function(){
      return views.filePreview;
    }

    $scope.isHome=function(){
      return views.home;
    }

    $scope.backToHome=function(from){
      views[from]=!views[from];
      views['home']=true;
    }

});
angular.module('app').filter('unsafe', function($sce) {//spostare in filters
    return function(val) {
      return $sce.trustAsHtml(val);
    };

}).directive('elastic', ['$timeout', function($timeout) { //spostare in directives
        return {
            restrict: 'A',
            link: function($scope, element) {
                $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                var resize = function() {
                    element[0].style.height = $scope.initialHeight;
                    element[0].style.height = "" + element[0].scrollHeight + "px";
                };
                element.on("input change", resize);
                $timeout(resize, 0);
            }
        };
    }
]);

/*
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {dataContent: txtContent, type: 'CREATE_FILE'}, function(response) {
    fileManager.createFile(txtContent, 'text/plain;charset=utf-8', 'handouts_generatedFile.txt');
  });
});
*/