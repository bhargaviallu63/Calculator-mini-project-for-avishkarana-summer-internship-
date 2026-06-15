let display = document.getElementById("display");
let history = document.getElementById("history");

// FIXED BRACKETS
function balanceBrackets(expr){
  let open = (expr.match(/\(/g) || []).length;
  let close = (expr.match(/\)/g) || []).length;

  while(open > close){
    expr += ")";
    close++;
  }
  return expr;
}

// INPUT
function append(val){
  let last = display.value.slice(-1);

  if("+-*/".includes(val) && "+-*/".includes(last)){
    display.value = display.value.slice(0,-1);
  }

  display.value += val;
}

function clearAll(){
  display.value = "";
}

function backspace(){
  display.value = display.value.slice(0,-1);
}

// SAFE ENGINE
function safeEval(expr){
  try{
    expr = balanceBrackets(expr);

    expr = expr.replace(/PI/g, "Math.PI");
    expr = expr.replace(/log10\(/g, "Math.log10(");
    expr = expr.replace(/log\(/g, "Math.log(");

    expr = expr.replace(/sin\(/g, "Math.sin((Math.PI/180)*");
    expr = expr.replace(/cos\(/g, "Math.cos((Math.PI/180)*");
    expr = expr.replace(/tan\(/g, "Math.tan((Math.PI/180)*");

    expr = expr.replace(/sqrt\(/g, "Math.sqrt(");

    let result = Function("Math", "return " + expr)(Math);

    if(!isFinite(result)) return "Error";

    return Math.round(result * 100000) / 100000;

  }catch{
    return "Error";
  }
}

// CALCULATE
function calculate(){
  if(display.value.trim() === "") return;

  let expr = display.value;
  let result = safeEval(expr);

  if(result === "Error"){
    display.value = "Invalid Expression";
    return;
  }

  let item = document.createElement("div");
  item.style.margin = "6px 0";

  item.innerHTML = `
    <span style="color:#aaa">${expr}</span> = <b>${result}</b>
  `;

  history.appendChild(item);
  history.scrollTop = history.scrollHeight;

  display.value = result;
}
