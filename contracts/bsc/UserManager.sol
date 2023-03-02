// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

struct Car{
        uint id;
        string name;
        string imgUrl;
        bool avaliableforRent;
        uint rentFee;
        uint saleFee;
    }

struct User{
        address payable walletAddress;
        string name;
        string lastname;
        uint rentedCarId;
        uint balance;
        uint debt;
        uint start;
        uint end;
    }

interface CarManagement{
    function chechOutCar(uint id) external;
    function getCar(uint id) external view returns(Car memory);
    function checkInCar(uint id) external;
    function getCarIds() external view returns(uint[] memory);
}



contract UserManager{
    address private owner;
    address private carManagerAddress = 0x0C6E3E42C773AdE1bAAa893f35cC9DF5d677B6CC;

    mapping(address => User) public users;

    constructor(){
        owner = msg.sender;
    
    }

    modifier onlyOwner(){
        require(msg.sender == owner,"Only owner required");
        _;
    }


    function isUser(address payable walletAddress) external view returns(bool){//to use it externally
        return users[walletAddress].walletAddress != 0x0000000000000000000000000000000000000000;
    }

    function isAUser(address payable walletAddress) internal view returns(bool){
        return users[walletAddress].walletAddress != 0x0000000000000000000000000000000000000000;
    }


    function addUser(address payable walletAddress,string memory name, string memory lastname) external{
        require(!isAUser(walletAddress), "The user already exists!");
        users[walletAddress] = User(walletAddress,name,lastname,0,0,0,0,0);
     
    }

    function getUser(address payable walletAddress) external view returns(User memory){
        require(isAUser(walletAddress), "The user is not exists!");
        return users[walletAddress];
    }

    function calculateDebt(address payable walletAddress) internal view returns(uint){
        uint usedMinute = (users[walletAddress].end - users[walletAddress].start) / 60;
        uint fee = CarManagement(carManagerAddress).getCar(users[walletAddress].rentedCarId).rentFee;

        return usedMinute * fee;
    }


    function checkOut(address payable walletAddress,uint id) external{
        require(isAUser(walletAddress),"The user is not exists!");
        require(users[walletAddress].balance > 0, "The user has no balance!");
        require(users[walletAddress].rentedCarId == 0, "There is already a rented car for this user!");
        require(users[walletAddress].debt <= 0, "The user has debt!");
        users[walletAddress].start = block.timestamp;
        users[walletAddress].rentedCarId = id;
        CarManagement(carManagerAddress).chechOutCar(id);

    }
    

    function checkIn(address payable walletAddress) external{
        require(isAUser(walletAddress),"The user is not exists!");
        require(users[walletAddress].rentedCarId != 0, "There is no rented car for this user!");
        users[walletAddress].end = block.timestamp;
        users[walletAddress].debt = calculateDebt(walletAddress);
        users[walletAddress].start = 0;
        users[walletAddress].end = 0;
        CarManagement(carManagerAddress).checkInCar(users[walletAddress].rentedCarId);
        users[walletAddress].rentedCarId = 0;

    }

    function deposit(address payable walletAddress,uint amount) payable external {
        require(isAUser(walletAddress),"The user is not exists!");
        users[walletAddress].balance += amount;
    }

    function makePayment(address payable walletAddress) external{
        require(isAUser(walletAddress),"The user is not exists!");
        require(users[walletAddress].debt > 0, "The user has no debt!");
        require(users[walletAddress].debt <= users[walletAddress].balance, "The user has no creadit to pay!");
        users[walletAddress].balance -= users[walletAddress].debt;
        users[walletAddress].debt = 0;
    }


    function getAvaliableCars() external view returns(uint[] memory){
        return CarManagement(carManagerAddress).getCarIds();
    }
    function getCar(uint id) external view returns(Car memory){
        return CarManagement(carManagerAddress).getCar(id);
    }

    


}