import React from 'react';
import Slider from './components/slider';
import UserInputs from './components/userInputs';
import Error from './components/Error';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      imageArr: [],
      imageArrLength: 0,
      currentImage: 1,
      autoPlayInterval: 2,
      player: null,
      autoPlayDurationError: false,
      autoPlayDirection: '1',
      autoPlayDirectionNew: null
    };
  }

  componentDidMount() {
    fetch("https://demo5110359.mockable.io/images")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loading: true,
            imageArr: result.images,
            imageArrLength: result.images.length - 1,
          });
        },
        (error) => {
          this.setState({
            loading: true,
            error
          });
        }
      )

      // Start sliders autoplay after the component output has been rendered to the DOM
      this.autoplay();
  }

  // For functionality of next & prev click event
  // Where 1 is defined as next event & 0 is for previous
  controllers = (type) => {
    type === 1 ? this.setState({
      currentImage: this.state.currentImage !== this.state.imageArrLength ? this.state.currentImage + 1 : 1
    }) : this.setState({
      currentImage: this.state.currentImage !== 0 ? this.state.currentImage - 1 : this.state.imageArrLength
    })

    // Trigger autoplay again to get a little pause between the autoplay & controller event
    // To get a pause clearInterval defined in autoplay()
    setTimeout(() => {
      this.autoplay();
    }, 100);
  }

  // To trigger slider automatically defined setInterval inside autoplay() where the default time interval is 2000s
  // Both interval & direction can be changed dynamically by user from UserInputs.js
  autoplay = () => {
    clearInterval(this.state.player);
    this.setState({
      player: setInterval(() => {

        // Direction of the slider is by default forward defined as 1 & 0 is defined for backward
        if(this.state.autoPlayDirection === '1') {
          this.setState({currentImage: this.state.currentImage !== this.state.imageArrLength ? this.state.currentImage + 1 : 1})
        } else if(this.state.autoPlayDirection === '0') {
          this.setState({
            currentImage: this.state.currentImage !== 0 ? this.state.currentImage - 1 : this.state.imageArrLength
          })
        }
      }, this.state.autoPlayInterval * 1000)
    })
  }

  //Once user edit time interval & direction & try to submit form then this function will trigger
  handleSubmit = (event) => {
    event.preventDefault();

    //If user changed only time interval not direction to manage that autoPlayDirectionNew state is used
    this.setState({autoPlayDirection: this.state.autoPlayDirectionNew ? this.state.autoPlayDirectionNew : this.state.autoPlayDirection});

    //Trigger autoplay() again to apply new changes
    if(!this.state.autoPlayDurationError) {
      setTimeout(() => {
        this.autoplay();
      }, 200);
    }
  }

  //While editing the form saving inputs here with change event check
  handleChange = (e, type) => {

    //Expression to check entered value in Duration field is number
    const numberExp = /^[0-9\b]+$/;

    //To manage multiple types of filed. value 1 is defined for Duration check & 0 is defined for Direction check
    if(type === 1) {
      if ((numberExp.test(e.target.value)) && e.target.value > 0) {
        this.setState({autoPlayInterval: e.target.value, autoPlayDurationError: false})
      } else if(e.target.value <= 0) {
        this.setState({autoPlayInterval: e.target.value, autoPlayDurationError: true})
      }
    } else if(type === 0) {
      this.setState({autoPlayDirectionNew: e.target.value});
    }
  }
  
  render() {
    if(this.state.error) {
      return <Error />
    } else if(!this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <section className="inner">
          <UserInputs {...this.state} submit={this.handleSubmit} valueUpdate={this.handleChange} />
          <Slider {...this.state} controllers={this.controllers} />
        </section>
      );
    }
  }
}

export default App;