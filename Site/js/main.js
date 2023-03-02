var accounts = null;


var walletAddress;
var signer;
var Rentercontract;
//var CarManagercontract;
address = null;

user = null;

var register = document.getElementById("register");
var deposit = document.getElementById("deposit");
var addcar = document.getElementById("addcar");
var menu = document.getElementById("menuId");

var usr_name = document.getElementById("usr_name");
var sr_name  = document.getElementById("usr_srname");

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




window.addEventListener("load",async ()=>{ 
  console.log(user);
  if(user == null){
    const provider = new ethers.providers.Web3Provider(window.ethereum);

  
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

    Rentercontract = new ethers.Contract(RentercontractAddress, RentercontractAbi, signer);
    //CarManagercontract = new ethers.Contract(CarManagercontractAddress,CarManagercontractAbi,signer);
    address = await signer.getAddress();

    try {
      var res = await Rentercontract.Login(address);
      user = res;
      console.log(window.location.href.split("/")[window.location.href.split("/").length-1]);
      setUserAttr();
      console.log(await Rentercontract.getCar(1));
      listCars(await Rentercontract.getCar(1));
    } catch (error) {
      if(window.location.href.split("/")[window.location.href.split("/").length-1] != "Register.html"){
        console.log(window.location.href);
        window.location.href = "Register.html";
      }
    }
  }

    


    if(user == null){
      menu.addEventListener("click",()=> {
        window.location.href = "Register.html";
      });
    }
   


    if(deposit != null){
      deposit.addEventListener("click",async () => {
        window.location.href="deposit.html";

      });

      if(user["walletAddress"] != "Mine address"){
        addcar.style.display = "none";
      }
  
      addcar.addEventListener("click",() => {
  
        window.location.href = "addCar.html";
      });
    }
    else if(window.location.href.split("/")[window.location.href.split("/").length-1] == "Register.html"){
      
      register.addEventListener("click",async () => {

        try {
          var res = await Rentercontract.Register(address,usr_name.value,sr_name.value);
          user = res;
          window.location.href = "index.html";
        } catch (err) {
          alert("User already exists!")
          window.location.href = "index.html";
        }

      });
    }


    

      

});


function setUserAttr(){
  menu.innerHTML = user["name"];
  user_name.innerText = user["name"];
  user_sur.innerText = user["lastname"];
  user_balance.innerText = user["balance"] + " BNB";
  user_debt.innerText = user["debt"] + " BNB";

}

function listCars(car){
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
  console.log();
  if(Number(user["rentedCarId"]) != 0){
    carRent.disabled = true;
  }
  carRent.addEventListener("click", () => {

    
  });


  carView.appendChild(carName);
  carView.appendChild(carInfo);
  carView.appendChild(carImg);
  carView.appendChild(carRent);

  carList.appendChild(carView);

}

