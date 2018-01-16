function Set() {
	
	
	this.intersection = function(listA, listB) {
    
	   var resultList = [];
       
	   if (listA === null || listB === null) {
	   		return null;
	   }

	   for (var i = 0; i < listA.length; i++) {
	   		var nextValue = listA[i];

	   		for (var j = 0; j < listB.length; j++) {
	   			if (listB[j] === nextValue) {
	   				resultList.push(listB[j]);
	   				break;
				}
			}
	   }
       
	   return resultList;
	}
    
    
    
	this.union = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

	   var one = this.relativeComplement(listA, listB);
	   var two = this.relativeComplement(listB, listA);
	   var three = this.intersection(listA, listB);



	   for (var i = 0; i < one.length; i++) {
           resultList.push(one[i]);
       }

        for (var j = 0; j < two.length; j++) {
            resultList.push(two[j]);
        }

        for (var k = 0; k < three.length; k++) {
            resultList.push(three[k]);
        }
	   
	   return resultList;
	}




	this.relativeComplement = function(listA, listB) {

	   var resultList = [];
       
	   if (listA === null || listB === null) {
	   		return null;
	   }

	   if (listB.length === 0) {
	   		return listA;
	   }


	   for (var i = 0; i < listA.length; i++) {
	   		var nextValue = listA[i];

	   		for (var j = 0; j < listB.length; j++) {
	   			if (listB[j] === nextValue) {
	   				break;
				}
				if (j === listB.length - 1) {
                    resultList.push(listA[i]);
                    break;
				}
			}
	   }
	   return resultList;
	}



	this.symmetricDifference = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

	   var one = this.relativeComplement(listA, listB);
	   var two = this.relativeComplement(listB, listA);

	   for (var i = 0; i < one.length; i++) {
	   		resultList.push(one[i]);
	   }

	   for (var j = 0; j < two.length; j++) {
	   		resultList.push(two[j]);
	   }


	   return resultList;
	}	
	

}
