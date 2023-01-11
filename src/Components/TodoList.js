import React, {  useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";


export default function TodoList({ props, handleDelete }) {
  const [closed, setClosed] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [childs, setChilds] = useState(props.childs);

  const ShowHide = (e) => {
    setClosed(!closed);
  };
  
  


  const HandleSubmit = (e) => {
    e.preventDefault();
    if (childs.some((p) => p.name === newItem)) {
      alert("A child with same name already exist" );
      return;
    }
    useLocalStorage.AddTodo(props.name, newItem);
    setChilds([...childs, { desc: newItem, active : true }]);
    setNewItem("");
  };


  const updateTodo = (descValue, activeValue) => {
    useLocalStorage.SetActive(props.name, descValue, activeValue);
    const toUpdate = childs.filter(x => x.desc == descValue)[0]
    let index = childs.indexOf(toUpdate)
    toUpdate.active = activeValue;
    childs.splice(index, 1)
    setChilds([...childs, toUpdate])
  }

  return (
    <>{props.active &&  <ul
      key={props.key}
      className="child"
      style={closed ? { height: "35px" } : { height: "150px" }}
    >
      <li>
        <h5 onClick={(e) => ShowHide(e)}>
          <span className="tag" style={{ backgroundColor: props.color }}>
            {props.tag}
          </span>
          <p>{props.name}</p>
          <div><button
              onClick={() => handleDelete(props.name)}
              className="btn_del_project"
            >
            v
            </button></div>
            
          
        </h5>
        <ul
          className="child_body"
          style={
            closed
              ? { display: "none", height: "50px" }
              : { display: "block", height: "90px" }
          }
        >
          {childs.filter(x => x.active).map((elm, index) => (
            <li key={index} onClick={() => updateTodo(elm.desc, !elm.active)} className="todo" style={ !elm.active ? {backgroundColor: "#DCDCDC"} : {backgroundColor: "white"}} >{elm.desc} </li>
          ))}
          <li style={{marginBottom : "5px"}}>
            <form onSubmit={(e) => HandleSubmit(e)}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              ></input>
              <input
                className="add_todo_button"
                type="submit"
                value="+"
              ></input>
            </form>
          </li>
          {childs.filter(x => !x.active).map((elm, index) => (
            <li key={index} onClick={() => updateTodo(elm.desc, !elm.active)} className="todo" style={ !elm.active ? {backgroundColor: "#DCDCDC"} : {backgroundColor: "white"}} >{elm.desc} </li>
          ))}
        </ul>
      </li>
    </ul>}</>
   
  );
}
