import { userInfo } from "os";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual } from "../../helpers/compareJSON";
import useAuth from "../../hooks/useAuth";

const Auth = () => {
  let navigate = useNavigate();

  const { loginUser, authState } = useAuth();
  const { users } = authState;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const login = (e: any) => {
    e.preventDefault();

    for (const user of users) {
      if (shallowEqual(user, userForm)) {
        loginUser(userForm);
        navigate("/home");
      }
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={login}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={userForm.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            value={userForm.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Auth;
