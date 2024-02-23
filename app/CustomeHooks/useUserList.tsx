"use client";
import { useState, useEffect } from "react";

export const useUserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return { users, error, deleteUser };
};
