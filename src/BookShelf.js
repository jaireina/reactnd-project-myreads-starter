import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
* @description Represents a book shelf that contains the books added by the user to it.
*/
class BookShelf extends Component {

  static propTypes = {
    name: PropTypes.string,
    books: PropTypes.array,
    onShelfChange: PropTypes.func
  }

  static defaultProps = {
    books: [],
    onShelfChange: ()=>{}
  }

  render() {
    const {books} = this.props;
    let htmlToRender = <h3>Nothing found here :(</h3>;

    if(books.length>0){
      htmlToRender = books.map(book=>(
        <li key={book.id}>
          <Book book={book}
          onShelfChange={this.props.onShelfChange}/>
        </li>
      ));
    }

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {htmlToRender}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;