const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs'); // Bổ sung module fs để thao tác lưu file ảnh

const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const database = [
    { BookId: 'b1', BookName: 'Basic Programming Techniques', Price: 70, Image: 'b1.png' },
    { BookId: 'b2', BookName: 'Advanced Programming Techniques', Price: 100, Image: 'b2.png' },
    { BookId: 'b3', BookName: 'Introduction to Machine Learning', Price: 200, Image: 'b3.png' },
    { BookId: 'b4', BookName: 'Advanced Machine Learning', Price: 300, Image: 'b4.png' },
    { BookId: 'b5', BookName: 'Basic Robot Programming', Price: 250, Image: 'b5.png' },
];

function saveImage(book, fileName = `${book.BookId}_${Date.now()}.png`) {
    const savedBook = { ...book };
    if (!savedBook.ImageBase64) {
        delete savedBook.ImageBase64;
        return savedBook;
    }

    const base64Data = savedBook.ImageBase64.replace(/^data:image\/\w+;base64,/, '');
    const imagePath = path.join(__dirname, 'public', 'images', fileName);
    fs.writeFileSync(imagePath, base64Data, 'base64');
    savedBook.Image = fileName;
    delete savedBook.ImageBase64;
    return savedBook;
}

app.get('/', (req, res) => res.send('Hello Restful API'));

app.get('/books', (req, res) => res.json(database));

app.get('/books/filter/price', (req, res) => {
    const min = Number(req.query.min);
    const max = Number(req.query.max);
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        return res.status(400).json({ message: 'Please provide min and max price' });
    }
    return res.json(database.filter((book) => book.Price >= min && book.Price <= max));
});

app.get('/books/:id', (req, res) => {
    const book = database.find((item) => item.BookId.toLowerCase() === req.params.id.toLowerCase());
    return book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
});

app.post('/books', (req, res) => {
    const newBook = saveImage(req.body);
    database.push(newBook);
    res.json(database);
});

app.put('/books', (req, res) => {
    const index = database.findIndex((book) => book.BookId.toLowerCase() === req.body.BookId.toLowerCase());
    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const updatedBook = saveImage(req.body);
    if (!updatedBook.Image) {
        updatedBook.Image = database[index].Image;
    }
    database[index] = updatedBook;
    return res.json(database);
});

app.delete('/books/:id', (req, res) => {
    const index = database.findIndex((book) => book.BookId.toLowerCase() === req.params.id.toLowerCase());
    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    database.splice(index, 1);
    return res.json(database);
});

app.listen(port, () => console.log(`My Server listening on port ${port}`));