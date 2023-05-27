import React, { useEffect, useState } from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createNewProduct, deleteOneProduct, getAllProducts } from '../redux/slices/productSlice'
import { LinkContainer } from 'react-router-bootstrap'

export default function AdminProducts() {
    const dispatch = useDispatch()
    const products = useSelector(state=> state.products)

    //------------- modal states
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //------------ form states 
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [description,setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category,setCategory] = useState('')
    const [stock,setStock] = useState(0)

    useEffect(()=>{
        dispatch(getAllProducts())
    },[])
    useEffect(()=>{
      products.message && products.isSuccess && setShow(false)
    },[products.message, products.isSuccess])

    const uploadImgHandler = (e)=>{
      const file = e.target.files[0]
      const reader = new FileReader()
      if(file){
        reader.readAsDataURL(file)
        reader.onloadend = ()=> setImage(reader.result)
        
      } else{
        setImage('')
      }
    }
    const product = {name,price,description,image,category,stock}

    const addProductHandler = ()=>{
      dispatch(createNewProduct(product))
    }

    const deleteProductHandler = (id)=>{
      dispatch(deleteOneProduct(id))
      dispatch(getAllProducts())
    }

  return (
    // ------------------ add new product button
    <div className='mt-3'>
      <Button onClick={handleShow}>add new product</Button>
      <div className='mt-2'>
        {/* ------------------------- products list */}
        <ListGroup >
            {products.products.map(product => (
              <ListGroup.Item className='d-flex justify-content-between' key={product._id}>
                <div>
                <img style={{width:"30px",height:"30px",marginRight:"20px"}} src={product.image.secure_url} alt="" />
                {product.name}
                </div>

                <div>
                  <LinkContainer to={`/admin/products/update/${product._id}`}>
                    <button className='btn btn-warning me-2'>edit</button>
                  </LinkContainer>
                  <button onClick={()=>deleteProductHandler(product._id)} className='btn btn-danger'>delete</button>
                </div>
                </ListGroup.Item>
            ) )}
            
        </ListGroup>

        

        
    {/* ------------------add product MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control mt-1" placeholder="name of product" />
        <input onChange={(e)=>{setPrice(+e.target.value)}} type="number" className="form-control mt-1" placeholder="price ?" />
        <div className='mt-1'>
        <select onChange={(e)=>{setCategory(e.target.value)}} className="form-select"  >
            <option value='' >Choose category</option>
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            <option value="Camera">Camera</option>
            <option value="Accessories">Accessories</option>
        </select>
        </div>
        <input onChange={(e)=>{setDescription(e.target.value)}} type="text" className="form-control mt-1" placeholder="descrition" />
        <input type="file" accept="image/" onChange={uploadImgHandler} className="form-control mt-1"  />
        <input onChange={(e)=>{setStock(+e.target.value)}} type="number" className="form-control mt-1" placeholder="count in stock" />
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addProductHandler}>
            {products.isLoading ? "pending...": "add"}
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  )
}
