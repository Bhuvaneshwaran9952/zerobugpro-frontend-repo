import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaymentRepeated = () =>{
    return(
       <Container className="mt-4">
        {/* Header */}
        <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white p-3">
            <h2 className="mb-0">You Have a Good Future</h2>
            
            <div className="d-flex gap-2">
                <Link to="/repeatedform" className="btn btn-info btn-sm">Pay [$]</Link>
                <Link to="/repeatedtotal" className="btn btn-light btn-sm">Totel [$]</Link>
            </div>
        </div>


       </Container>
    )
}

export default PaymentRepeated;