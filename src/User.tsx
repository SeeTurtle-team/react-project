import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setUsers([]);
        setLoading(true);
        const response = await axios.get(
          'http://localhost:5000/findAll'
        );
        setUsers(response.data);
      } catch (error:any) {
        setError(error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  type User = {
    id: number;
    todo: string;
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users || users.length === 0) return null;

  return (
    <ul>
      {users.map((user: User) => (
        <li key={user.id}>
          {user.id} ({user.todo})
        </li>
      ))}
    </ul>
  );
}

export default User;
