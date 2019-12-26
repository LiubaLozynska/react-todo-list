import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class Body extends React.Component{
    constructor (props) {
        super (props);
        this.state = { inputValue: 'What needs to be done?', todos: [], showAllToDos: true, deleteCount: 0, dropdownclicked: 0}
    };

   
    onChange = (event) => this.setState( {inputValue: event.target.value} );

    getNewToDo = todo => this.setState( { todos: [...this.state.todos, todo] } );

    displayNewToDo = event => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.getNewToDo(this.state.inputValue);
            this.setState( {inputValue:''} );
            document.getElementsByClassName('dropdown')[0].style.visibility="visible"
        } 
    }
    onInputFocus = () => {
        this.setState( {inputValue:''} );
    }
    onInputBlur = () => {
        this.setState( {inputValue:'What needs to be done?'} );
    }

    checkboxOnClick = event => {

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

    buttonClick = event => {
        event.preventDefault(); 
        event.currentTarget.style.border = '1px solid rgb(233, 189, 189)';
        event.currentTarget.style.borderRadius = '2px';

        if (event.currentTarget.className === 'showAll') {
            for (let i=0; i<document.getElementsByClassName('todo-wrap').length; i++) {  
                document.getElementsByClassName('todo-wrap')[i].style.display='flex'
            }
        }
        else if (event.currentTarget.className === 'ActiveToDos') {
            for (let item of document.getElementsByClassName('todo-wrap')) {  
                if ( item.classList.contains('checked')) {
                    item.style.display="none";
                }
                else {
                    item.style.display="flex";
                }
            }
          
        }
        else if (event.currentTarget.className === 'CompletedToDos') {
            for (let item of document.getElementsByClassName('todo-wrap')) {    
                if (!item.classList.contains('checked')) {
                    item.style.display="none";
                }
                else {
                    item.style.display="flex";
                }
            }

        }
  } 

    buttonBlur = event => {
        event.preventDefault(); 
        event.currentTarget.style.border = 'none'
    }

    deleteToDo = event => {
        event.preventDefault(); 
        event.currentTarget.parentElement.remove();
        if (!event.currentTarget.parentElement.classList.contains('checked')) {
            this.setState({deleteCount: this.state.deleteCount + 1});
        }
        
       
    }

    deleteCompletedToDos = event => {
        event.preventDefault(); 
        let i=0;
        while (document.getElementsByClassName('checked').length > 0) {  
            document.getElementsByClassName('checked')[i].remove();
        }
    }

    onDropDownClick = event => {
        event.preventDefault(); 
        
        if (this.state.dropdownclicked === 0) {
            let count=0;
            for (let item of document.getElementsByClassName('todo-wrap')) {    
                if (!item.classList.contains('checked')) {
                    count++;
                    item.classList.add('checked')
                    item.children[1].style.color = "rgb(211, 211, 211)";
                    item.children[1].style.textDecoration = "line-through";
                    item.children[1].classList.add('checkedelem');
                    this.setState( {dropdownclicked: 1} );
                }
            }
            this.setState({deleteCount: this.state.deleteCount + count});
        }
        else {
             let count=document.getElementsByClassName('checked') .length;
             for (let item of document.getElementsByClassName('todo-wrap')) {
                item.children[1].style.color='black';
                item.children[1].style.textDecoration = "none";
                item.children[1].classList.remove('checkedelem');
                item.classList.remove('checked');
             }
             this.setState( {dropdownclicked: 0} );
             this.setState({deleteCount: this.state.deleteCount - count});
        }
        
    }
    

    render () {
        return (
           <Fragment>

               <h1 className="main-heading">todos</h1>

               <form className="main-wrap">
                   <span className="dropdown" onClick={this.onDropDownClick}></span>
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
                            <button className="CompletedToDos" onClick={this.buttonClick} onBlur={this.buttonBlur}>Completed</button>
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
