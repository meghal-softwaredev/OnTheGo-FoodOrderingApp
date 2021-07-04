import './Login.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loadGoogleScript } from '../lib/GoogleLogin';

const googleClientId ="Your Google Client ID";
const Login = () => {
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const history = useHistory();

  const onSuccess = (googleUser) => { 
    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };
  
  const onFailure = () => {
    setIsLoggedIn(false);
  }
  
  const logOut = () => { 
    (async() => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };
  
  const renderSigninButton = (_gapi) => { 
    _gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'ux_mode': 'redirect',
      'longtitle': true,
      'theme': 'dark',
      'redirect_uri': 'http://localhost:3000/restaurant',
      'onsuccess': onSuccess,
      'onfailure': onFailure 
    });
  }
  
  
  useEffect(() => {
    
    window.onGoogleScriptLoad = () => { 
     
      const _gapi = window.gapi; 
      setGapi(_gapi);
      
      _gapi.load('auth2', () => { 
        (async () => { 
          const _googleAuth = await _gapi.auth2.init({ 
           client_id: googleClientId
          });
          setGoogleAuth(_googleAuth); 
          renderSigninButton(_gapi); 
        })();
      });
    }
    
    loadGoogleScript(); 
    
  }, []);

  return (
    <div className="lcontainer">
      <div className="container-item"  >
      <h2>OnTheGO - <span style={{color:"green",fontStyle:"italic"}}> Food Ordering </span> </h2>
      </div>
      <div className="container-item txt"><h2 >Welcome back</h2></div>
      
      <div className="container-item login"  >
      {!isLoggedIn &&
        <div id="google-signin" className="googleSignIn" > </div>
      }
      
      {isLoggedIn &&
        <div>
          <div>
            <img src={imageUrl} alt="pic"/>
          </div>
          <div>{name}</div>
          <div>{email}</div>
          <button className='btn-primary' onClick={logOut}>Log Out</button>
        </div>
      }
      <div class="divider"/>
      <div className="container-item">
      <button type="submit" className="lbtn" onClick={
        history.replace(`/restaurant`)}>Continue without Sign-In</button>
      </div>
    </div>
  </div>
  );
  }
export default Login;
