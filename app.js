const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const PORT = 3000;

// Sample data for blog posts (temporary)
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first blog post.' },
    { id: 2, title: 'Second Post', content: 'This is the second blog post.' },
];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Home Route - Show all posts
app.get('/', (req, res) => {
    res.render('home', { posts });
});

// Create Route - Show form to create a new post
app.get('/create', (req, res) => {
    res.render('create');
});

// Create Route - Handle form submission
app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const id = posts.length + 1;
    posts.push({ id, title, content });
    res.redirect('/');
});

// Edit Route - Show form to edit a post
app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res.send('Post not found');
    }
    res.render('edit', { post });
});

// Edit Route - Handle form submission
app.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
        return res.send('Post not found');
    }
    posts[postIndex] = { id: postId, title, content };
    res.redirect('/');
});

// Delete Route - Delete a post
app.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
