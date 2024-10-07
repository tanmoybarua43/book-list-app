// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Navbar';
import Home from './components/Home';
import BookList from './components/BookList';
import BookEdit from './components/BookEdit';

function App() {
    return (
        <Router>
            {/* Render the navigation bar on all pages */}
            <Nav />
            
            {/* Define the routes for different components */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/book/:id" element={<BookEdit />} />
                <Route path="/book/new" element={<BookEdit />} />
            </Routes>
        </Router>
    );
}

export default App;
