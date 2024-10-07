import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            });
    }, []);

    const removeBook = async (id) => {
        await fetch(`http://localhost:8080/api/book/${id}`, { method: 'DELETE' });
        setBooks(books.filter(book => book._id !== id));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container my-4">
            <Link to="/book/new" className="btn btn-primary mb-3">Add Book</Link>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Pages</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.pages}</td>
                            <td>{book.genre}</td>
                            <td>
                                <Link to={`/book/${book._id}`} className="btn btn-info me-2">Edit</Link>
                                <button onClick={() => removeBook(book._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
