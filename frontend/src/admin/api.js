const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("admin_token");
}

async function request(path, { method = "GET", body, isFormData = false } = {}) {
  const token = getToken();
  const headers = {};
  if (!isFormData) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && path !== "/auth/login") {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
    throw new Error("Session expired");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const api = {
  get:    (path) => request(path),
  post:   (path, body) => request(path, { method: "POST", body }),
  put:    (path, body) => request(path, { method: "PUT", body }),
  patch:  (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
  upload: (path, file) => {
    const fd = new FormData();
    fd.append("file", file);
    return request(path, { method: "POST", body: fd, isFormData: true });
  },
};

export { API_URL };
