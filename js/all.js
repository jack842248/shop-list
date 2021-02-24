let shoppingList = JSON.parse(localStorage.getItem("dataName")) || [];
let list = document.getElementById("list");
let inputItem = document.getElementById("inputItem");
let inputPrice = document.getElementById("inputPrice");
let total = document.getElementById("total");
let status = document.getElementById("status");
let body = document.body;

//** 顯示資料 **//
function showData(){
    let str = "";
    for(let i=0 ; i<shoppingList.length ; i++){
        str += 
        `
        <tr>
            <td class="h5">${i+1}</td>
            <td class="h5">${shoppingList[i].item}</td>
            <td class="h5">${shoppingList[i].price}</td>
            <td class="h5">
                <span class="btn btn-dark" data-num="${i}">X</sapn>
            </td>
        </tr>
        `
        list.innerHTML = str;
    }
}
showData();

//** 上傳資料 **//
function upData(){
let shoppingListStr = JSON.stringify(shoppingList);
localStorage.setItem("dataName",shoppingListStr);
}

//** (點擊)新增資料 **//
function addData(){
    let inputItemVal = inputItem.value;
    let inputPriceVal = inputPrice.value;

    if(inputItemVal == ""){
        alert("請輸入品項");
    }else if(inputPriceVal == ""){
        alert("請輸入金額");
    }else{
        shoppingList.push({item:inputItemVal,price:inputPriceVal});
        inputItem.value = "";
        inputPrice.value = "";
        upData();
        list.innerHTML = "";
        showData();
        calcTotal();
        status.textContent = `狀態:你新增了${inputItemVal}`;
    }
}
inputBtn.addEventListener("click",addData,false);

//** (按下enter)新增資料 **//
function keydownaddData(event){
    if(event.keyCode == "13"){
        let inputItemVal = inputItem.value;
        let inputPriceVal = inputPrice.value;
    
        if(inputItemVal == ""){
            alert("請輸入品項");
        }else if(inputPriceVal == ""){
            alert("請輸入金額");
        }else{
            shoppingList.push({item:inputItemVal,price:inputPriceVal});
            inputItem.value = "";
            inputPrice.value = "";
            upData();
            list.innerHTML = "";
            showData();
            calcTotal();
            status.textContent = `狀態:你新增了${inputItemVal}`;
        }
    }
}
body.addEventListener("keydown",keydownaddData,false);



//** (點擊)刪除資料 **//
function deleteData(e){
    e.preventDefault();
    if(e.target.tagName === "SPAN"){
        let targetNum = e.target.dataset.num;
        shoppingList.splice(targetNum,1);
        upData();    
        list.innerHTML = "";       
        showData();
        calcTotal();
        let id = Number(targetNum) + 1;
        status.textContent = `狀態:你刪除了第${id}項`;
    }
}
list.addEventListener("click",deleteData,false);

//** 計算總價 **//
function calcTotal(){
    let totalPrice = 0;
    total.textContent = totalPrice;
    for(let i=0 ; i<shoppingList.length ; i++){
        totalPrice+= Number(shoppingList[i].price);
        total.textContent = totalPrice;
    }
}
calcTotal();