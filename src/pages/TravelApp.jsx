import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

function TravelApp() {
  const [IsCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completeTodo, setCompleteTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [keyword, setKeyword] = useState("");

  const handleAddTodo = () => {
    if (!newTitle || !newDescription) {
      alert("Eitzz, gaboleh kosong ya");
      return;
    }
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updateTodo = [...allTodos];
    updateTodo.push(newTodoItem);
    setTodos(updateTodo);
    localStorage.setItem("todolist", JSON.stringify(updateTodo));
    setNewTitle("");
    setNewDescription("");
    alert("List tercatat");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleEditTodo = (index, updatedTitle, updatedDescription) => {
    let updatedTodo = [...allTodos];
    updatedTodo[index].title = updatedTitle;
    updatedTodo[index].description = updatedDescription;
    setTodos(updatedTodo);
    localStorage.setItem("todolist", JSON.stringify(updatedTodo));
    setEditIndex(null);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updateCompleted = [...completeTodo];
    updateCompleted.push(filteredItem);
    setCompleteTodo(updateCompleted);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updateCompleted));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completeTodo];
    reducedTodo.splice(index, 1);

    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompleteTodo(reducedTodo);
  };

  const handleKeywordChange = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search keyword:", keyword);
  };

  const handleDeleteAllTodos = () => {
    if (IsCompleteScreen) {
      localStorage.removeItem("completedTodos");
      setCompleteTodo([]);
    } else {
      localStorage.removeItem("todolist");
      setTodos([]);
    }
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompleteTodo(savedCompletedTodo);
    }
  }, []);

  return (
    <div className=" mt-9 min-h-screen text-center">
      <div>
        <h1 className="text-[#41C9E2] font-bold text-3xl">Travel Tracker</h1>
        <p className="text-[#E178C5]">Buat list traveling impian anda disini</p>

        <div className="flex flex-row justify-center">
          <div className="m-3 flex flex-row items-center">
            <label className=" text-gray-700 text-sm font-bold mb-2 mr-2 ">
              Tujuan
            </label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Tujuan tulis disini"
            />
          </div>
          <div className="m-3 flex flex-row items-center">
            <label className=" text-gray-700 text-sm font-bold mb-2 mr-2">
              Catatan
            </label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Catatan tulis disini"
            />
          </div>
          <div>
            <button
              className="rounded bg-[#EE99C2] hover:bg-[#9195F6] p-2 m-3"
              type="button"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between mr-6 ms-6">
        <div className="">
          <button
            className="bg-[#EE99C2] hover:bg-[#9195F6] text-gray-900 p-2 rounded-md mr-2 m-3"
            onClick={() => setIsCompleteScreen(false)}
          >
            On Going
          </button>
          <button
            className="bg-[#EE99C2] hover:bg-[#9195F6] text-gray-900 p-2 rounded-md m-3"
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div>
          <form
            className="flex flex-row mr-6"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              className="border mt-3 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              type="search"
              placeholder="Cari catatan..."
              aria-label="Search"
              value={keyword}
              onChange={handleKeywordChange}
            />
          </form>
        </div>
      </div>

      <div className="mt-5 p-4 m-10 rounded-lg text-left">
        <div>
          {IsCompleteScreen === false &&
            allTodos
              .filter((todo) =>
                todo.title.toLowerCase().includes(keyword.toLowerCase())
              )
              .map((item, index) => (
                <div key={index}>
                  <div className="pb-4 border-b flex items-center ">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 mt-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                    <div className="flex space-x-4 jutify-end ml-auto">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                        className="text-[#EE99C2] cursor-pointer justify-end"
                      />
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => setEditIndex(index)}
                        title="Edit?"
                        className="text-[#EE99C2] cursor-pointer align-middle"
                      />
                      <FontAwesomeIcon
                        icon={faCheck}
                        onClick={() => handleComplete(index)}
                        title="Complete?"
                        className="text-[#EE99C2] cursor-pointer align-middle"
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div>
          {IsCompleteScreen === true &&
            completeTodo
              .filter(
                (todo) =>
                  todo.title &&
                  todo.title.toLowerCase().includes(keyword.toLowerCase())
              )
              .map((item, index) => (
                <div key={index} className="mb-4 ">
                  <div className="pb-4 border-b  flex items-center">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700">{item.description}</p>
                      <p>
                        <small className="text-[#41C9E2]">
                          Completed On:{item.completedOn}
                        </small>
                      </p>
                    </div>
                    <div className="flex-grow flex justify-end">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleDeleteCompletedTodo(index)}
                        title="Delete?"
                        className="text-[#EE99C2] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {editIndex !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Edit List</h2>
            <input
              id="editTitle"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 mb-3"
              type="text"
              defaultValue={allTodos[editIndex].title}
            />
            <input
              id="editDescription"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 mb-3 ms-2"
              type="text"
              defaultValue={allTodos[editIndex].description}
            />
            <button
              className="bg-[#EE99C2] hover:bg-[#9195F6] text-white px-4 py-2 rounded-lg mr-2 ms-2"
              onClick={() =>
                handleEditTodo(
                  editIndex,
                  document.getElementById("editTitle").value,
                  document.getElementById("editDescription").value
                )
              }
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setEditIndex(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        <button
          className="bg-[#EE99C2] hover:bg-[#9195F6] text-gray-900 p-2 rounded-md m-3"
          onClick={handleDeleteAllTodos}
        >
          Delete All
        </button>
      </div>
    </div>
  );
}

export default TravelApp;
