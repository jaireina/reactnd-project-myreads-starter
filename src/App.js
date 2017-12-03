import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js';
import Search from './Search.js';

/**
* @description Represents a the main BooksApp where the user can see the list of books added to his shelves or search for new books to add to the shelves.
*/
class BooksApp extends React.Component {
  state = { 
    allBooks: []
  }

  /**
   * @description Gets all the books right after the component is available
   */
  componentDidMount(){
    this.getAllBooks();
  }

  /**
   * @description Connects to the API in order to get all the books the user has added to the shelves
   */
  getAllBooks = ()=>{
    BooksAPI
      .getAll()
      .then(allBooks=> this.setState({allBooks}));
  }

  /**
   * @description updates the shelf of a book
   * @param {object} book - to be updated
   * @param {string} shelf - id of the shelf to be set to the book
   */
  handleShelfChange = (book, shelf)=>{
    BooksAPI
      .update(book,shelf)
      .then( this.getAllBooks );
  }

  render() {
    return (
      <div className="app">

        <Route 
          exact path="/" 
          render={()=><ListBooks
                        bookList={this.state.allBooks} 
                        onShelfChange={this.handleShelfChange}/>}
          />

        <Route 
          path="/search" 
          render={()=><Search 
                        onShelfChange={this.handleShelfChange} 
                        currentBooks={this.state.allBooks}/>}
        />

      </div>
    )
  }
}

export default BooksApp
