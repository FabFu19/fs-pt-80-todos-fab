import React, { useState, useEffect } from "react";


const Home = () => {
	const [list, setList] = useState('');
	const [todos, setTodos] = useState([]);
	let total = todos.length;

	//keep information even if the page is reloaded
	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	// save information 
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleChange = event => setList(prev => prev = event.target.value);
	const handleClick = (index) => {
		setTodos(todos.filter((el, i) => i!=index));
	}
	//I don't want to send an empty item ? validate it?
	const handleSubmit = event => {
		event.preventDefault();
		if (list.trim()) { 
			setTodos([...todos, list]);
			setList('');
		}
	}

 	return (
		<div className="container">
			<div className="row p-3">
				<div className="col-sm-12 col-md-2 col-lg-2"></div>
				<div className="col-sm-12 col-md-8 col-lg-8 rounded bg-container">
					<h1 className="text-center mt-2 title">Todos</h1>
					<form onSubmit={handleSubmit}>
						<input className="form-control input-style" type="text" onChange={handleChange} value={list} placeholder="Add Todos" aria-label="default input example"/>
					</form>
					<ul className="list-group bg-list">
						{todos.length > 0 ?
						todos.map((task, i) => <li className="list-group-item bg-list-child" key={i}>{task} <span className="fa-solid fa-trash trash-i" onClick={() => handleClick(i)}></span></li>) 
						:
						''
						}
					</ul>
					<p className="total-items">{total}<span className="ms-1">{total > 1 ? 'Items' : 'Item'}</span></p>
				</div>
				<div className="col-sm-12 col-md-2 col-lg-2"></div>
			</div>
		</div>
	);
};

export default Home;
