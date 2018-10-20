import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import ResultList from "../../Components/ResultList"
import { Col, Row, Container } from "../../Components/Grid";
import { List, ListItem } from "../../Components/List";
import { Input, TextArea, Button } from "../../Components/Form";


class TV extends Component {
  state = {
    shows: [],
    searchResults: [],
    results: [],
    term: "",
  };

  componentDidMount() {
    this.showCollect();
    // this.searchSimilar();
  }

// searchSimilar = () => {
//   const search = this.state.search
//   API.search(search)
//     .then(res => {
//       var answer = res;
//       this.setState({
//         results: answer.data.results
//       });
//       console.log(this.state);
//     }).catch(err => console.log(err));
// };


  showCollect = () => {
    API.UserData()
      .then(res =>
        this.setState({ shows: res.data })
      )
      .catch(err => console.log(err));
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.term) {
      API.Find(this.state.term)
      .then(res =>
        {this.setState({
          searchResults: res.data.results,
          term: ""
        });
    
        }
      )
      .catch(err => console.log(err));
  
      API.search(this.state.term)
      .then(res =>
        {this.setState({
          results: res.data.results,
          term: ""
        });
      }
    )
  }
};



  render() {
    return (
      <Container d-flex justify-content-center>
      
      <Col size="col-centered">
          
            <form>
              <Input
                value={this.state.term}
                onChange={this.handleInputChange}
                name="term"
                placeholder="Term (required)"
              />
      
              <Button
                disabled={!(this.state.term)}
                onClick={this.handleFormSubmit}
              >
                Search 
              </Button>
            </form></Col>
     <br/>
     <strong>
          {this.state.searchResults.map(shows=>(
              <div>
                    {shows.name}
              
          
                      </div>
            ))}   </strong>
       {/* {this.state.searchResults.name}
    
       <br/>
       <img src={this.state.searchResults.picture} width='200' height='100'/> */}

<ResultList>
       {this.state.results.map(result => (

<div className="container">
  <ul className="list-group">
    <li>Name: {result.name}</li>
    <li>Poster Link: {result.poster_path}</li>
    <li> Key: {result.id}</li>
    <li>overview: {result.overview}</li>
  </ul>
  <br/>
</div>

))}
</ResultList>
     {/* <Col size="col-centered">
           
          {this.state.searchResults.length ? (
          <List>
                {this.state.searchResults.map(tv => (
                  <ListItem key={tv._id}>
                       <strong> {tv.name}</strong>
       
                       
     

                  </ListItem>
                ))}
              </List>
            ) : (
<h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="col-centered">

            ) : (
<h3>No Results to Display</h3>
            )}
            </Col> */}
      </Container>
    );
  }
}
export default TV;
  