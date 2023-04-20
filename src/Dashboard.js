import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { bookShelfCollectionName } from "./constants";
function Dashboard() {
    let { register, handleSubmit, reset } = useForm();
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [allBooks, setallBooks] = useState([])

    const getAllBooks = async () => {
        const doc_refs = await getDocs(collection(db, bookShelfCollectionName))

        const res = []

        doc_refs.forEach(book => {
            res.push(book.data()
            )
        })
        setallBooks(res)
        console.log(res);

        // return res
    }

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
            console.log(user)
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
        getAllBooks();
    }, [user, loading]);

    const submit = () => {

    }
    return (
        // <div className="dashboard">
        //    <div className="dashboard__container">
        //     Logged in as
        //      <div>{name}</div>
        //      <div>{user?.email}</div>
        //      <button className="dashboard__btn" onClick={logout}>
        //       Logout
        //      </button>
        //    </div>
        //  </div>
    
        <div>
            <nav className="navbar  bg-success" >
                <div className="container-fluid " style={{ height: "50px", width: '100%', justifyContent: "flex-end" }}>
                    <button className="dashboard__btn" onClick={logout}>Logout</button>
                </div>
            </nav>


            <div className="container" >

                <form className="d-flex mt-4" onSubmit={handleSubmit(submit)}>
                    <input
                        className="form-control me-2"
                        type="text"
                        placeholder="Seach"
                        {...register("textSearch")}
                    />
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </form>

                {allBooks.length > 0 && (
                    <div className="books-collection mt-3">
                        {allBooks.map(book => (
                            <div key={book.book_name}><div className="card m-4">
                                <img className="mx-auto" src={book.book_image} alt="" height="280" width="200"></img>
                                <br />
                                <p>{book.book_name}</p>


                            </div>

                            </div>


                        ))}


                    </div>
                )}

            </div>
        </div>
    );
}
export default Dashboard;