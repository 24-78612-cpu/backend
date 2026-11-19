import express from "express";
import bookRoutes from './routes/bookRoute.js';
import userRoutes from './routes/userRoute.js';
const app = express();

app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.use('/book', bookRoutes);
app.use('/user', userRoutes);

app.use((err, req, res, next) => {
    if (err?.type === 'entity.parse.failed') {
        return res.status(400).json({
            error: 'Invalid JSON body. Use double quotes around property names and string values, and remove trailing commas.'
        });
    }

    next(err);
});

try {
    const port = 3000; 
    app.listen(port, () => {
     console.log(`listening to port ${port}...`);
    });
} catch(e) {
    console.log(e);
}
