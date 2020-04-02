import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios'
import styled from 'styled-components'
import {Route, Switch} from 'react-router-dom'
import {Elements, StripeProvider, injectStripe} from 'react-stripe-elements';

import {authContext} from './component/providers/AuthProvider'

import Signup from './component/authentication/Signup'
import Signin from './component/authentication/Signin'

import MakeInputs from './component/MakeInputs'
import CommingSoon from './component/CommingSoon';
import Donate from './component/Donate'


function App(props) {
  const initState = {firstName: '', lastName: '', email: ''}
  const [inputs, setInputs] = useState(initState)


  useEffect( () => {
    
  }, [])

  console.log(window.location)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSumit')
  }
  const handleChange = e => {
    const {name, value} = e.target;
    setInputs(prev => ({...prev, [name]: value}))
  }

  return (<>
    <Container>
      <Switch>
        <Route exact path="/" render={rProps => <CommingSoon />} />
        <Route exact path="/signup" render={rProps => <Signup />} />
        <Route exact path="/signin" render={rProps => <Signin />} />
        <Route exact path="/write-article" render={rProps => <MakeInputs />} />
      
        
      </Switch>
      
        {/* <Donate /> */}
      
    </Container>
  </>);
}

const Container = styled.div`

  text-align: center;
  img {
    height: 70%;
    width: 60%;
  }

`;


export default App;

