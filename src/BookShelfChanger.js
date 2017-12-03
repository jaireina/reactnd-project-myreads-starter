import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
* @description it's used to show the current shelf and to select another.
*/
class BookShelfChanger extends Component {

  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    shelf: PropTypes.string
  }

  static defaultProps = {
    shelf: ''
  }

  constructor(props){
    super(props);
    this.state = {shelf: props.shelf};
  }

  /**
   * @description Notifies the parent that another shelf was selected.
   * @param {Event} e
   */
  handleShelfChange = (e)=>{
    const shelf = e.target.value
    this.setState({shelf});
    this.props.onShelfChange(shelf);
  }

  render() {
    return(
      <div className="book-shelf-changer">
        <select 
          value={this.state.shelf} 
          onChange={this.handleShelfChange}>
          <option value="" disabled>Move to...</option>
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