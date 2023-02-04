import './App.css';
import React, {useState } from 'react';
import Navigation from './Component/Navigation/Navigation';
import Logo from './Component/Logo/Logo';
import Rank from './Component/Rank/Rank';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Component/FaceRecognition1/FaceRecognition';
import Clarifai from 'clarifai';
import Signin from './Component/Signin/Signin';
import Register from './Component/Register/Register';
import {useEffect} from 'react';



let app = new Clarifai.App({apiKey: "d385b781557c4c03a8256f302b6bf91c"});


function App() {

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState ("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});

  //Test whether connect to backend
  //  useEffect(() => {
  //    fetch("http://localhost:2000")
  //    .then(res => res.json())
  //    .then(data => console.log(data))
  //    return () => { } 
  //  }, [])

  const loadUser = data => {
    console.log(data)
    setUser(data)
  }

  const calculateBox = data => {
    const boxLocation = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: boxLocation.left_col * width,
      topRow: boxLocation.top_row * height,
      rightCol: width - (boxLocation.right_col * width),
      bottomRow: height - (boxLocation.bottom_row * height)
    }
  };

  const displayBox = (figure) => {
    console.log(figure);
    setBox(figure);
  }


  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const handleSubmit = () => {
    setImageUrl (input);

    app.models.predict({id:'face-detection', version:'fe995da8cb73490f8556416ecf25cea3'}, input)
      .then(response => {
        if (response) {
          fetch("http://localhost:2000/image", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: user.id
              })
            }
          )
          .then(resp => resp.json())
          .then(count => {
            //console.log(count)
            setUser((prev) => ({...prev, entries: count.entries}))
          })
        }
        
        displayBox(calculateBox(response))
      } )
      .catch(err => console.log(err) )
  }

  const handleRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <Navigation isSignedIn = {isSignedIn} onRouteChange = {handleRouteChange}/>
      { route === "home" ? 
         <>
         <Logo />
         <Rank name = {user.name} entries = {user.entries}/>
         <ImageLinkForm onChange = {handleChange} onSubmit = {handleSubmit}/>
         <FaceRecognition box ={box} imageUrl = {imageUrl}/>
         </> : (
          route === "signin" ? 
          <Signin onRouteChange = {handleRouteChange} loadUser = {loadUser}/> :
          <Register onRouteChange = {handleRouteChange} loadUser = {loadUser}/>
         )
       }
    </div>
  ); 
}

export default App;
