import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookEdit() {
    const [book, setBook] = useState({ title: '', author: '', pages: '', genre: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data only if `id` is defined and not "new"
        if (id && id !== 'new') {
            fetch(`http://localhost:8080/api/book/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch book');
                    }
                    return response.json();
                })
                .then(data => setBook(data))
                .catch(error => console.error('Error fetching book:', error));
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook(prevBook => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = id === 'new' || !id ? 'POST' : 'PUT';
        const url = id === 'new' || !id ? 'http://localhost:8080/api/book' : `http://localhost:8080/api/book/${id}`;

        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }).catch(error => console.error('Error saving book:', error));

        // Navigate back to the book list
        navigate('/books');
    };

    return (
        <div className="container my-4">
            {/* Change the heading based on whether we are adding or editing */}
            <h2>{id === 'new' || !id ? 'Add Book' : 'Edit Book'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        className="form-control"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Pages</label>
                    <input
                        type="number"
                        name="pages"
                        className="form-control"
                        value={book.pages}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Genre</label>
                    <input
                        type="text"
                        name="genre"
                        className="form-control"
                        value={book.genre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" onClick={() => navigate('/books')} className="btn btn-secondary ms-2">Cancel</button>
            </form>
        </div>
    );
}

export default BookEdit;
