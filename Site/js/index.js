var accounts = null;


var walletAddress;
var signer;
var Rentercontract;
//var CarManagercontract;
var address = null;

var user = null;


var deposit = document.getElementById("deposit");
var payDebt = document.getElementById("makePayment");
var addcar = document.getElementById("addcar");
var menu = document.getElementById("menuId");


var user_name = document.getElementById("user_name");
var user_sur = document.getElementById("user_sur");
var user_balance = document.getElementById("user_balance");
var user_debt = document.getElementById("user_debt");

var carList = document.getElementById("rentList");





/* var CarManagercontractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"url","type":"string"},{"internalType":"uint256","name":"rent","type":"uint256"},{"internalType":"uint256","name":"sale","type":"uint256"}],"name":"addCar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cars","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"imgUrl","type":"string"},{"internalType":"bool","name":"avaliableforRent","type":"bool"},{"internalType":"uint256","name":"rentFee","type":"uint256"},{"internalType":"uint256","name":"saleFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"chechOutCar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"checkInCar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getCar","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"imgUrl","type":"string"},{"internalType":"bool","name":"avaliableforRent","type":"bool"},{"internalType":"uint256","name":"rentFee","type":"uint256"},{"internalType":"uint256","name":"saleFee","type":"uint256"}],"internalType":"struct CarManager.Car","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCarIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"}];

var CarManagercontractAddress = "0x7c43E72017d8732678a3a914ebd58d6CA8C76EB4";*/
var RentercontractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"}],"name":"Login","outputs":[{"components":[{"internalType":"address payable","name":"walletAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"lastname","type":"string"},{"internalType":"uint256","name":"rentedCarId","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"debt","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"internalType":"struct User","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"lastname","type":"string"}],"name":"Register","outputs":[{"components":[{"internalType":"address payable","name":"walletAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"lastname","type":"string"},{"internalType":"uint256","name":"rentedCarId","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"debt","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"internalType":"struct User","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"url","type":"string"},{"internalType":"uint256","name":"rent","type":"uint256"},{"internalType":"uint256","name":"sale","type":"uint256"}],"name":"addCar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"}],"name":"checkIn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"checkOut","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAvaliableCars","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getCar","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"imgUrl","type":"string"},{"internalType":"bool","name":"avaliableforRent","type":"bool"},{"internalType":"uint256","name":"rentFee","type":"uint256"},{"internalType":"uint256","name":"saleFee","type":"uint256"}],"internalType":"struct Car","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"}],"name":"makePayment","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Set Contract Address
var RentercontractAddress = '0x933F4C6FA7499C44d943398b65B624e68F46d4B4'; // Add Your Contract address here!!!

// Set the Contract


address = sessionStorage.getItem("address");
window.addEventListener("load",async ()=>{

    const provider = new ethers.providers.Web3Provider(window.ethereum);
  if(address == null){
    
    async function connect(){
      if(typeof window.ethereum !== 'undefined') {
             
              
              accounts =  await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Or connect to a node
        } 

    
        return accounts;
    }
       
  
    accounts = await connect();
    walletAddress = accounts[0];
    signer = provider.getSigner(walletAddress);

    address = await signer.getAddress();

    sessionStorage.setItem("address",address);
    
    //CarManagercontract = new ethers.Contract(CarManagercontractAddress,CarManagercontractAbi,signer);

  }

  
  signer = provider.getSigner(address);

  Rentercontract = new ethers.Contract(RentercontractAddress, RentercontractAbi, signer);

  if(user == null){
    
    try {
        var res = await Rentercontract.Login(address);
        user = res;
        setUserAttr();

        if(user["rentedCarId"] != 0){
          listCar(await Rentercontract.getCar(user["rentedCarId"]),true);
        }
        else{
          listCars(await Rentercontract.getAvaliableCars());
        }
        
      } catch (error) {
          window.location.href = "Register.html";
      } 
  }
  else{
    
    setUserAttr();
    if(user["rentedCarId"] != 0){
      listCar(await Rentercontract.getCar(user["rentedCarId"]),true);
    }
    else{
      listCars(await Rentercontract.getAvaliableCars());
    }
  }

    if(user == null){
      menu.addEventListener("click",()=> {
        window.location.href = "Register.html";
      });
    }
   


    deposit.addEventListener("click",async () => {
       
    window.location.href="deposit.html";

    });

    if(user["walletAddress"] != "0x09DDC1422Be2cc959fe5CC71977babf752a394f1"){
        addcar.style.display = "none";
    }
  
        addcar.addEventListener("click",() => {
  
            window.location.href = "addCar.html";
    });

    if(user["debt"] <= 0){
      makePayment.style.display="none";
    }

    payDebt.addEventListener("click",async () => {
      await Rentercontract.makePayment(address);
      window.location.reload();
    });
     

});



function setUserAttr(){
  menu.innerHTML = user["name"];
  user_name.innerText = user["name"];
  user_sur.innerText = user["lastname"];
  user_balance.innerText = (Number(user["balance"]) / 10**18) + " BNB";
  user_debt.innerText = (Number(user["debt"]) / 10**18) + " BNB";

}


async function  listCars(cars)  { 
  for(var i = 0; i < cars.length;i++){
    listCar(await Rentercontract.getCar(cars[i]),false);
  }
  
}




function listCar(car,rented){
  if(rented == true){
    const carView = document.createElement("div");
      carView.classList.add("carView");
  
      const carName = document.createElement("p");
      carName.classList.add("name");
      carName.innerText = car["name"];
  
      const carInfo = document.createElement("p");
      carInfo.classList.add("info");
      carInfo.innerText = Number(car["rentFee"]) / 10**18; /* 1 BNB is 10**18 wie*/ 
  
    const carImg = document.createElement("img");
    carImg.classList.add("car-image");
    carImg.setAttribute("src",car["imgUrl"]);
  
    const carRent = document.createElement("button");
    carRent.classList.add("rent");
    carRent.innerText = "Check In";

    carRent.addEventListener("click", async () => {
      //check in car
      await Rentercontract.checkIn(address);
      window.location.reload();
    });
  
  
    carView.appendChild(carName);
    carView.appendChild(carInfo);
    carView.appendChild(carImg);
    carView.appendChild(carRent);
  
    carList.appendChild(carView);
  }
  else{
    if(car["avaliableforRent"] == true){
      const carView = document.createElement("div");
      carView.classList.add("carView");
  
      const carName = document.createElement("p");
      carName.classList.add("name");
      carName.innerText = car["name"];
  
      const carInfo = document.createElement("p");
      carInfo.classList.add("info");
      carInfo.innerText = Number(car["rentFee"]) / 10**18; /* 1 BNB is 10**18 wie*/ 
  
    const carImg = document.createElement("img");
    carImg.classList.add("car-image");
    carImg.setAttribute("src",car["imgUrl"]);
  
    const carRent = document.createElement("button");
    carRent.classList.add("rent");
    carRent.innerText = "Rent";
    if(Number(user["rentedCarId"]) != 0){
      carRent.disabled = true;
    }
    carRent.addEventListener("click", async () => {
      //check out car

      await Rentercontract.checkOut(address,car["id"]);
      window.location.reload();
    });
  
  
    carView.appendChild(carName);
    carView.appendChild(carInfo);
    carView.appendChild(carImg);
    carView.appendChild(carRent);
  
    carList.appendChild(carView);
    }
  }

}




