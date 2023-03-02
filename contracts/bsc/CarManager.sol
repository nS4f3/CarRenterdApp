// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;



contract CarManager{
    address private owner;
    uint[] private carids;

    struct Car{
        uint id;
        string name;
        string imgUrl;
        bool avaliableforRent;
        uint rentFee; // for every minute
        uint saleFee;
    }


    mapping(uint => Car) public cars; // id to car mapping

    constructor(){
        owner = msg.sender;
        //cars[1] = Car(1,"default","url",true,10,100); //adding a new car
        // id 0 is used to check existance
    }

 

    

    function getCar(uint id) external view returns(Car memory){
        require(cars[id].id != 0,"Car is not exists!");
        return cars[id];
    }

    function getCarIds() external view returns(uint[] memory){
        return carids;
    }

    function addCar(uint id,string memory name, string memory url,uint rent,uint sale) external {
        require(cars[id].id == 0, "The car already exists!");
        cars[id] = Car(id,name,url,true,rent,sale);
        carids.push(id);
    }

    /*function deleteCar(uint id) external onlyOwner {
        require(cars[id].id != 0, "The car is not exists!");
        cars[id] = Car(id,name,url,true,rent,sale);
        carids.push(id);
    }*/

    function chechOutCar(uint id) external {
        require(cars[id].id != 0,"Car is not exists");
        cars[id].avaliableforRent = false;

    }


    function checkInCar(uint id) external{
        require(cars[id].id != 0,"Car is not exists");
        cars[id].avaliableforRent = true;
    }

    


}