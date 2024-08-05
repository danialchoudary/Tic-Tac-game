let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newgame=document.querySelector("#newgame");
let msg=document.querySelector(".msg");
let turnX=true;
let winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const Reset=()=>{
    turnX=true;
    enable();
    msg.classList.add("hide");
}


boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if (turnX) {
           box.innerHTML="O";
           turnX=false; 
        } else {
            box.innerHTML="X";
            turnX=true;
        }
        box.disabled=true;
        checkwinner();
    })
});
const disable=()=>{
    for (const box of boxes) {
        box.disabled=true;
    }
}
const enable=()=>{
    for (const box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
}
const showwinner=(winner)=>{
    msg.innerText=`Winnner is ${winner}`;
    msg.classList.remove("hide");
    disable();
}

function checkwinner() {
    for (let paterns of winpatterns) {
    let posval1=boxes[paterns[0]].innerText;
    let posval2=boxes[paterns[1]].innerText;
    let posval3=boxes[paterns[2]].innerText;
    if (posval1!=""&& posval2!=""&& posval3!="") {
        if(posval1=== posval2 && posval2=== posval3){
showwinner(posval1);
    } 
    }
   
    }
       
}
    reset.addEventListener("click",Reset);
    newgame.addEventListener("click",Reset);