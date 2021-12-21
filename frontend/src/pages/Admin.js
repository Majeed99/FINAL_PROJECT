import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Admin-style.css";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [UsersData, setUsersData] = useState([]);
  const [show, setShow] = useState([]);

  useEffect(() => {
    const cookieCheck = document.cookie;

    if (cookieCheck.startsWith("jwt=")) {
      navigate("/timeline");
      return;
    }
    if (!cookieCheck.startsWith("jwtAdmin=")) {
      navigate("/adminSignIn");
      return;
    }
    fetchUsers();
  }, []);

  async function fetchUsers() {
    await axios
      .get("/api/users/")
      .then((res) => {
        setUsersData(res.data);
        res.data.forEach((e) => {
          show.push(false);
          setShow([...show]);
        });
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  function deleteUser(id) {
    axios
      .delete("/api/users/deleteUser/" + id)
      .then((res) => {
        fetchUsers();
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }
  return (
    <div>
      <table className="adminTable">
        <tr>
          <th>Name</th>
          <th>UserName</th>
          <th>E-mail</th>
          <th>Delete</th>
        </tr>
        {UsersData.map((el, index) => {
          return (
            <tr>
              <td>{el.name}</td>
              <td>{el.userName}</td>
              <td>{el.email}</td>
              <td>
                <button
                  className="deleteUserBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    // deleteUser(el._id);
                    show[index] = true;
                    setShow([...show]);
                  }}
                >
                  Delete
                </button>
                <Modal
                  show={show[index]}
                  onHide={() => {
                    show[index] = false;
                    setShow([...show]);
                  }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    ARE YOU SURE TO DELETE @{el.userName} ?
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="confirm_delete"
                      onClick={(e) => {
                        e.preventDefault();
                        show[index] = false;
                        setShow([...show]);
                        deleteUser(el._id);
                      }}
                    >
                      Confirm
                    </button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Admin;
