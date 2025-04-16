import React from "react";
import "./chart.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Container, Row } from "react-bootstrap";

const data = [
  { name: "January", value: 1200 },
  { name: "February", value: 2100 },
  { name: "March", value: 800 },
  { name: "April", value: 1600 },
  { name: "May", value: 900 },
  { name: "June", value: 1700 },
];

const Chart = () =>{
    return(
      <div className="chart" style={{paddingTop:"20px",marginRight:"10px"}}>
        <Container>
      <Row>
          <ResponsiveContainer width="100%" height={430}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
      </Row>
    </Container>
      
    </div>
    )
}
export default Chart;