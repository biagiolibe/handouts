angular.module('app').service('fileManager', function ($q) {
    var _this = this;

    this.createTXT = function (dataContent, filename) {
        var data = new Blob([dataContent], { type: 'text/plain;charset=utf-8' });
        saveAs(data, filename);
    };

    this.createPDF = function (dataContent, filename) {
      var docDefinition = {
        content: [
          {
            text: dataContent
          }
        ]
      };
      pdfMake.createPdf(docDefinition).download(filename||".pdf");
    };

});
