import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class Body extends React.Component{
    constructor (props) {
        super (props);
        this.state = { inputValue: 'What needs to be done?', todos: [], showAllToDos: true, deleteCount: 0}
    };

   
    onChange = event => this.setState( {inputValue: event.target.value} );

    getNewToDo = todo => this.setState( { todos: [...this.state.todos, todo] } );
    displayNewToDo = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.getNewToDo(this.state.inputValue);
            this.setState( {inputValue:''} );
        } 
    }
    onInputFocus = () => {
        this.setState( {inputValue:''} );
    }
    onInputBlur = () => {
        this.setState( {inputValue:'What needs to be done?'} );
    }

    checkboxOnClick = (event) => {

        event.preventDefault();


        if (!event.currentTarget.parentElement.classList.contains('checked')){
            event.currentTarget.style.color = "rgb(211, 211, 211)";
            event.currentTarget.style.textDecoration = "line-through";
            event.currentTarget.parentElement.classList.add('checked');
            event.currentTarget.classList.add('checkedelem');
            this.setState({deleteCount: this.state.deleteCount + 1});
        } 
        else{
            event.currentTarget.style.color = "black";
            event.currentTarget.style.textDecoration = "none";
            event.currentTarget.parentElement.classList.remove('checked');
            event.currentTarget.classList.remove('checkedelem');
            this.setState({checked: this.state.checked-2})
            this.setState({deleteCount: this.state.deleteCount - 1});
        }

        if (document.getElementsByClassName('checked').length >= 1) {
            document.getElementsByClassName('todos-completed')[0].style.visibility="visible";
        } 

        
    }

    buttonClick = (event) => {
        event.preventDefault(); 
        event.currentTarget.style.border = '1px solid rgb(233, 189, 189)';
        event.currentTarget.style.borderRadius = '2px';

        if (event.currentTarget.className === 'showAll') {
            for (let i=0; i<document.getElementsByClassName('checked').length; i++) {  
                document.getElementsByClassName('checked')[i].style.display='flex'
            }
        }
        else if (event.currentTarget.className === 'ActiveToDos') {
            for (let i=0; i<document.getElementsByClassName('checked').length; i++) {  
                document.getElementsByClassName('checked')[i].style.display='none'
            }
          
        }

    }

    buttonBlur = (event) => {
        event.preventDefault(); 
        event.currentTarget.style.border = 'none'
    }

    deleteToDo = (event) => {
        event.preventDefault(); 
        event.currentTarget.parentElement.remove();
        if (!event.currentTarget.parentElement.classList.contains('checked')) {
            this.setState({deleteCount: this.state.deleteCount + 1});
        }
        
       
    }

    deleteCompletedToDos = (event) => {
        event.preventDefault(); 
        let i=0;
        while (document.getElementsByClassName('checked').length > 0) {  
            document.getElementsByClassName('checked')[i].remove();
        }
    }
    

    render () {
        return (
           <Fragment>

               <h1 className="main-heading">todos</h1>

               <form className="main-wrap">

                   <input 
                   className="add-todo-field" 
                   value = {this.state.inputValue} 
                   onChange = {this.onChange} 
                   onKeyPress = {this.displayNewToDo} 
                   onFocus = {this.onInputFocus} 
                   onBlur={this.onInputBlur}></input>

                    {this.state.showAllToDos ? this.state.todos.map( todo => 

                    <div className="todo-wrap" key={todo}> 
                        <input type="checkbox" className="todo-checkbox"></input>
                        <p className="todo-text" onClick={this.checkboxOnClick}>{todo}</p>
                        <span className="delete-todo" onClick={this.deleteToDo}></span>
                    </div>) 

                    : null}
                   
                   
                   <footer className="form-footer">
                       <div className="todos-count">
                           {this.state.todos.length - this.state.deleteCount} items left
                       </div>
                       <div className="todos-filters">
                            <button className="showAll" onClick={this.buttonClick} onBlur={this.buttonBlur}>All</button>
                            <button className="ActiveToDos" onClick={this.buttonClick} onBlur={this.buttonBlur}>Active</button>
                            <button onClick={this.buttonClick} onBlur={this.buttonBlur}>Completed</button>
                       </div>
                       <div className="todos-completed">
                            <button onClick={this.deleteCompletedToDos}>Clear Completed</button> 
                       </div>
                   </footer>
               </form> 
               <div className="decoration-line"></div>
               <div className="decoration-line2"></div>

           </Fragment>
        );
    }
}


ReactDOM.render(<Body />, document.getElementById('root'));


serviceWorker.unregister();
