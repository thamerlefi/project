import React, { useEffect, useState } from "react";
import { getUser, reset, updateUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Profile() {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const auth = useSelector((state) => state.auth);
  useEffect(()=>{
    dispatch(reset())
  },[])
  
  useEffect(()=>{
    if(auth.user) {
      setFirstName( auth.user.firstName)
     setLastName( auth.user.lastName)
    }
  },[auth.user])
  

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [image, setImage] = useState('')
  const updatedProfile = {firstName,lastName,password,confirm,image}
  
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

  const updateUserHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser(updatedProfile))
    setPassword('')
    setConfirm('')
  }

  return (
    <div>
      {auth.user && (
        <>
          <Form onSubmit={updateUserHandler}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>first name</Form.Label>
              <Form.Control value={firstName} type="text" placeholder="update your first name" 
                onChange={(e)=>setFirstName(e.target.value)}
              />
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>last name</Form.Label>
              <Form.Control value={lastName} type="text" placeholder="update your last name" 
                onChange={(e)=>setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPicture">
              <Form.Label>change your picture</Form.Label>
              <Form.Control  type="file" accept="image/" onChange={uploadImgHandler} />
            </Form.Group>
            {image !== "" && <img src={image} alt="user img" style={{width: "60px",borderRadius:"5px"}} />}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>password</Form.Label>
              <Form.Control value={password} type="password" placeholder="update your password" 
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicConfirm">
              <Form.Label>confirm password</Form.Label>
              <Form.Control value={confirm} type="password" placeholder="confirm your password" 
                onChange={(e)=>setConfirm(e.target.value)}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              {auth.isLoading ? 'pending...' : 'update'}
            </Button>
          </Form>
        </>
      )}
      
    </div>
  );
}
