import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const { id } = useParams(); // Obtém o ID do usuário da URL
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  // Busca os dados do usuário ao carregar o componente
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${id}`) // Substitua pela URL correta da sua API
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [id]);

  // Atualiza os dados do usuário
  const handleEditUser = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/users/${id}`, user) // Substitua pela URL correta da sua API
      .then(() => {
        navigate("/"); // Redireciona para a página inicial após editar o usuário
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div>
      <h2>Editar Usuário</h2>
      <form onSubmit={handleEditUser}>
        <input
          type="text"
          placeholder="Nome"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditUser;