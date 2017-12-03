import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
* @description it's used to select the shelf where the user wants to put the book in.
*/
class BookShelfChanger extends Component {

  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    shelf: PropTypes.string
  }

  handleShelfChange = (e)=>{
    this.props.onShelfChange(e.target.value);
  }

  render() {
    return(
      <div className="book-shelf-changer">
        <select 
          value={this.props.shelf} 
          onChange={this.handleShelfChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;