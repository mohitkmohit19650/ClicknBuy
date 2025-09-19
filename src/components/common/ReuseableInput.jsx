import React from 'react'
import {Form } from 'react-bootstrap'
const ReuseableInput = ({type="text", placeholder="", name="", value="", onChange, className="" }) => {
    return (
        <>
            <Form.Control 
            type={type} 
            placeholder={placeholder} 
            name={name}
            value={onChange ? value : undefined}
            onChange={onChange}
            className={className}
            />
        </>
    )
}

export default ReuseableInput