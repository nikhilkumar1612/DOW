import React,{Component} from 'react';
import './pending.css';
import myProject from './abiandaddress';
import Onecar from './onecar';

class pending extends Component{
  constructor(props){
    super(props);
    this.state = {len : '', cars : []}
  }

  async componentDidMount() {
    const len = await myProject.methods.getCarsLength().call();
    const cars = [];
    for(let i=0;i<len;i++){
      let car = await myProject.methods.cars(i).call();
      if(!car.inspected){
        cars.push(car);
      }
    }
    console.log(cars);
    this.setState({len,cars});
  }


  render(){
    return (
      <div>
        <div className="warningp">This page only contains functionalities to car inspectors of our organization</div>
        <div className="info"> This Page only contains only inspection pending requests</div>
        <table>
          <tr>
            <th>CarID</th>
            <th>PhNumber</th>
          </tr>
          {this.state.cars.map(car=>{
              return(<Onecar
                key={car.carid}
                id={car.carid}
                phno={car.phno}
              />)
            })}
        </table>
      </div>
    );
  }
}

export default pending;