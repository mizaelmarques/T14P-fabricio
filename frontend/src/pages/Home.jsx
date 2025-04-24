import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);

  // Busca os usuários ao carregar o componente
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Função para deletar um usuário
  const handleDeleteUser = (id) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      axios
        .delete(`http://localhost:8000/users/${id}`)
        .then(() => {
          alert("Usuário deletado com sucesso!");
          setUsers(users.filter((user) => user.id !== id)); // Remove o usuário da lista
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Erro ao deletar usuário. Tente novamente.");
        });
    }
  };

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <Link to="/add-user">
        <button className="add-user-button" >Adicionar Novo Usuário</button>
      </Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
            <Link to={`/edit-user/${user.id}`}>
              <button>Editar</button>
            </Link>
            <button className="btn-delete" onClick={() => handleDeleteUser(user.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;