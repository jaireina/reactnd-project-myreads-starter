import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';

/**
* @description Represents a book. It shows all of its info as well as a BookShelfChanger
*/
class Book extends Component {

  static propTypes = {
    onShelfChange: PropTypes.func,
    book: PropTypes.shape({
      title: PropTypes.string,
      authors: PropTypes.arrayOf(PropTypes.string),
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string
      }),
      id: PropTypes.string,
      shelf: PropTypes.string
    })
  }

  static defaultProps = {
    onShelfChange: ()=>{}
  }

  /**
   * @description Notifies the parent that the current book has changed its shelf
   * @param {string} shelf - the shelf selected for the book
   */
  handleShelfChange(shelf){
    this.props.onShelfChange(this.props.book, shelf);
  }

  render() {
    const {book} = this.props;
    
    if(!book) return <div></div>;
    
    book.authors = book.authors || [];

    return(
      <div className="book">
        <div className="book-top">
          <div 
            className="book-cover" 
            style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
          <BookShelfChanger 
            shelf={book.shelf} 
            onShelfChange={(shelf)=>this.handleShelfChange(shelf)} 
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors.map((author,i) => (<div key={author}>{author}</div>) ) }
        </div>
      </div>
    );
  }
}

export default Book;