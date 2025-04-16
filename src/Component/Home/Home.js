import React from "react";
import Chart from "../Chart/Chart";
import Featured from "../featureds/Featured";
// import {  Row, Col } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { Container, Row, Col, Card } from 'react-bootstrap';
import HoverExtraCards from "../Hovercard/HoverExtraCards";

const Home = () =>{
    return(
        <div>
            <Container className="mt-4" style={{marginBottom:"100px"}}>
                <Row>
                    <Col md={6} >
                    <Card className="border-0">
                        <Featured/>
                    </Card>
                    </Col>
                    <Col md={6}>
                    <Card className="border-0">
                        <Chart/>
                    </Card>
                    </Col>
                </Row>
                </Container>
                <HoverExtraCards/>
                <Footer/> 
            
        </div>
    )
}
export default Home