import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class Footer extends React.Component {
    render () {
        return (
            <Fragment>
                <div className="main-footer">
                <div className="main-footer__item">Double-click to edit a todo</div>
                <div className="main-footer__item">Created by <span className="author">Liuba Lozynska</span></div>
                </div>
            </Fragment>
        )
    }
}

class Body extends React.Component{

    constructor (props) {
        super (props);
        this.state = { inputValue: 'What needs to be done?', todos: [], deleteCount: 0, toDoIndex: 0}
    };

    removeLocalStorageItem = target => {

      for (let item in localStorage) {
          console.log('checking', item)
          if (localStorage.getItem(item) === target) {
            console.log('deleting', item, target)
            localStorage.removeItem(item);
            break;
          }
      }

    }  
        
    onChangeAddToDo = event => this.setState( {inputValue: event.target.value} ); // making this input field available for accepting new input


    getNewToDo = todo => {this.setState( { todos: [...this.state.todos, todo] } ); } // adding new todos to our todos array


    displayNewToDo = event => {

        if (event.key === "Enter") { // if Enter was pressed

            event.preventDefault();

            this.getNewToDo(this.state.inputValue);   // adding new todo to our todos array
            
            let index = this.state.toDoIndex;
            localStorage.setItem(index, this.state.inputValue);
            
            this.setState( {toDoIndex: this.state.toDoIndex + 1})

            this.setState( {inputValue:''} ); // seting input value to empty string so that user could type new ToDo

            document.getElementsByClassName('dropdown')[0].style.visibility="visible" 
            // displaying a dropdown once at least one todo was added to the list
        } 
    } // displaying new todos in the list
    

    componentDidMount() {

        this.setState( {toDoIndex: 0});
        
        let itemsIgnore=['length', 'key', 'getItem', 'setItem', 'removeItem', 'clear'];

        for (let item in localStorage) {
            if (itemsIgnore.indexOf(item)<0) {
                this.state.todos.push(localStorage.getItem(item));
            }
        }

        if (this.state.todos.length > 0) {
            document.getElementsByClassName('dropdown')[0].style.visibility="visible"; 
        } // showing a dropdown if at least one ToDo is on the list
      }

    onInputFocus = () => {
        this.setState( {inputValue:''} );
    } // input decoration

    onInputBlur = () => {
        this.setState( {inputValue:'What needs to be done?'} );
    } // input decoration


    checkboxOnClick = event => {

        event.preventDefault(); // preventing the page from reloading

        let parent=event.currentTarget.parentElement;

        if (!parent.classList.contains('checked')){
            parent.classList.add('checked');
            parent.children[1].classList.add('checkedelem');
            this.setState({deleteCount: this.state.deleteCount + 1});
        } // we set a special style for those items which has been checked as done

        else{
            parent.classList.remove('checked');
            parent.children[1].classList.remove('checkedelem');
            this.setState({deleteCount: this.state.deleteCount - 1});
        } // setting default styles if the item was double clicked, which means it was labled as active again
        
        let toDosCompleted = document.getElementsByClassName('todos-completed');
        document.getElementsByClassName('checked').length >= 1 ?  
        toDosCompleted[0].style.visibility="visible" : toDosCompleted[0].style.visibility="hidden";
        // diplaying a 'Clear Completed' button, once at least one item was checked as completed
    }


    buttonClick = event => {

        event.preventDefault(); // preventing the page from reloading

        let activeButton = document.getElementsByClassName('showAll')[0];
        activeButton.classList.remove('active');

        let buttonsParent = event.currentTarget.parentElement;
        for (let button of buttonsParent.children) {
            button.classList.remove('active'); 
        }

        event.currentTarget.classList.add('active')
        // special styles for the active button

        let todoWraps = document.getElementsByClassName('todo-wrap');

        if (event.currentTarget.classList.contains('showAll')) {
            for (let item  of todoWraps) {  
                item.style.display='flex'
            }
        } // displaying all todos once "All" button was pressed

        else if (event.currentTarget.classList.contains('ActiveToDos')) {
            for (let item of todoWraps) {  
                 (item.classList.contains('checked')) ? item.style.display="none" : item.style.display="flex";
            }
        } // displaying active todos once "Active" button was pressed

        else if (event.currentTarget.classList.contains('CompletedToDos')) {
            for (let item of document.getElementsByClassName('todo-wrap')) {    
                (!item.classList.contains('checked')) ? item.style.display="none" : item.style.display="flex";       
            }
        } // displaying completed todos once "Completed" button was pressed

  } // end of buttonClick



    deleteToDo = event => {

        event.preventDefault(); 

        let parent=event.currentTarget.parentElement;
        let index = parent.getAttribute('itemID');

        parent.remove(); // removing a todo from the list once the 'delete' sign was pressed
        console.log(index);
        this.removeLocalStorageItem(index);  // removing a todo from the local storage

        if (!parent.classList.contains('checked')) {
            this.setState({deleteCount: this.state.deleteCount + 1}); 
        } // counting removed todos for an up to date 'items left' field
    } 


    deleteCompletedToDos = event => {

        event.preventDefault(); 

        let i=0;
        let allCheckedToDos = document.getElementsByClassName('checked');

        while (allCheckedToDos.length > 0) { 
            let index = allCheckedToDos[i].getAttribute('itemID'); 
            allCheckedToDos[i].remove();

            this.removeLocalStorageItem(index);
            // removing a todo from the local storage

        } // removing todos from the list once the 'Clear Completed' button was pressed

        document.getElementsByClassName('todos-completed')[0].style.visibility="hidden";
         // hiding "Clear Completed" button once all completed ToDos have been deleted

        if ( ! (this.state.todos.length - this.state.deleteCount) ) {
            document.getElementsByClassName('dropdown')[0].style.visibility="hidden"; 
        }
        // hiding "dropdown" once all ToDos have been deleted
    } 


    onDropDownClick = event => { 

        event.preventDefault(); 

        let dropdown = document.getElementsByClassName('dropdown')[0];
        let toDoWraps = document.getElementsByClassName('todo-wrap');

        
        
        if ( ! dropdown.classList.contains('clicked')) { // once a dropdown sign is clicked we mark all todos as done

            let countOfNotCheked = 0;

            for (let item of toDoWraps) {  
                if ( ! item.classList.contains('checked')) {
                    countOfNotCheked++;
                    item.classList.add('checked')
                    item.children[1].classList.add('checkedelem');  
                }
            }

            dropdown.classList.add('clicked');
            this.setState({deleteCount: this.state.deleteCount + countOfNotCheked}); 
            // adding the number of newly chekced items to deleteCount in order to display correct 'items left'

            document.getElementsByClassName('todos-completed')[0].style.visibility="visible"; // making "Clear Completed button" visible
        } 

        else {
             let countOfChecked = document.getElementsByClassName('checked').length;
             for (let item of toDoWraps) {
                item.children[1].classList.remove('checkedelem');
                item.classList.remove('checked');
             }
             dropdown.classList.remove('clicked');
             this.setState({deleteCount: this.state.deleteCount - countOfChecked});

             document.getElementsByClassName('todos-completed')[0].style.visibility="hidden";  // making "Clear Completed button" hidden

        } //once a dropdown sign is unpressed, we mark all todos as active

    } // end of onDropDownClick
    
    
    onToDoClick = (event) => {
         
        let parent = event.target.parentElement;
        let input = parent.children[1];
        let text = parent.children[0].innerHTML;

        input.style.visibility = "visible"; //make input visible and available for todo change

    } // makes the todo available for being changed on doubleclick
    
    toDoBlur = (event) => {

        let parent = event.target.parentElement;
        let input = parent.children[1];

        parent.children[0].innerHTML = input.value; //we add the updated text to the todo field
        input.style.visibility = "hidden"; // hiding input and making the field unavailable for uodating and change

    } // makes the todo not available for being changed
    






    render () {
        return (
           <Fragment>

               <h1 className="main-heading">todos</h1>

               <form className="main-wrap">
                   <span className="dropdown" onClick={this.onDropDownClick}></span>
                   <input 
                   className="add-todo-field" 
                   value = {this.state.inputValue} 
                   onChange = {this.onChangeAddToDo} 
                   onKeyPress = {this.displayNewToDo} 
                   onFocus = {this.onInputFocus} 
                   onBlur={this.onInputBlur}></input>
                   
                   <ul className="todo-list">
                    { 
                    this.state.todos.map( (todo, index) => 
                    <li className="todo-wrap" key={index} itemID={todo}> 
                        <input type="checkbox" className="todo-checkbox" onClick={this.checkboxOnClick}></input>
                            <p className="todo-text">
                                <span className="todo-style" onClick={this.onToDoClick}>{todo}</span>
                                <input className="todo" itemID={index} type="text" defaultValue={this.state.todos[index]} onBlur={this.toDoBlur}></input>
                            </p> 
                        <span className="delete-todo" onClick={this.deleteToDo}></span>
                        </li>) 

                    }
                    </ul>
                   
                   <footer className="form-footer">
                       <div className="todos-count">
                           {this.state.todos.length - this.state.deleteCount} items left
                       </div>
                       <div className="todos-filters">
                            <button className="showAll active" onClick={this.buttonClick}>All</button>
                            <button className="ActiveToDos" onClick={this.buttonClick}>Active</button>
                            <button className="CompletedToDos" onClick={this.buttonClick}>Completed</button>
                       </div>
                       <div className="todos-completed">
                            <button onClick={this.deleteCompletedToDos}>Clear Completed</button> 
                       </div>
                   </footer>
               </form> 
               <div className="decoration-line"></div>
               <div className="decoration-line2"></div>
               <Footer />

           </Fragment>
        );
    }
}


ReactDOM.render(<Body />, document.getElementById('root'));


serviceWorker.unregister();
