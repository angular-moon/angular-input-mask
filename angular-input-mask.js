
var maxlength = 0;

function mask(val, arrFormat) {
  if (!val) {
    return '';
  }
  var format;
  var value = String(val).replace(/\D/g, '');
  var length = arrFormat.length;
  if (length > 1) {
    format = arrFormat[length-1];
    for (var i=0; i<length; i++) {
      if (value.replace(/\D/g, '').length <= (maxlength = arrFormat[i].replace(/\D/g, '').length)) {
        format = arrFormat[i];
        break;
      }
    }
  }else{
    format = arrFormat[0];
    maxlength = format.replace(/\D/g, '').length;
  }
  var newValue = '';
  for (var nmI = 0, mI = 0; mI < format.length;) {
    if (!value[nmI]) {
      break;
    }
    if (format[mI].match(/\D/)) {
      newValue += format[mI];
    } else {
      newValue += value[nmI];
      nmI++;
    }
    mI++;
  }
  return newValue;
}
  
angular.module('ngMask', [])
  .directive('ngMask', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, el, attrs, model) {
       
        var arrFormat = attrs.ngMask.split('|');

        if (arrFormat.length > 1) {
          arrFormat.sort(function (a, b) {
            return a.length - b.length;
          });
        }

        model.$formatters.push(function (value) {
          return !value ? '' : mask(String(value).replace(/\D/g, ''), arrFormat);
        });

        model.$parsers.push(function (value) {
          model.$viewValue = mask(value, arrFormat);
          var modelValue = String(value).replace(/\D/g, '').slice(0, maxlength);
          el.val(model.$viewValue);
          return modelValue;
        });
      }
    };
  })
.filter("mask", function(){
   return function(input, _mask) {
      var arrFormat = _mask.split('|');
      if (arrFormat.length > 1) {
          arrFormat.sort(function (a, b) {
            return a.length - b.length;
          });
        }
      return mask(input || '', arrFormat);
  };
});