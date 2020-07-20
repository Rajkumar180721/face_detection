import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/logos/Logo';
import ImageLink from '../components/ImageLink';
import {Signin, Register} from '../components/Signin/Signin';
import FaceRecognisedImage from '../components/FaceRecognisedImage';
import particlesOptions from '../components/ParticlesOptions';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: '3b5d11c9537f4007a1476c18dc91f369'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '', 
      box: {}, 
      route: 'Signin', 
      signinDisplay: 'signinUser',
      userName: '',
      email: '',
      id: '',
      entries: ''
    }
  } 

  OnClickSignin = ({value, id, userName, email, entries}) => {
    this.setState({
      route: value,
      id: id,
      userName: userName,
      email: email,
      entries: entries
    })
  }

  changeSignin = (value) => {
    this.setState({signinDisplay: value})
  }
  OnTextChange = (event) => {
    this.setState({ input: event.target.value })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);
    return ({
      topRow:  (clarifaiFace.top_row * height),
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: ( height) - (clarifaiFace.bottom_row * height),
      leftCol: clarifaiFace.left_col * width
    });
  }

  displayBox = (box) => {
    this.setState({box: box})
  }

  OnClick = () => {
    this.setState({ imageUrl: this.state.input} );
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then( response  => {
      document.getElementById('imageDiv').innerHTML = '';
      this.displayBox(this.calculateFaceLocation(response));

    })
    .then(() => {
      fetch('http://localhost:9999/image', {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body : JSON.stringify({
            id: this.state.id
        })
      })
      .then(response => response.json())
      .then(data => this.setState({entries: data}))
    })
    .catch(err => {
      document.getElementById('imageDiv').innerHTML = 'Oops, '+err;
    });
    }
  render() {
    return (
      <div>
        <Particles className='particles'
                params={particlesOptions} />
        { this.state.route === 'Signin'? <div> {this.state.signinDisplay === 'signinUser' ? <Signin OnClickSignin={this.OnClickSignin} change = {this.changeSignin} />: <Register OnClickSignin={this.OnClickSignin} change = {this.changeSignin} /> }</div> 
        :<div><Navigation OnClickSignin={this.OnClickSignin}/>
          <Logo />
           <ImageLink OnTextChange = {this.OnTextChange} OnClick = {this.OnClick} Name={this.state.userName} Entries={this.state.entries} />
          <FaceRecognisedImage  ImageUrl={this.state.imageUrl} Box={this.state.box} />
          </div>
        }
      </div>
    );
  }
}

export default App;