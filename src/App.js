import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Category from './pages/Category';
import Search from './pages/Search';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<BlogPost />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/edit/:id" element={<EditPost />} />
                <Route path="/category/:category" element={<Category />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={React.createElement(require('./pages/Login').default)} />
                <Route path="/register" element={React.createElement(require('./pages/Register').default)} />
                <Route path="/admin" element={React.createElement(require('./pages/AdminDashboard').default)} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
