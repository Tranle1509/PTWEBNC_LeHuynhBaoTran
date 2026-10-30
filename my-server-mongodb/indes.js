const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = Number(process.env.PORT || 4000);
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';
const databaseName = process.env.MONGO_DB || 'FashonData';
const client = new MongoClient(mongoUrl);

app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

let fashionCollection;
let counterCollection;

function getCollection() {
  if (!fashionCollection) {
    throw new Error('Database is not connected');
  }
  return fashionCollection;
}

function slugifyFashion(subject, idF) {
  const name = String(subject || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `${name || 'fashion'}-p${idF}`;
}

function normaliseFashion(body, idF) {
  return {
    IdF: idF,
    ...(idF === undefined ? {} : { slug: slugifyFashion(body.fashion_subject, idF) }),
    style: String(body.style || '').trim(),
    fashion_subject: String(body.fashion_subject || '').trim(),
    fashion_detail: String(body.fashion_detail || '').trim(),
    fashion_image: String(body.fashion_image || '').trim(),
    creation_date: body.creation_date ? new Date(body.creation_date) : new Date(),
  };
}

function validateFashion(fashion) {
  if (!fashion.style || !fashion.fashion_subject || !fashion.fashion_detail || !fashion.fashion_image) {
    return 'Style, subject, detail and image are required.';
  }
  if (Number.isNaN(fashion.creation_date.getTime())) {
    return 'Creation date must be a valid date.';
  }
  return null;
}

function parseFashionFilter(identifier, res) {
  const value = String(identifier || '').trim();
  if (/^\d+$/.test(value)) return { IdF: Number(value) };
  if (ObjectId.isValid(value)) return { _id: new ObjectId(value) };
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*-p\d+$/i.test(value)) return { slug: value };
  res.status(400).json({ message: 'Invalid fashion id or slug.' });
  return null;
}

async function nextFashionId() {
  const result = await counterCollection.findOneAndUpdate(
    { _id: 'fashion' },
    { $inc: { value: 1 } },
    { upsert: true, returnDocument: 'after' },
  );
  const counter = result && result.value && typeof result.value === 'object' ? result.value : result;
  return counter.value;
}

async function ensureFashionIdentifiers() {
  const fashions = await fashionCollection.find({})
    .sort({ creation_date: 1, _id: 1 }).toArray();
  for (const fashion of fashions) {
    const idF = fashion.IdF || await nextFashionId();
    const slug = slugifyFashion(fashion.fashion_subject, idF);
    if (fashion.IdF === idF && fashion.slug === slug) continue;
    await fashionCollection.updateOne(
      { _id: fashion._id },
      { $set: { IdF: idF, slug } },
    );
  }
}

app.get('/', (req, res) => {
  res.json({ name: 'Fashion API', database: databaseName, status: 'ok' });
});

app.get('/fashions', async (req, res, next) => {
  try {
    const filter = req.query.style
      ? { style: { $regex: String(req.query.style).trim(), $options: 'i' } }
      : {};
    const fashions = await getCollection().find(filter).sort({ creation_date: -1 }).toArray();
    res.json(fashions);
  } catch (error) {
    next(error);
  }
});

app.get('/fashions/search', async (req, res, next) => {
  try {
    const query = String(req.query.q || '').trim();
    const filter = query
      ? /^\d+$/.test(query)
        ? { IdF: Number(query) }
        : {
            $or: [
              { fashion_subject: { $regex: query, $options: 'i' } },
              { fashion_detail: { $regex: query, $options: 'i' } },
            ],
          }
      : {};
    const fashions = await getCollection().find(filter).sort({ creation_date: -1 }).limit(Number(req.query.limit) || 50).toArray();
    res.json(fashions);
  } catch (error) {
    next(error);
  }
});

app.get('/fashions/:id', async (req, res, next) => {
  try {
    const filter = parseFashionFilter(req.params.id, res);
    if (!filter) return;
    const fashion = await getCollection().findOne(filter);
    if (!fashion) return res.status(404).json({ message: 'Fashion not found.' });
    res.json(fashion);
  } catch (error) {
    next(error);
  }
});

app.post('/fashions', async (req, res, next) => {
  try {
    const fashion = normaliseFashion(req.body, await nextFashionId());
    const validationError = validateFashion(fashion);
    if (validationError) return res.status(400).json({ message: validationError });
    const result = await getCollection().insertOne(fashion);
    res.status(201).json({ ...fashion, _id: result.insertedId });
  } catch (error) {
    next(error);
  }
});

app.put('/fashions/:id', async (req, res, next) => {
  try {
    const filter = parseFashionFilter(req.params.id, res);
    if (!filter) return;
    const current = await getCollection().findOne(filter);
    if (!current) return res.status(404).json({ message: 'Fashion not found.' });
    const fashion = normaliseFashion(req.body, current.IdF);
    const validationError = validateFashion(fashion);
    if (validationError) return res.status(400).json({ message: validationError });
    const result = await getCollection().findOneAndUpdate(
      { _id: current._id },
      { $set: fashion },
      { returnDocument: 'after' },
    );
    if (!result) return res.status(404).json({ message: 'Fashion not found.' });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.delete('/fashions/:id', async (req, res, next) => {
  try {
    const filter = parseFashionFilter(req.params.id, res);
    if (!filter) return;
    const result = await getCollection().deleteOne(filter);
    if (!result.deletedCount) return res.status(404).json({ message: 'Fashion not found.' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Fashion API could not complete the request.' });
});

async function start() {
  await client.connect();
  fashionCollection = client.db(databaseName).collection('Fashion');
  counterCollection = client.db(databaseName).collection('_counters');
  const maximum = await fashionCollection.findOne({}, { sort: { IdF: -1 } });
  if (maximum?.IdF) {
    await counterCollection.updateOne(
      { _id: 'fashion' },
      { $max: { value: maximum.IdF } },
      { upsert: true },
    );
  }
  await ensureFashionIdentifiers();
  await fashionCollection.createIndex({ creation_date: -1 });
  await fashionCollection.createIndex({ IdF: 1 }, { unique: true });
  await fashionCollection.createIndex({ slug: 1 }, { unique: true });
  return app.listen(port, () => console.log(`Fashion API listening on port ${port}`));
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Unable to start Fashion API:', error);
    process.exitCode = 1;
  });
}

module.exports = { app, start, normaliseFashion, validateFashion };
