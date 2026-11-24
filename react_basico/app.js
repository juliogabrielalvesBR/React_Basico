const express = require('express');
const { engine } = require('express-handlebars');
const cors = require('cors');
const sequelize = require('./config/database');
const Filme = require('./models/Filme');

const app = express();
const router = express.Router();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors());
app.use(express.urlencoded({ extended: true }));


router.get('/', async (req, res) => {
  const filmes = await Filme.findAll({ raw: true });
  res.render('filmes', { filmes });
});

router.get('/filmes/novo', (req, res) => {
  res.render('novo');
});

router.post('/filmes', async (req, res) => {
  await Filme.create({ titulo: req.body.titulo, ano: req.body.ano });
  res.redirect('/');
});

router.get('/api/filmes', async (req, res) => {
  try {
    const filmes = await Filme.findAll({ raw: true });
    res.json(filmes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao consultar filmes' });
  }
});

app.use(router);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor em http://localhost:3000');
  });
});
