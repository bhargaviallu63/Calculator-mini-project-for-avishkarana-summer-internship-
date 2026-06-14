let display = document.getElementById("display");
let history = document.getElementById("history");

function append(val){
  let last = display.value.slice(-1);

  if("+-*/".includes(val) && "+-*/".includes(last)){
    return;
  }

  display.value += val;
}

function clearAll(){
  display.value = "";
}

function backspace(){
  display.value = display.value.slice(0,-1);
}

// SAFE EVALUATION ENGINE
function safeEval(expr){
  try{
    expr = expr.replace(/PI/g, "Math.PI");
    expr = expr.replace(/log10\(/g, "Math.log10(");
    expr = expr.replace(/log\(/g, "Math.log(");

    // DEGREE conversion for trig
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

function calculate(){
  if(display.value.trim() === "") return;

  let expr = display.value;
  let result = safeEval(expr);

  let item = document.createElement("div");
  item.style.margin = "6px 0";

  item.innerHTML = `
    <span>${expr} = ${result}</span>
  `;

  history.appendChild(item);
  history.scrollTop = history.scrollHeight;

  display.value = result;
}
