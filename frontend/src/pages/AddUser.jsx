import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddUser() {
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleAddUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/users/", newUser)
      .then(() => {
        alert("Usuário adicionado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        alert("Erro ao adicionar usuário. Verifique os dados e tente novamente.");
      });
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-title">Adicionar Novo Usuário</h2>
      <form className="add-user-form" onSubmit={handleAddUser}>
        <input
          className="add-user-input"
          type="text"
          placeholder="Nome"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          className="add-user-input"
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          className="add-user-input"
          type="password"
          placeholder="Senha"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button className="add-user-button" type="submit">Adicionar Usuário</button>
      </form>
    </div>
  );
}

export default AddUser;