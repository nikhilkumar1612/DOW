import React,{Component} from 'react';
import './buy.css';
import web3 from './web3';
import myProject from './abiandaddress';
import Onecar from './onecar';

class buy extends Component{
  constructor(props){
    super(props);
    this.state = {len : '', cars : [], images:[], load:false}
  }

  async componentDidMount() {
    const len = await myProject.methods.getCarsLength().call();
    const cars = [];
    const images = [];
    for(let i=0;i<len;i++){
      let car = await myProject.methods.cars(i).call();
      if(car.inspected && !car.stop){
        let temp = [];
        let image1 = await myProject.methods.images(i,0).call();
        let image2 = await myProject.methods.images(i,1).call();
        let image3 = await myProject.methods.images(i,2).call();
        temp.push(image1);
        temp.push(image2);
        temp.push(image3);
        images.push(temp);
        cars.push(car);
      }
    }
    console.log(cars);
    console.log(images);
    this.setState({len,cars,images,load:true});
  }


  render(){
    if(!this.state.load){
      return(
        <div>
          <h4>Loading</h4>
        </div>
      );
    }
    return (
      <div>
        <a href="/bid">click here to bid a car</a>
        <table>
          <tr>
            <th>CarID</th>
            <th>PhNumber</th> 
            <th>Minmum Value(in Wei)</th>
            <th>Maximum Value(in Wei)</th>
            <th className="Description">Description</th>
            <th>Images</th>
          </tr>
          {this.state.cars.map((car, i)=>{
              return(
                  <tr>
                    <td>{car.carid}</td>
                    <td>{car.phno}</td>
                    <td>{car.basePrice}</td>
                    <td>{car.maxPrice}</td>
                    <td>{car.desc}</td>
                    <td>
                      <p>
                        <a href={`https://ipfs.io/ipfs/${this.state.images[i][0]}`}>IMAGE1</a>
                        <br/>
                        <a href={`https://ipfs.io/ipfs/${this.state.images[i][1]}`}>IMAGE2</a>
                        <br/>
                        <a href={`https://ipfs.io/ipfs/${this.state.images[i][2]}`}>IMAGE3</a>
                      </p>
                    </td>
                  </tr>
                );
            })}
        </table>
      </div>
    );
  }
}

export default buy;