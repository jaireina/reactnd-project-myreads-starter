import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';

/**
* @description Represents the list of books page where the user can find the books listed by category
*/
class ListBooks extends Component {
  static defaultProps = {
    bookList: [],
    onShelfChange: ()=>{}
  }

  shelves = [
    {name: 'Currently Reading', key:'currentlyReading'},
    {name: 'Want to Read', key:'wantToRead'},
    {name: 'Read', key:'read'},
  ]
  
  /**
   * @description Categorizes an array of books into different shelves
   * @param {array} bookList - of the current books to be categorized by shelves
   */
  getCategorizedList(bookList){
    let categorizedList = {};
    bookList.forEach(book => {
      if(!categorizedList[book.shelf]){
        categorizedList[book.shelf] = [];
      }
      categorizedList[book.shelf].push(book);
    });
    return categorizedList;
  }

  render() {
    const {bookList} = this.props;
    const categorizedList = this.getCategorizedList(bookList);
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.shelves.map(shelf=>(
              <BookShelf 
                books={categorizedList[shelf.key]} 
                name={shelf.name} 
                key={shelf.name}
                onShelfChange={this.props.onShelfChange}/>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;