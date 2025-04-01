let fullOperation = '';
let ops='';
let arr=[];
function addNumber(number) {
    let op = fullOperation.split('');
    console.log(op);

    if (number === "=") {
        ops=fullOperation;
        calculate();
        return;
    }
    if(number==="c"){
        fullOperation='';
        showNumber()
        return
    }

    fullOperation = fullOperation + number.toString();
    showNumber();


}

function calculate() {
    let op=fullOperation.split("")
    
    if(op.includes('+')){
        let number = fullOperation.split('+');
        let result = Number(number[0]) + Number(number[1]);
        fullOperation = result.toString(); 
        ops+='='+fullOperation
        arr.push(ops)
        showNumber();
        showList();
        return;
    }

    else if(op.includes('-')){
        let number = fullOperation.split('-');
        let result = Number(number[0]) - Number(number[1]);
        fullOperation = result.toString(); 
        ops+='='+fullOperation
        arr.push(ops)
        showNumber();
        showList();
        return;
    }

    else if(op.includes('x')){
        let number = fullOperation.split('x');
        let result = Number(number[0]) * Number(number[1]);
        fullOperation = result.toString(); 
        ops+='='+fullOperation
        arr.push(ops)
        showNumber();
        showList();
        return;
    }

    else if(op.includes('^')){
        let number = fullOperation.split('^');
        let result = Math.pow(Number(number[0]), Number(number[1]));
        fullOperation = result.toString(); 
        ops+='='+fullOperation
        arr.push(ops)
        showNumber();
        showList();
        return;
    }
    
    if (number.length < 2 || number[1] === '') {
        console.error("Invalid operation");
        return;
    }

    console.log(result);
}

function showNumber() {
    document.getElementById('operation').innerHTML = fullOperation;
}

function showList(){
    let nHTML="";
    arr.forEach(function(item){
        nHTML+='<li>'+item+'</li>'
    });

    document.getElementById("history").innerHTML='<ul>'+nHTML+'</ul>'
}
