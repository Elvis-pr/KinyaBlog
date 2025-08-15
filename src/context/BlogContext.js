import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, set, remove, update } from 'firebase/database';

const BlogContext = createContext();

// No local initial posts, will load from Firebase
const initialPosts = [];

const initialState = {
  posts: initialPosts,
  categories: ["React", "CSS", "JavaScript", "Node.js", "Design", "Tutorial"],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: null
};

function blogReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_POSTS':
      return { ...state, posts: action.payload, loading: false };
    
    case 'ADD_POST':
      const newPost = {
        ...action.payload,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        author: action.payload.author // Use author from payload (set in CreatePost.js)
      };
      return { 
        ...state, 
        posts: [newPost, ...state.posts],
        loading: false 
      };
    
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.id ? { ...post, ...action.payload } : post
        ),
        loading: false
      };
    
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        loading: false
      };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    default:
      return state;
  }
}

export function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, initialState);


  // Load posts from backend API on mount, fallback to localStorage or initial data
  // Load posts from Firebase Realtime Database
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const postsRef = ref(db, 'posts');
    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const posts = data
        ? Object.entries(data).map(([id, post]) => ({ ...post, id }))
        : [];
      dispatch({ type: 'SET_POSTS', payload: posts.reverse() }); // newest first
    }, (error) => {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    });
    return () => unsubscribe();
  }, []);



  // Firebase Realtime Database actions
  const actions = {
    addPost: async (post) => {
      const postsRef = ref(db, 'posts');
      const newPostRef = push(postsRef);
      const postWithDate = {
        ...post,
        date: new Date().toISOString().split('T')[0],
      };
      await set(newPostRef, postWithDate);
    },
    updatePost: async (post) => {
      const postRef = ref(db, `posts/${post.id}`);
      await update(postRef, post);
    },
    deletePost: async (id) => {
      const postRef = ref(db, `posts/${id}`);
      await remove(postRef);
    },
    setSearchQuery: (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
    setSelectedCategory: (category) => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error })
  };

  return (
    <BlogContext.Provider value={{ ...state, ...actions }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
