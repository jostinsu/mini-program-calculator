/**
 * Created by jostinsu on 2017/2/14.
 */
function calculate(sExpress){
    var mPriority = {
        "$" : 0,
        "+" : 1,
        "-" : 1,
        "*" : 2,
        "/" : 2
    };
    var sExpress = sExpress + "$",
        nCurrentNum = 0,
        sCurrentOperator = "",
        aNumStack = [],
        aExpressOperator = ["$"],
        nCalculateResult = 0;

    function stepCalculate(nCurrentNum,sCurrentOperator){
        var sLastExpressOperator = aExpressOperator[aExpressOperator.length-1];
        if(mPriority[sLastExpressOperator] < mPriority[sCurrentOperator]){
            aExpressOperator.push(sCurrentOperator);
            aNumStack.push(nCurrentNum);
        }else{
            if(sCurrentOperator == "$" && sLastExpressOperator == sCurrentOperator){
                nCalculateResult = nCurrentNum;
                return;
            }
            var nCalculateValue = getCalculatedValue(aNumStack.pop(),nCurrentNum,aExpressOperator.pop());
            stepCalculate(nCalculateValue,sCurrentOperator);
        }
    }

    function getCalculatedValue(num1,num2,operator){
        var nCalculateValue = 0;
        switch(operator){
            case "+" :
                nCalculateValue = num1 + num2;
                break;
            case "-" :
                nCalculateValue = num1 - num2;
                break;
            case "*" :
                nCalculateValue = num1 * num2;
                break;
            case "/" :
                nCalculateValue = num1 / num2;
                break;
        }
        return nCalculateValue;
    }

    for(var expressLen = sExpress.length, i = 0; i < expressLen; i++){
        if(!isNaN(sExpress[i])){
            nCurrentNum = nCurrentNum * 10 + parseInt(sExpress[i]);
            continue;
        }else{
            sCurrentOperator = sExpress[i];
        }
        stepCalculate(nCurrentNum,sCurrentOperator);
        nCurrentNum = 0;
    }
    return nCalculateResult;
}

module.exports = {
  calculate: calculate
}