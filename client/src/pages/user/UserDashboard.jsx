import React, { useEffect, useState } from "react";
import userAPI from "../../utils/userApi";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await userAPI.get("/me");
      setUser(data);
      setForm(data);
    } catch (err) {
      console.error("Fetch profile failed", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.keys(form).forEach((key) => fd.append(key, form[key]));
      if (profileImage) fd.append("profileImage", profileImage);

      await userAPI.put("/me", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEdit(false);
      fetchProfile();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      {!edit ? (
        <>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          {user.profileImage && (
            <img src={`http://localhost:5000/uploads/${user.profileImage}`} alt="Profile" width={100} />
          )}
          <button onClick={() => setEdit(true)}>Edit Profile</button>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="email" value={form.email} onChange={handleChange} />
          <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEdit(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default UserDashboard;
