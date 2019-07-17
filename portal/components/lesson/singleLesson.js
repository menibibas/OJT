apple.controller('singleLesson', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$q', 'userService', 'Upload','server',
    function($rootScope, $scope, $state, $stateParams, $http, $q, userService, Upload, server) {
  
        $scope.lessonId = $stateParams.lessonId;
        $scope.lessonNum = $stateParams.lessonNum;
        $scope.courseId = $stateParams.courseId;
      
        $scope.getAttendanceOfLesson = function() {
            var data = {};
            data.lessonid = $scope.lessonId;
            server.requestPhp(data, "GetStudentsAttendance").then(function(data) {
                $scope.stundentsAttandance = data;
                console.log($scope.stundentsAttandance);
            });
        }
    
        
        $scope.getAttendanceOfLesson();
    
        $scope.GetAttendanceStatuses = function() {
            var data = {};
            server.requestPhp(data, "GetAttendanceStatuses").then(function(data) {
                $scope.AttendanceStatusesTags = data;
                console.log($scope.AttendanceStatusesTags);
            });
        }
    
        $scope.GetAttendanceStatuses();
    
        $scope.query = "";
      $scope.filterStudent = function(student) {
        if (student.firstname.toLowerCase().includes($scope.query.toLowerCase()) || 
        student.lastname.toLowerCase().includes($scope.query.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      };
      
        $scope.UpdateAttendeeStatus = function(student) {
            var data={};
            var async = $q.defer(); 
            if (student.checkstudentid==null) {
                data.lessonid=$scope.lessonId;
                data.status = student;
                data.student = student;
                console.log(data);
                server.requestPhp(data, 'AddCheckStudentStatus').then(function (data) {
                    console.log("Success in saving status");
                    async.resolve(data); // --> no data came back
                }, function (err) {
                    console.error(err);
                    async.reject(error);
                });
                return async.promise;
            } else {
                data.lessonid=$scope.lessonId;
                data.status = student;
                data.student = student;
                console.log(data);
                server.requestPhp(data, 'UpdateCheckStudentStatus').then(function (data) {
                    console.log("Success in saving status");
                    async.resolve(data); // --> no data came back
                }, function (err) {
                    console.error(err);
                    async.reject(error);
                });
                return async.promise;
            }
            
        }
    
    
    
        $scope.backSingleCourse = function(){
            $state.transitionTo('singleCourse', {courseId: $scope.courseId});
            window.history.back();
        };
           
    
    }]);