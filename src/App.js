import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js';
import Search from './Search.js';


class BooksApp extends React.Component {
  state = { 
    allBooks: []
  }

  componentDidMount(){
    BooksAPI
      .getAll()
      .then(allBooks=> this.setState({allBooks}));
  }

  handleShelfChange = (book, shelf)=>{
    let {allBooks} = this.state;

    BooksAPI
      .update(book,shelf)
      .then(response => {
        console.log(response);
        const bookIndex = allBooks.findIndex((b)=>b.id === book.id);
        book.shelf = shelf;
        allBooks[bookIndex] = book;
        this.setState({allBooks});
      });
  }

  render() {
    return (
      <div className="app">
        <Route 
          exact path="/" 
          render={()=>
            <ListBooks
              bookList={this.state.allBooks} 
              onShelfChange={this.handleShelfChange}/>
          }/>
        <Route path="/search" component={Search}/>
      </div>
    )
  }
}

export default BooksApp
