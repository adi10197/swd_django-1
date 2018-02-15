import React from "react";
import PropTypes from "prop-types";

function networkErrorHandler(LoadingComponent, FallbackComponent, Component) {
  class NetworkErrorHandler extends React.Component {
    constructor() {
      super()
      // Construct the initial state
      this.state = {
        isLoading: true,
        hasError: false
      }
    }

    // Flow of props passed by GrapQL HoC: loading: true, no data loading : false,
    // data is available and good
    componentWillReceiveProps(nextProps) {
      console.log("HoC view of props")
      console.log(nextProps)
      for (var key in nextProps) {
        let query = nextProps[key]
        console.log(query)
        // Need to also consider the case of '!query'
        if (query.error) {
          // Update state if error happens
          this.setState({hasError: true})
          console.log("Error while loading data!")
          console.log(query.error)
        } else if (query.loading) {
          this.setState({isLoading: true})
          console.log("Data is loading")
        } else {
          this.setState({isLoading: false})
          console.log("Data seems to have loaded")
        }
      }

      //     if(data.error || !data)     {       // Update state if error happens
      //  this.setState({ hasError: true })     } }

    }

    // Report errors if any
// Here's a good link to follow:
// https://codeburst.io/catching-exceptions-using-higher-order-components-in-reac
// t-16-b8a401853a10
    //errorCallback(error, info, this.props)

    render() {
      // if state contains error we render fallback component
      if (this.state.hasError) {
        // Errors can be further split into GraphQL and Network errors
        return (<FallbackComponent/>)
      } else if (this.state.isLoading) {
        return (<LoadingComponent/>)
      } else {
        return (<Component {...this.props}/>)
      }
    }
  }
  NetworkErrorHandler.displayName = `networkErrorHandler(${Component.displayName})`
  return NetworkErrorHandler
}

export default networkErrorHandler;
