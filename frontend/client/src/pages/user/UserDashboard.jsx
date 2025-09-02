import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const colors = {
    primary: "#ec4899", // pink
    secondary: "#f472b6",
    background: "#f3f4f6",
    textDark: "#111827",
    cardBg: "#fff",
    textMuted: "#6b7280",
  };

  const fetchProfile = useCallback(async (showToast = false) => {
    try {
      const { data } = await userAPI.get("/me", { params: { t: Date.now() } });
      setUser(data);
      setForm(data);
      setCacheBust(Date.now());
      if (showToast) toast.success("✨ Profile refreshed!");
    } catch (err) {
      console.error("Fetch profile failed", err);
      if (showToast) toast.error("❌ Failed to refresh profile");
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [fetchProfile]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      toast.error("❌ Update failed");
    }
  };

  const handleRefreshClick = async () => {
    setIsRefreshing(true);
    await fetchProfile(true);
    setIsRefreshing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    toast.success("👋 Logged out successfully");
    navigate("/");
  };

  if (!user) return <p style={{ textAlign: "center", color: colors.textMuted }}>Loading...</p>;

  return (
    <div style={{ padding: "20px", backgroundColor: colors.background, minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      {/* Header: DateTime + Refresh + Logout */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginBottom: "2rem", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "18px", fontWeight: "bold", color: colors.textDark }}>
          🕒 {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
        </span>

        <button
          onClick={handleRefreshClick}
          disabled={isRefreshing}
          style={{
            padding: "6px 14px",
            borderRadius: "8px",
            border: "none",
            background: isRefreshing ? "#6c757d" : colors.primary,
            color: "white",
            cursor: isRefreshing ? "not-allowed" : "pointer",
            fontWeight: "bold",
            transition: "0.2s",
          }}
        >
          {isRefreshing ? "🔄 Refreshing..." : "🔄 Refresh"}
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "6px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Profile Section */}
      {!edit ? (
        <div
          style={{
            backgroundColor: colors.cardBg,
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {user.profileImage && (
  <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
    <img
      src={`${user.profileImage}?v=${cacheBust}`}
      alt="Profile"
      width={140}
      height={140}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
        border: `4px solid ${colors.primary}`,
      }}
    />
  </div>
)}


          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>👋 Welcome, {user.name}</h2>
          <p>📧 Email: {user.email}</p>
          <p>📱 Phone: {user.phone}</p>
          <p>🏙️ City: {user.city}</p>
          <p>📝 Bio: {user.bio}</p>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setEdit(true)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: colors.secondary,
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✏️ Edit Profile
            </button>

            <button
              onClick={() => navigate("/user/bookings")}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: "#22c55e",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              📅 View My Bookings
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleUpdate}
          style={{
            backgroundColor: colors.cardBg,
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
          <input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
          <input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
          <input name="city" value={form.city || ""} onChange={handleChange} placeholder="City" style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
          <textarea name="bio" value={form.bio || ""} onChange={handleChange} placeholder="Bio" style={{ padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }} />
          <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <button type="submit" style={{ padding: "8px 16px", borderRadius: "8px", background: colors.primary, color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}>
              💾 Save
            </button>
            <button type="button" onClick={() => setEdit(false)} style={{ padding: "8px 16px", borderRadius: "8px", background: "#6b7280", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}>
              ❌ Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserDashboard;
