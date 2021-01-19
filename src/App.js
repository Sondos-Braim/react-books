import React from 'react';
import './App.css';

function Header(props){
  return(
      <header className="header">
          <h1>Books App</h1>
          <h3>Counter: {props.counter}</h3>
      </header>
  );
}
function Footer(props){
  return(
      <footer className='footer'>
          <small>{props.text}</small>
      </footer>
  )
}
function Book(props){
  return (
      <li>
          <h4>Title: {props.book.title}</h4>
          <h4>Author: {props.book.author}</h4>
      </li>
  )
}

function ThingList(props){
  return(
      <main className="main">
          <h2>Books List</h2>
          <ul>
              { props.booksList.map( book => <Book book={book} />) }
          </ul>
      </main>
  )
}


class CreateForm extends React.Component{
  constructor(props){
      super(props);
      this.props = props;
      this.state = {
          title:"",
          author:""
      };

      this.handleChange = this.handleChange.bind(this); 
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){
      return(
          <form id='form' onSubmit={this.handleSubmit}>
              <label> Title {this.props.title}
                  <input id='title' name='title'type="text" onChange={this.handleChange}></input>
              </label>
              <label> Author {this.props.author}
                  <input id='author' name='author'type="text" onChange={this.handleChange}></input>
              </label>

              <input type="submit" value="Add" />
          </form>
      )
  }

  handleChange(event){
      let title = document.getElementById("title");
      let author = document.getElementById("author");

      this.setState({title: title.value});
      this.setState({author: author.value});

  }

  handleSubmit(event){
      let form = document.getElementById("form");

      event.preventDefault();
      this.props.onBookCreate(this.state);
      form.reset()
  }
}

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      books: [
          {
              id: 1,
              title: "Harry Botter",
              author: "J. K. Rowling"
          },
          {
              id: 2,
              title: "The Hunger Games",
              author: "Suzanne Collins"
          },
          {
              id: 3,
              title: "Twilight",
              author: "Stephenie Meyer"
          }
      ],
  };
  this.handleCreateBook = this.handleCreateBook.bind(this);
}
handleCreateBook(book){
  let allBooks = this.state.books;
  allBooks.push({id:this.state.books.length+1, title: book.title, author: book.author});
  this.setState({books: allBooks});
}
render(){
  return(
      <div className="App">
          <Header counter={this.state.books.length}/>
          <ThingList booksList={this.state.books} />
          <h1>Would you like to add a new book? </h1>
          <CreateForm onBookCreate= { (book) => this.handleCreateBook(book) } />
          <Footer text='copyright'/>
      </div>
  );
}
}
export default App;

