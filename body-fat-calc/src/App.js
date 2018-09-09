import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: null,
      bodyfat: null,
      goalbodyfat: null,
      goalweight: null,
      height: null,
      rate: null
    }

    this.storeWeight.bind(this);
    this.storeBF.bind(this);
    this.storeGoalBF.bind(this);
    this.storeGoalWeight.bind(this);
    this.storeHeight.bind(this);
    this.storeRate.bind(this);
  
  }

  storeWeight(e) {
    e.preventDefault();
    this.setState({ weight: e.target.value });
  }

  storeBF(e) {
    e.preventDefault();
    this.setState({ bodyfat: e.target.value });
  }

  storeGoalBF(e) {
    e.preventDefault();
    this.setState({ goalbodyfat: e.target.value });
  }

  storeGoalWeight(e) {
    e.preventDefault();
    this.setState({ goalweight: e.target.value });
  }

  storeHeight(e) {
    e.preventDefault();
    this.setState({ height: e.target.value });
  }

  storeRate(e) {
    e.preventDefault();
    this.setState({ rate: e.target.value });
  }

  calcLeanBodyMass() {
    var currentWeight = this.state.weight;
    var currentBodyFat = this.state.bodyfat/100;
    var lbm = currentWeight * (1- currentBodyFat);
    return lbm;
  }

  calcFatMass() {
    var currentWeight = this.state.weight;
    var currentBodyFat = this.state.bodyfat;
    var fm = currentWeight * currentBodyFat;
    return fm;
  }

  calcGoalWeight() {
    var goalBF = this.state.goalbodyfat/100;
    var goalLbm = this.calcLeanBodyMass() * .97;
    var gw = goalLbm/(1- goalBF);
    return gw;
  }

  calcTimeToAbs() {
    var currentWeight = this.state.weight;
    var goalWeight = this.calcGoalWeight();
    var rateOfLoss = this.state.rate;
    var tta = (currentWeight-goalWeight)/rateOfLoss;
    return tta;
  }

  calcResults() {
    var LBM = this.calcLeanBodyMass();
    var FM = this.calcFatMass();
    var GW = this.calcGoalWeight();
    var TTA = this.calcTimeToAbs();
    var results = (
      <div> 
        <p>Your Lean Body Mass is {LBM}</p>
        <p>Your Total Fat Mass is {FM}</p>
        <p>Your Goal Weight to achieve a Six-Pack is {GW}</p>
        <p>The time it will take for you to get a Six-Pack is {TTA}</p>
      </div>
    );
    return results;
  }

  render() {
    const infoInput = (
      <form onSubmit={this.calcResults}>
        <label>Your current weight:
          <input type="number" placeholder="Enter your weight in pounds." onChange={this.storeWeight} />
        </label>
        <label>Your current body fat percentage:
          <input type="number" placeholder="Enter your body fat percentage." onChange={this.storeBF} />
        </label>
        <label>Your height:
          <input type="number" placeholder="Enter your height in inches." onChange={this.storeHeight} />
        </label>
        <label>Your goal for body fat percentage:
          <input type="number" placeholder="Enter your goal body fat percentage." onChange={this.storeGoalBF} />
        </label>
        <label>Choose a consistent rate of weight loss.
          <select name="Rate Of Weight Loss" size="1" onChange={this.storeRate}>
            <option value="0.5">0.5lbs a week</option>
            <option value="1.0">1.0lbs a week</option>
            <option value="1.5">1.5lbs a week</option>
            <option value="2.0">2.0lbs a week</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <main>
          <div>
            {infoInput}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
