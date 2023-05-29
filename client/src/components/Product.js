import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating'


export default function Product({product}) {
  return (

        <div className="col-3 mb-3">
        <Card style={{ width: '17rem' }}>
        <Card.Img variant="top" style={{width:"100%", height:"250px",objectFit:"cover"}} src={product.image.secure_url} />
        <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        {/* <Card.Text>{product.description}</Card.Text> */}
        <Button variant="primary">add to cart</Button>
        {/* {<Rating />} */}
        </Card.Body>
        </Card>
        </div>
  )
}
