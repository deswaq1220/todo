const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input")
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";
let toDos = []; //여기에서 toDos는 항상 빈 array로 시작한다
                // 우리가 원하는건 toDos array를 시작할때
                //localstroage에서 발견되는 이전 toDos들로 하고싶음

function saveToDos(){
  localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
  //json.stringify는 오브젝트나 배열 또는 어떤 자바스크립트 코드건 간에
  // 문자열로 만들어준다.
}

function deleteToDo(event){
  const li = (event.target.parentElement);
  // event를 통해서 유용한 정보를 얻는다
  //많은 정보는 주지 않음. 
  // target은 클릭된 html엘리먼트임
  // html 엘리먼트에는 하나 이상의 프로퍼티가 있음
  // 그중 하나가 parentElement
  // parentElement는 클릭된 엘리먼트의 부모임
    
  li.remove();
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
                  //    ↑toDos DB에 있는 요소중 하나임
                //클릭했던 li의 id를 갖고 있는 toDo를 지운다 
                // toDo의 id가 li의 id와 다른걸 남기고 싶다. 
  saveToDos();

}


function paintToDo(newTodo){
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text; // span의 텍스트는 handleSubmit에서 가져온 newTodo텍스트가 된다
  const button = document.createElement("button");
  button.innerText="❎";
  button.addEventListener("click",deleteToDo);
  li.appendChild(span);  // li 태그안에 span 태그를 넣어준다
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event){
  event.preventDefault();
  const newToDo = toDoInput.value; /* 인풋 현재 값을 새로운 변수에 복사한다. */
  toDoInput.value ="";
  const newTodoObj = {
    text:newToDo,
    id:Date.now(), // id가 있는 이유는 li item들을 구별하고 싶기 때문임
  }
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
  // newToDo는 인풋의 value를 비우기전의 값을 나타내는 string
  // 그 다음에 paintTodo에 넣어서 호출한다;
}

toDoForm.addEventListener("submit",handleToDoSubmit);

// function sayHello(item){
//   console.log(item);
// }

//사용자가 submit을 하면 input비우고
// 텍스트(newTodo)를 toDos array에 push 
// 그 다음 화면에 toDo를 그려주고
// 그리고 saveToDos를 하면 된다. toDo저장

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null){
  const parsedToDos = JSON.parse(savedTodos)
                      //문자열을 배열로 바꿔준다
  toDos = parsedToDos; // toDos array를 가지고와서 toDos에 복원해줌
  parsedToDos.forEach(paintToDo);
  // forEachsms array 각 item에 대해 function을 실행하게 해준다.
  // 또 다른 function이나 sayhello를 만드는 대신에 
  // item을 화살표 함수로 바로 쓸 수 있다. 
  // 둘다 동일함.
}


