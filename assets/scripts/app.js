 const defaultResult = 0;
 let currentResult = defaultResult;
 let logEntries = [];
 
 function getUserNumberInput(){
    return parseInt(usrInput.value);
 }


 function creatAndWriteLog(operator, resultBeforeCalc, calcNumber){
     const calcDescription = `${currentResult} ${operator} ${calcNumber}`;
     outputResult(currentResult , calcDescription);
 }

 function add(){
    const enteredNumber =  getUserNumberInput();
    const initialResult = currentResult;
    currentResult += enteredNumber;
    //currentResult + +userInput.value;  
    creatAndWriteLog('+',initialResult,enteredNumber);
    logEntries.push(enteredNumber);
    const logEntry = {
        operation: 'ADD',
        prevResult: initialResult,
        number: enteredNumber,
        result: currentResult
    } 
    console.log(logEntries);
}

function substract(){
    const enteredNumber =  getUserNumberInput();
    const initialResult = currentResult;
    currentResult -= enteredNumber;
    creatAndWriteLog('-',initialResult,enteredNumber);
}

function multiply(){
    const enteredNumber =  getUserNumberInput();
    const initialResult = currentResult;
    currentResult *= enteredNumber;
    creatAndWriteLog('*',initialResult,enteredNumber);
}

function divide(){
    const enteredNumber =  getUserNumberInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;
    creatAndWriteLog('/',initialResult,enteredNumber);
}


addBtn.addEventListener('click',  add);
subtractBtn.addEventListener('click',  substract);
multiplyBtn.addEventListener('click',  multiply);
divideBtn.addEventListener('click',  divide);

 

