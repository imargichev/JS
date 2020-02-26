 const defaultResult = 0;
 let currentResult = defaultResult;
 let result;

 function add(){
    currentResult = currentResult + userInput.value;
    outputResult(currentResult , '');
}

addBtn.addEventListener('click',  add);

 

