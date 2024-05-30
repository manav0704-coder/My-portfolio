// app.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const notifier= require('node-notifier');// module to add notifier
const { title } = require('process');

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    database: 'customer',
    user: 'root',
    password: 'root',
    port: 3306
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/index.html'));
});

// Route to serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/login.html'));
});

// Route to serve register page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/register.html'));
});
// Route to serve reset password page
app.get('/reset', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/resetpassword.html'));
});

// Route for user registration
app.post('/register', (req, res) => {
    const { mailid,name,password } = req.body;
    const sql = 'INSERT INTO customer.mainlogin (mailid,name,password) VALUES (?,?,?)';
    db.query(sql, [mailid,name,password], (err, result) => {
        if (err) {
            res.status(500).send('Error registering user');
            // error handling for registration
            db.query(sql, [username, password], (err, result) => {
                if (err) {
                    console.error('Error registering user:', err);
                    res.status(500).send('Error registering user');
                    return;
                }
                console.log('User registered successfully:', result);
               alert(res.status(200).send('User registered successfully')) ;
            });
        }
        // res.status(200).send('User registered successfully');
        res.sendFile(path.join(__dirname, 'public', '/login.html'));
    });
});




// Route for user login
app.post('/login', (req, res) => {
    const { mailid, password } = req.body;
    const sql = 'SELECT * FROM customer.mainlogin WHERE mailid = ? AND password = ?';
    db.query(sql, [mailid, password], (err, result) => {
        if (err) {
            res.status(500).send('Error logging in');
            throw err;
        }
        if (result.length > 0) {
            //res.status(200).send('Login successful');
            res.sendFile(path.join(__dirname, 'public', '/index.html'));
            notifier.notify({
                title:'User login',
                message:'you have login successfully',
                icon: path.join(__dirname, 'public', 'assets','images','logo','person.jpg')
            });
        } else {
            // res.status(401).send('Invalid credentials');
            notifier.notify({
                title:'Cant login',
                message:'Invalid  credentials',
                icon: path.join(__dirname, 'public', 'assets','images','logo','invalid.jpeg')
            });
        }
    });
});

// Route for password reset form submission
app.post('/reset', (req, res) => {
    const {password,name} = req.body;
    const sqlUpdate = 'UPDATE customer.mainlogin SET password = ?  WHERE name = ?';
    
    // Update the password for the user with the provided name
    db.query(sqlUpdate, [password,name], (err, result) => {
        if (err) {
            console.error('Error resetting password:', err);
            res.status(500).send('Error resetting password');
            return;
        }

        if (result.affectedRows === 0) {
            // No rows affected, possibly due to invalid email
            res.status(400).send('No user found with the provided name');
            return;
        }

        // Password reset successful
        // console.log('Password reset successful');
    //    res.status(200).send('Password reset successful');
        res.sendFile(path.join(__dirname, 'public', '/login.html'));
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
