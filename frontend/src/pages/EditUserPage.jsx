import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUserPage() {
  const { id } = useParams();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [id]);

  const handleEditUser = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/users/${id}`, user)
      .then(() => {
        navigate("/"); // Redireciona para a página inicial após editar o usuário
      })
      .catch((error) => console.error("Error editing user:", error));
  };

  return (
    <div>
      <h2>Editar Usuáriooo</h2>
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

export default EditUserPage;