(this.webpackJsonpmyapp=this.webpackJsonpmyapp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(6),o=n(2),l=n(3),s=n(7),r=n(4),c=n(8),i=n(0),d=n.n(i),u=n(5),m=n.n(u);n(14),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var h=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(r.a)(t).call(this,e))).onChange=function(e){return n.setState({inputValue:e.target.value})},n.getNewToDo=function(e){return n.setState({todos:[].concat(Object(a.a)(n.state.todos),[e])})},n.displayNewToDo=function(e){"Enter"===e.key&&(e.preventDefault(),n.getNewToDo(n.state.inputValue),n.setState({inputValue:""}),document.getElementsByClassName("dropdown")[0].style.visibility="visible")},n.onInputFocus=function(){n.setState({inputValue:""})},n.onInputBlur=function(){n.setState({inputValue:"What needs to be done?"})},n.checkboxOnClick=function(e){e.preventDefault(),e.currentTarget.parentElement.classList.contains("checked")?(e.currentTarget.style.color="black",e.currentTarget.style.textDecoration="none",e.currentTarget.parentElement.classList.remove("checked"),e.currentTarget.classList.remove("checkedelem"),n.setState({checked:n.state.checked-2}),n.setState({deleteCount:n.state.deleteCount-1})):(e.currentTarget.style.color="rgb(211, 211, 211)",e.currentTarget.style.textDecoration="line-through",e.currentTarget.parentElement.classList.add("checked"),e.currentTarget.classList.add("checkedelem"),n.setState({deleteCount:n.state.deleteCount+1})),document.getElementsByClassName("checked").length>=1?document.getElementsByClassName("todos-completed")[0].style.visibility="visible":document.getElementsByClassName("todos-completed")[0].style.visibility="hidden"},n.buttonClick=function(e){if(e.preventDefault(),e.currentTarget.style.border="1px solid rgb(233, 189, 189)",e.currentTarget.style.borderRadius="2px","showAll"===e.currentTarget.className)for(var t=0;t<document.getElementsByClassName("todo-wrap").length;t++)document.getElementsByClassName("todo-wrap")[t].style.display="flex";else if("ActiveToDos"===e.currentTarget.className){var n=!0,a=!1,o=void 0;try{for(var l,s=document.getElementsByClassName("todo-wrap")[Symbol.iterator]();!(n=(l=s.next()).done);n=!0){var r=l.value;r.classList.contains("checked")?r.style.display="none":r.style.display="flex"}}catch(p){a=!0,o=p}finally{try{n||null==s.return||s.return()}finally{if(a)throw o}}}else if("CompletedToDos"===e.currentTarget.className){var c=!0,i=!1,d=void 0;try{for(var u,m=document.getElementsByClassName("todo-wrap")[Symbol.iterator]();!(c=(u=m.next()).done);c=!0){var h=u.value;h.classList.contains("checked")?h.style.display="flex":h.style.display="none"}}catch(p){i=!0,d=p}finally{try{c||null==m.return||m.return()}finally{if(i)throw d}}}},n.buttonBlur=function(e){e.preventDefault(),e.currentTarget.style.border="none"},n.deleteToDo=function(e){e.preventDefault(),e.currentTarget.parentElement.remove(),e.currentTarget.parentElement.classList.contains("checked")||n.setState({deleteCount:n.state.deleteCount+1})},n.deleteCompletedToDos=function(e){e.preventDefault();for(;document.getElementsByClassName("checked").length>0;)document.getElementsByClassName("checked")[0].remove()},n.onDropDownClick=function(e){if(e.preventDefault(),0===n.state.dropdownclicked){var t=0,a=!0,o=!1,l=void 0;try{for(var s,r=document.getElementsByClassName("todo-wrap")[Symbol.iterator]();!(a=(s=r.next()).done);a=!0){var c=s.value;c.classList.contains("checked")||(t++,c.classList.add("checked"),c.children[1].style.color="rgb(211, 211, 211)",c.children[1].style.textDecoration="line-through",c.children[1].classList.add("checkedelem"),n.setState({dropdownclicked:1}))}}catch(v){o=!0,l=v}finally{try{a||null==r.return||r.return()}finally{if(o)throw l}}n.setState({deleteCount:n.state.deleteCount+t})}else{var i=document.getElementsByClassName("checked").length,d=!0,u=!1,m=void 0;try{for(var h,p=document.getElementsByClassName("todo-wrap")[Symbol.iterator]();!(d=(h=p.next()).done);d=!0){var y=h.value;y.children[1].style.color="black",y.children[1].style.textDecoration="none",y.children[1].classList.remove("checkedelem"),y.classList.remove("checked")}}catch(v){u=!0,m=v}finally{try{d||null==p.return||p.return()}finally{if(u)throw m}}n.setState({dropdownclicked:0}),n.setState({deleteCount:n.state.deleteCount-i})}},n.state={inputValue:"What needs to be done?",todos:[],showAllToDos:!0,deleteCount:0,dropdownclicked:0},n}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return d.a.createElement(i.Fragment,null,d.a.createElement("h1",{className:"main-heading"},"todos"),d.a.createElement("form",{className:"main-wrap"},d.a.createElement("span",{className:"dropdown",onClick:this.onDropDownClick}),d.a.createElement("input",{className:"add-todo-field",value:this.state.inputValue,onChange:this.onChange,onKeyPress:this.displayNewToDo,onFocus:this.onInputFocus,onBlur:this.onInputBlur}),this.state.showAllToDos?this.state.todos.map((function(t){return d.a.createElement("div",{className:"todo-wrap",key:t},d.a.createElement("input",{type:"checkbox",className:"todo-checkbox"}),d.a.createElement("p",{className:"todo-text",onClick:e.checkboxOnClick},t),d.a.createElement("span",{className:"delete-todo",onClick:e.deleteToDo}))})):null,d.a.createElement("footer",{className:"form-footer"},d.a.createElement("div",{className:"todos-count"},this.state.todos.length-this.state.deleteCount," items left"),d.a.createElement("div",{className:"todos-filters"},d.a.createElement("button",{className:"showAll",onClick:this.buttonClick,onBlur:this.buttonBlur},"All"),d.a.createElement("button",{className:"ActiveToDos",onClick:this.buttonClick,onBlur:this.buttonBlur},"Active"),d.a.createElement("button",{className:"CompletedToDos",onClick:this.buttonClick,onBlur:this.buttonBlur},"Completed")),d.a.createElement("div",{className:"todos-completed"},d.a.createElement("button",{onClick:this.deleteCompletedToDos},"Clear Completed")))),d.a.createElement("div",{className:"decoration-line"}),d.a.createElement("div",{className:"decoration-line2"}))}}]),t}(d.a.Component);m.a.render(d.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,n){e.exports=n(15)}},[[9,1,2]]]);
//# sourceMappingURL=main.4575372b.chunk.js.map