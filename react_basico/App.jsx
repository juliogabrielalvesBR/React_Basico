import { useState, useEffect } from 'react';

function App() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch('http://localhost:3000/api/filmes');
        const dados = await resposta.json();
        setItens(dados);
      } catch (e) {
        setErro('Erro ao consultar filmes');
      }
      setCarregando(false);
    }
    carregar();
  }, []);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  if (itens.length === 0) {
    return <p>Nenhum filme encontrado.</p>;
  }

  return (
    <ul>
      {itens.map((item) => (
        <li key={item.id}>
          {item.titulo} ({item.ano})
        </li>
      ))}
    </ul>
  );
}

export default App;
