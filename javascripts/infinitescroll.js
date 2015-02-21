(function () {
    angular.module('infinitescrollModule', [])
        .directive('listInfinitescroll', function () {
            return{
                restrict: 'E',
                scope: {
                    listTitle: '@',
                    datasource: '=',
                    doLoadMore: '=',
                },
                transclude: 'true',
                templateUrl: 'listview.html',
                link: function (scope, element, attrs) {
                   scope.divWidth = document.getElementById('myDiv').offsetWidth -60
                    scope.loadMore = function () {
                        if (scope.doLoadMore)  scope.doLoadMore()
                    }
                }

            }
        })
        .directive('inject', function () {
            return{
                restrict: 'A',
                link: function (scope, element, attrs, ctrl, transcludeFn) {
                    if (!transcludeFn) return;
                    transcludeFn(scope, function (clone) {
                        element.empty();
                        element.append(clone);
                    });
                }
            }
        })
        .directive('whenScrollBottom', function () {
            return function (scope, elem, attr) {
                var scrollBar = elem[0]
                elem.bind('scroll', function () {
                    if (scrollBar.scrollTop + scrollBar.offsetHeight >= scrollBar.scrollHeight) {
                        scope.$apply(attr.whenScrollBottom);
                    }
                })
            }
        })
})()
