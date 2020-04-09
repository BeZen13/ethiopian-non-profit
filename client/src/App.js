import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios'
import styled from 'styled-components'
import {Route, Switch} from 'react-router-dom'
import {Elements, StripeProvider, injectStripe} from 'react-stripe-elements';

import {authContext} from './component/providers/AuthProvider'
import ProtectedRoute from './component/authentication/ProtectedRoute'

import Signup from './component/authentication/Signup'
import Signin from './component/authentication/Signin'

import ArticleDisplay from './component/articleWriting/ArticleDisplay';
import CommingSoon from './component/CommingSoon';
import Donate from './component/Donate'

import AllArticles from './component/displayingArticles/AllArticles'


function App(props) {
  const initState = {firstName: '', lastName: '', email: ''}
  const [inputs, setInputs] = useState(initState)


  useEffect( () => {
    let pathname = window.location.pathname
    if (pathname === '/') { pathname = 'home' } 
    pathname = pathname.split('')
    pathname = pathname.filter(letter => letter !== '/' )
    pathname = pathname.join('')
    document.title = pathname
  }, [])



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
        <Route exact path="/"> <CommingSoon /> </Route>
        {/* <Route exact path="/donate"> <Donate /> </Route> */}

        
        <Route exact path="/signup"> <Signup /> </Route>
        <Route exact path="/signin"> <Signin /> </Route>
        <ProtectedRoute exact path="/write-article"> <ArticleDisplay /> </ProtectedRoute>
        <Route exact path='/articles'> <AllArticles /> </Route>
      </Switch>
      
        
      
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

