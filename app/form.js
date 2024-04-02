'use client'
import {Button, Form} from 'antd'

export function FormComponent(){


    return(
        <form onSubmit={(val)=>console.log("TEST",val)}>
          <input value="asdfasdf" />
          <input value="asdfasdasdf"/>
          <Button type="primary" htmlType="submit" >submit</Button>
        </form>
    )
}