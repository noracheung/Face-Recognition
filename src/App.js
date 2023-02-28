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


const PAT = '5d461db2e57044aeacb132b262e10981';
const APP_ID = 'c2ce9b91e8d04dd892682b9c5b685256';
const USER_ID = 'o0wtm58xir2t';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = 'fe995da8cb73490f8556416ecf25cea3';    

//let app = new Clarifai.App({apiKey: "d385b781557c4c03a8256f302b6bf91c"});



function App() {

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState ("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});
  

  //Test whether connect to backend
  //  useEffect(() => {                     //run everytime when function component render
  //    fetch("http://localhost:2002")
  //    .then(res => res.json())
  //    .then(data => console.log(data))
  //    return () => { } 
  //  }, [])                                //[variable], only run useeffect when update variable's value
  //                                           //[], = only run once when ComponentDidMount, intially render



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

  // const handleSubmit = () => {
  //   setImageUrl (input);

  //   app.models.predict({id:'face-detection', version:'fe995da8cb73490f8556416ecf25cea3'}, input)
  //     .then(response => {
  //       if (response) {
  //         fetch("https://face-recognition-api-7dx7.onrender.com/image", {
  //           //fetch("http://localhost:2000/image", {
  //           method: "put",
  //           headers: {"Content-Type": "application/json"},
  //           body: JSON.stringify({
  //               id: user.id
  //             })
  //           }
  //         )
  //         .then(resp => resp.json())
  //         .then(count => {
  //           //console.log(count)
  //           setUser((prev) => ({...prev, entries: count.entries}))
  //         })
  //       }
        
  //       displayBox(calculateBox(response))
  //     } )
  //     .catch(err => console.log(err) )
  // }

  const handleSubmit = () => {
    console.log(input)
    setImageUrl (input);
      const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": input
                        }
                    }
                }
            ]
        });

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(data => { 
        displayBox(calculateBox(data))
        setUser((prev) => ({...prev, entries: prev.entries + 1}))
        
      })
      .catch(error => console.log('error', error));

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
