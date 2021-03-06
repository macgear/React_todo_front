import {useEffect, useState} from 'react'
import Item from './Item'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function Form() {

        // const [dataArr, setDataArr] = useState([
        //     {txt : "Promener le chien", id: uuidv4()},
        //     {txt : "Sortir les poubelles", id: uuidv4()},
        //     {txt : "Faire les courses", id: uuidv4()},
        //     {txt : "Se reposer", id: uuidv4()}
        // ]);

        const [stateInput, setStateInput] = useState('');
        const [update, setUpdate] = useState(true);


        const [dataArr, setDataArr] = useState([])
        
        useEffect(() => {
            if(update){
                axios.get('http://localhost:8000/instruction')
                    .then((response) => {
                        setDataArr(response.data);
                        setUpdate(false);
                    })
            }
        },[update])


        const deleteElement = id => {
            //console.log(id);
            axios.get('http://localhost:8000/instruction/delete/' + id, {instruction: stateInput})
                .then((response) => {
                    setUpdate(true);
                    console.log(response.data);
                  });

            // const filteredState = dataArr.filter(item => {
            //     return item.id !== id;
            // })
            // setDataArr(filteredState);
        }


        const addTodo = e => {
            e.preventDefault();
            // const newArr = [...dataArr]

            // const newTodo = {};
            // newTodo.txt = stateInput;
            // newTodo.id = uuidv4();

            // newArr.push(newTodo);
            // setDataArr(newArr);
            
            // setStateInput('');

            // console.log({instruction:stateInput});
            axios.post('http://localhost:8000/instruction/create', {instruction: stateInput})
                .then((response) => {
                    setUpdate(true);
                    setStateInput('');
                    console.log(response.data.message);
                })
                .catch(err => console.log(err.message))

        }


        // const linkedInput = e => {
        //     setStateInput(e);
        // }




    return (

        <div className="m-auto px-4-col-12 col-sm-10 col-lg-6">

            <form onSubmit={e => addTodo(e)} className="mb-3">
                <label htmlFor="todo" className="form-label mt-3">Chose ?? faire</label>
                <input 
                value = {stateInput}
                onInput={e => setStateInput(e.target.value) }
                type="text" 
                className="form-control" 
                id="todo"
                required="true" />

                <button
                 className = "mt-2 btn btn-primary d-block"
                 >Envoyer</button>
            </form>

            <h2>Liste des choses ?? faire :</h2>
                <ul className="list-group">
                    {dataArr.map(item => {
                        return (
                            <Item 
                            txt = {item.instruction}
                            key = {item.id}
                            id = {item.id}
                            delFunc = {deleteElement}
                            />
                        )
                    })}



                </ul>

        </div>

    )


}
