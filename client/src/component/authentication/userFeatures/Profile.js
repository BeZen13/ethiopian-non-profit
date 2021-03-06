import React, {useState,useEffect, useContext} from 'react';
import axios from 'axios'
import {Link, Switch } from 'react-router-dom'
import styled from 'styled-components'
import {authContext, bearerAxios} from '../../providers/AuthProvider'
import {articleContext} from '../../providers/ArticleProvider'
import ProtectedRoute from '../ProtectedRoute'
import EditAfterPublished from './EditAfterPublished'
import UserInfo from './UserInfo'
import Likes from '../../displayingArticles/Likes'

const Profile = (props) => {
  const [articles, setArticles] = useState([])
  
  const {user} = useContext(authContext)
  const {setContent,setArticleForWriter} = useContext(articleContext)
  
  

  useEffect( () => {
    document.title = ` welcome ${user.name}`
    bearerAxios.get('/article/user/' + user._id)
    .then(res => {
 
      setArticles(prev => (res.data))
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  useEffect( () => {
    return () => {
      console.log('component unmounted')
      
      setArticles([])
    }
  },[])


  return (
    <div>
      <h1 data-testid='welcome-user'>{document.title}</h1>
        {user.imgUrl !== '' && <><img style={{height: 32, width: 32}} src={user.imgUrl} /><br /></>}
      <Link to='/profile-settings'>Profile Settings</Link>
      {articles.length > 0 ? articles.map( (article,i) => 
      <>
        <Link key={i} to={`/article/edit/${article._id}`}>
        
          <h1>{article.title}</h1>
            <h4>{article.description}</h4>
              <img src={article.displayImage} />
              <br />
              <Likes likes={article.likes} />
        </Link>
          <Switch>
            <ProtectedRoute exact path="/article/edit/:_id"> <EditAfterPublished
            article={article}
            /> </ProtectedRoute>
          </Switch>
      </>)
      :
      <>
        <p>You have no articles written.</p>
          <Link 
            
              to='/write-article'>
                  Start writing today.
            </Link>
      </>
    }
    </div>
  );
};



export default Profile;