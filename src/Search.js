import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {throttle} from 'lodash';
import {search} from './BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

class Search extends Component {
  static propTypes = {
    onShelfChange: PropTypes.func,
    currentBook: PropTypes.array
  }

  static defaultProps = {
    onShelfChange: ()=>{},
    currentBooks: []
  }

  /**
  * @description Represents the search page where the user can look for more books and add them to his shelves
  * @param {object} props
  */
  constructor(props){
    super(props);
    const currentBooksMapped = this.getMapBooksToShelves(props.currentBooks);
    this.state = {searchInputValue:'', searchResults:[], currentBooksMapped};
    this.performSearch = throttle(this.performSearch, 100);
  }
  
  /**
   * @description Checks if the currentBooks property changed and updates the state if so.
   * @param nextProps
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.currentBooks.length === this.props.currentBooks.length){
      return;
    }
    this.setState({currentBooksMapped: this.getMapBooksToShelves(nextProps.currentBooks)});
  }

  /**
   * @description Listens to changes in the search input
   * @param {Event} e
   */
  onSearchInputChange = (e)=>{
    this.setState({searchInputValue: e.target.value});
    this.performSearch();
  }

  /**
   * @description Performs a search using the value in the search input and updates the state with the search results.
   */
  performSearch = ()=>{
    search(this.state.searchInputValue)
      .then((searchResults=[])=>{
        if(searchResults.error) return;
        searchResults = this.mapCurrentWithSearch(searchResults);
        this.setState({searchResults});
      });
  }

  /**
   * @description Maps the current list of books to its shelves
   * @param {array} bookList - List of current books where we'll grab the bookIds and their respective shelves
   * @return {object} Books mapped to shelves in the form of {bookID:shelfID}
   */
  getMapBooksToShelves = (bookList)=>{
    return bookList.reduce((obj, book)=>{
      obj[book.id] = book.shelf;
      return obj;
    },{});
  }

  /**
   * @description Maps the shelves selected in the current book list to the searchResults so that the user can see if the books on the search results are already on one of his shelves.
   * @param {array} searchResults - The search results where we'll find and assign the current books to their shelves
   * @return {array} The search results updated with the current books mapped to their shelves
   */
  mapCurrentWithSearch = (searchResults=[])=>{
    return searchResults.map(b=>{
      const bookId = this.state.currentBooksMapped[b.id];
      if(!!bookId){
        b.shelf = bookId;
      }
      return b;
    });
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          
          <Link className="close-search" to="/">Close</Link>

          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.searchInputValue}
              onChange={this.onSearchInputChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map(b=>{
              return (
                <li key={b.id}
                  ><Book book={b} onShelfChange={this.props.onShelfChange}/>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;