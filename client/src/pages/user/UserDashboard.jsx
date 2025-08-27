import React, { useEffect, useState, useCallback } from "react";
import userAPI from "../../utils/userApi";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cacheBust, setCacheBust] = useState(Date.now());

  const fetchProfile = useCallback(async (showToast = false) => {
    try {
      // add a throwaway query to avoid any caching layers
      const { data } = await userAPI.get("/me", { params: { t: Date.now() } });
      setUser(data);
      setForm(data);
      // force <img> to re-load if URL stayed the same
      setCacheBust(Date.now());
      if (showToast) toast.success("Profile refreshed");
    } catch (err) {
      console.error("Fetch profile failed", err);
      if (showToast) toast.error("Failed to refresh profile");
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [fetchProfile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.keys(form).forEach((key) => fd.append(key, form[key] ?? ""));
      if (profileImage) fd.append("profileImage", profileImage);

      await userAPI.put("/me", fd, { headers: { "Content-Type": "multipart/form-data" } });

      setEdit(false);
      await fetchProfile(true);
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Update failed");
    }
  };

  const handleRefreshClick = async () => {
    setIsRefreshing(true);
    await fetchProfile(true);
    setIsRefreshing(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      {/* DateTime + Refresh */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#444",
          }}
        >
          {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
        </span>

        {/* IMPORTANT: type="button" so it never submits any form */}
        <button
          type="button"
          onClick={handleRefreshClick}
          disabled={isRefreshing}
          style={{
            padding: "6px 12px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "none",
            background: isRefreshing ? "#6c757d" : "#007BFF",
            color: "white",
            cursor: isRefreshing ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <button
  type="button"
  onClick={() => navigate("/user/bookings")}
  style={{
    marginTop: "20px",
    padding: "8px 16px",
    borderRadius: "6px",
    background: "#28a745",
    color: "white",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  }}
>
  View My Bookings
</button>

      {!edit ? (
        <>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>City: {user.city}</p>
          <p>Bio: {user.bio}</p>

          {user.profileImage && (
            <img
              src={`${user.profileImage}?v=${cacheBust}`} // cache-bust so you see latest image
              alt="Profile"
              width={120}
              height={120}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          )}

          <br />
          <button onClick={() => setEdit(true)}>Edit Profile</button>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" />
          <input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" />
          <input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" />
          <input name="city" value={form.city || ""} onChange={handleChange} placeholder="City" />
          <textarea name="bio" value={form.bio || ""} onChange={handleChange} placeholder="Bio" />
          <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEdit(false)}>Cancel</button>
        </form>
      )}
    </div>
    
  );
};

export default UserDashboard;
