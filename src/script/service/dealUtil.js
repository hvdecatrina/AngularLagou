'use strict'

angular.module("app").service('dealUtil' , [ function () {
	this.shuffle = function (array) {
		var _array = array.concat();
		for (var i = _array.length; i--; ) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = _array[i];
			_array[i] = _array[j];
			_array[j] = temp;
		}
  		return _array;
	};
	this.removeItem = function (arr,item) {
		for(var i = 0 ; i < arr.length ; i++){
			if(arr[i] = item){
				arr.splice(i,1)
				break;
			}
		}
		return arr;
	}
}])