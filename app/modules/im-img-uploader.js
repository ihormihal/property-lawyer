/*
 * Angular - Directive "imDatatable"
 * im-datatable - v0.2.6 - 2016-04-26
 * https://github.com/ihormihal/IM-Framework
 * Ihor Mykhalchenko (http://mycode.in.ua/)
 */

angular.module('im-imgUpload', ['ngFileUpload'])

.directive('uploadImages', function() {
  return {
    restrict: 'E',
    scope: {
      name: '@',
      input: '@',
      title: '@',
      multiple: '@',
      locked: '@',
      updated: '=',
      output: '='
    },
    link: function($scope, $element, $attrs){
      $scope.contentUrl = $attrs.template;
      $attrs.$observe("template", function(template) {
        $scope.contentUrl = template;
      });
    },
    template: '<div ng-include="contentUrl"></div>',
    controller: [
      '$scope', '$element', '$attrs', '$parse', '$timeout', 'Upload',
      function($scope, $element, $attrs, $parse, $timeout, Upload) {
        $scope.files = [];
        $scope.output = [];
        $scope.updated = false;

        var multiple = false;
        if($attrs.multiple == 'true'){
          multiple = true;
          if($scope.input){
            $scope.output = angular.fromJson($scope.input);
            angular.forEach($scope.output, function(src) {
              $scope.output = $scope.input;
              $scope.files.push({src: src, loaded: true, loading: false, error: false, progress: 0});
            });
          }
        }else{
          multiple = false;
          if($scope.input){
            $scope.output[0] = $scope.input;
            $scope.files[0] = {src: $scope.input, loaded: true, loading: false, error: false, progress: 0};
          }
        }


        $scope.uploadFiles = function(files, errFiles) {
          $scope.errFiles = errFiles;

          angular.forEach(files, function(file) {
            if(!file) return false;
            $scope.files.push(file);
            file.upload = Upload.upload({
              url: $attrs.url,
              data: {
                file: file
              }
            });

            file.loading = true;
            file.upload.then(function(response) {

              var res = response.data;

              //if string
              if(typeof res === 'string'){
                if(!res == ''){
                  file.src = res;
                  file.loaded = true;
                }
              }

              //if json
              if(typeof res === 'object'){

                if(res.isArray){

                  if(res.length){
                    file.src = response.data[0];
                  }

                }else{

                  //if error
                  if(res.error){
                    file.error = res.error;
                  }else{
                    //if no error & is image
                    if(res.image){
                      file.src = res.image;
                      file.loaded = true;
                    }
                  }

                }

              }

              file.loading = false;
              $scope.updateValue();


            }, function(response) {
              if (response.status > 0){
                $scope.error = response.status + ': ' + response.data;
              }
              file.loading = false;

            }, function(e) {
              if(e.total > 0){
                file.progress = parseInt(e.loaded*100/e.total);
              }else{
                file.progress = 0;
              }

            });
          });
        };

        $scope.updateValue = function(){

          $scope.output = [];
          angular.forEach($scope.files, function(file) {

            if(file.src){
              $scope.output.push(file.src);
            }
          });
          if(multiple){
            $scope.input = angular.toJson($scope.output);
          }else{
            if($scope.output[0]){
              $scope.input = $scope.output[0];
            }else{
              $scope.input = '';
            }
          }
          $scope.updated = true;

        };

        $scope.deleteImg = function(index) {
          $scope.files.splice(index, 1);
          $scope.updateValue();
        };

      }
    ]
  };
});