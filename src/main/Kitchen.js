import React, { Component } from "react";
import { Button, Table, Container } from "reactstrap";
import { socket } from "../global/header";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Doughnut } from 'react-chartjs-2';

class Kitchen extends Component {
  constructor() {
    super();
    // this.state = {
    //   food_data: []
    //   // this is where we are connecting to with sockets,
    // }; 
    this.state ={
      footballData: []
    }
  }

  getData = footballItems => {
    console.log(footballItems);
    this.setState({ footballData: footballItems });
  };

  changeData = () => socket.emit("initial_data");

  componentDidMount() {
    var state_current = this;
    socket.emit("initial_data");
    socket.on("get_data", this.getData);
    socket.on("change_data", this.changeData);
  }

  componentWillUnmount() {
    socket.off("get_data");
    socket.off("change_data");
  }

  markDone = id => {
    // console.log(predicted_details);
    socket.emit("mark_done", id);
  };

  getFoodData() {

  return this.state.footballData.map((x)=>{
    let data = {
      labels: ["Manchester United","Real Madrid"],
      datasets: [{
      label: "My First dataset",
      backgroundColor: ['rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)'],
      data: [x.ManchesterUnited,x.RealMadrid],
      }]
    }
    return(
      <Doughnut data={data} />
    )
  });

  }

  render() {

    return (
      <Container>
        <h2 className="h2Class">Kitchen Area</h2>
        {/* <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />

        <Table striped id="table-to-xls">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Created Till Now</th>
              <th>Predicted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{this.getFoodData()}</tbody>
        </Table> */}

          {this.getFoodData()}
      </Container>
    );
  }
}

export default Kitchen;
