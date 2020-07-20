const particlesOptions = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true, 
          value_area:300
        }
      }
    },
    "interactivity":{
      "detect_on":"canvas",
      "events":{
        "onhover":{
          "enable":true,
          "mode":"repulse"
        },
        "onclick":{
          "enable":true,
          "mode":"bubble"
        }
      }
    }
  }

  export default  particlesOptions;