var accounts = null;


var walletAddress;
var signer;
var Rentercontract;
//var CarManagercontract;
var address = null;

var user = null;

var register = document.getElementById("register");


var usr_name = document.getElementById("usr_name");
var sr_name  = document.getElementById("usr_srname");








/* var CarManagercontractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"url","type":"string"},{"internalType":"uint256","name":"rent","type":"uint256"},{"internalType":"uint256","name":"sale","type":"uint256"}],"name":"addCar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cars","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"imgUrl","type":"string"},{"internalType":"bool","name":"avaliableforRent","type":"bool"},{"internalType":"uint256","name":"rentFee","type":"uint256"},{"internalType":"uint256","name":"saleFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"chechOutCar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"checkInCar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getCar","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"imgUrl","type":"string"},{"internalType":"bool","name":"avaliableforRent","type":"bool"},{"internalType":"uint256","name":"rentFee","type":"uint256"},{"internalType":"uint256","name":"saleFee","type":"uint256"}],"internalType":"struct CarManager.Car","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCarIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"}];

var CarManagercontractAddress = "0x7c43E72017d8732678a3a914ebd58d6CA8C76EB4";*/
var RentercontractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"}],"name":"Login","outputs":[{"components":[{"internalType":"address payable","name":"walletAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"lastname","type":"string"},{"internalType":"uint256","name":"rentedCarId","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"debt","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"internalType":"struct User","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"lastname","type":"string"}],"name":"Register","outputs":[{"components":[{"internalType":"address payable","name":"walletAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"lastname","type":"string"},{"internalType":"uint256","name":"rentedCarId","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"debt","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"internalType":"struct User","name":"","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"url","type":"string"},{"internalType":"uint256","name":"rent","type":"uint256"},{"internalType":"uint256","name":"sale","type":"uint256"}],"name":"addCar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"}],"name":"checkIn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"checkOut","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAvaliableCars","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getCar","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"imgUrl","type":"string"},{"internalType":"bool","name":"avaliableforRent","type":"bool"},{"internalType":"uint256","name":"rentFee","type":"uint256"},{"internalType":"uint256","name":"saleFee","type":"uint256"}],"internalType":"struct Car","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"walletAddress","type":"address"}],"name":"makePayment","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Set Contract Address
var RentercontractAddress = '0x933F4C6FA7499C44d943398b65B624e68F46d4B4'; // Add Your Contract address here!!!

// Set the Contract



address = sessionStorage.getItem("address");

window.addEventListener("load",async ()=>{ 
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    signer = provider.getSigner(address);

    Rentercontract = new ethers.Contract(RentercontractAddress, RentercontractAbi, signer);

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

});




