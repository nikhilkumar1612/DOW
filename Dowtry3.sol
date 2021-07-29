pragma solidity ^0.4.17;

contract Dowtry3{
    address public owner;
    uint public n=0;
    mapping(address=>bool) public inspectors;
    
    struct car{
        uint carid;
        address seller;
        uint phno;
        uint basePrice;
        uint maxPrice;
        bool inspected;
        bool stop;
        uint[] phnobidders;
        uint[] bids;
    }
    
    car[] public cars;
    
    function Dowtry3() public{
        owner=msg.sender;
    }
    
    function inspectorAddRemove(address _address)public{
        assert(msg.sender == owner);
        inspectors[_address] ? inspectors[_address]=false : inspectors[_address]=true;
    }
    
    function postAd(uint _phno)public{
        car memory newCar = car({
            carid:n,
            seller : msg.sender,
            phno : _phno,
            basePrice : 0,
            maxPrice : 0,
            inspected : false,
            stop : false,
            phnobidders : new uint[](0),
            bids : new uint[](0)
        });
        cars.push(newCar);
        n=n+1;
    }
    
    function inspect(uint i, uint _basePrice, uint _maxPrice)public{
        car storage temp = cars[i];
        assert(inspectors[msg.sender]);
        assert(!temp.inspected);
        temp.inspected=true;
        temp.basePrice = _basePrice;
        temp.maxPrice = _maxPrice;
    }
    
    function bid(uint i, uint _bidValue, uint _phno)public{
        car storage temp = cars[i];
        assert(_bidValue>temp.basePrice && _bidValue<=temp.maxPrice);
        assert(temp.inspected);
        assert(!temp.stop);
        assert(msg.sender != temp.seller);
        temp.bids.push(_bidValue);
        temp.phnobidders.push(_phno);
    }
    
    function stopBid(uint i)public{
        assert(msg.sender == cars[i].seller);
        assert(!cars[i].stop);
        cars[i].stop=true;
    }
    
    function getphnobidders(uint i)public view returns(uint[]){
        return cars[i].phnobidders;
    }
    
    function getbids(uint i)public view returns(uint[]){
        return cars[i].bids;
    }
    
    function getNoOfBids(uint i)public view returns(uint){
        return cars[i].bids.length;
    }
}
