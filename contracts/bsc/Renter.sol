// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;


struct User{
        address  payable walletaddress	;
        string name;
        string lastname;
        uint rentedCarId;
        uint balance;
        uint debt;
        uint start;
        uint end;
    }

struct Car{
        uint id;
        string name;
        string imgUrl;
        bool avaliableforRent;
        uint rentFee; // for every minute
        uint saleFee;
    }


interface UserManagement{
    function isUser(address payable walletAddress) external view returns(bool);
    function getAvaliableCars() external view returns(uint[] memory);
    function getCar(uint id) external view returns(Car memory);
    function addUser(address payable walletAddress,string memory name, string memory lastname) external;
    function getUser(address payable walletAddress) external view returns(User memory);
    function checkOut(address payable walletAddress,uint id) external;
    function checkIn(address payable walletAddress) external;
    function deposit(address payable walletAddress,uint amount) payable external;
    function makePayment(address payable walletAddress) external;

}

interface CarManagementforRenter{
	function addCar(uint id,string memory name, string memory url,uint rent,uint sale) external;
}


contract Renter{
    address private owner;
    address private carManagerAddress = 0x0C6E3E42C773AdE1bAAa893f35cC9DF5d677B6CC;
    address private userManagementAddress = 0x59d83B6bA3DBD2D03CD4c2685933A35dc6D7F3d0;

    constructor(){
        owner = msg.sender;
    
    }

    modifier onlyOwner(){
        require(msg.sender == owner,"Only owner required");
        _;
    }

    function Login(address payable walletAddress) public view returns(User memory){
        require(UserManagement(userManagementAddress).isUser(walletAddress),"The user is not exists!");
        return UserManagement(userManagementAddress).getUser(walletAddress);

    }

    function Register(address payable walletAddress,string memory name,string memory lastname) public returns(User memory){
        UserManagement(userManagementAddress).addUser(walletAddress,name,lastname);
        return UserManagement(userManagementAddress).getUser(walletAddress);
    }

    function checkOut(address payable walletAddress,uint id) public {
        UserManagement(userManagementAddress).checkOut(walletAddress,id);
    }
    function checkIn(address payable walletAddress) public {
        UserManagement(userManagementAddress).checkIn(walletAddress);
    }

    function deposit(address payable walletAddress) payable public {
        UserManagement(userManagementAddress).deposit(walletAddress,msg.value);
    }

    function makePayment(address payable walletAddress) public {
        UserManagement(userManagementAddress).makePayment(walletAddress);
    }

    function getAvaliableCars() public view returns(uint[] memory){
        return UserManagement(userManagementAddress).getAvaliableCars();
    }

    function getCar(uint id) public view returns(Car memory){
        return UserManagement(userManagementAddress).getCar(id);
    }

    function addCar(uint id,string memory name, string memory url,uint rent,uint sale) public onlyOwner{
    	CarManagementforRenter(carManagerAddress).addCar(id,name,url,rent,sale);

    }


}