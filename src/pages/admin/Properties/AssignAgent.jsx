import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../../utils/auth";

function AssignAgent() {
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) navigate("/login");

    fetchProperties();
    fetchAgents();
  }, [navigate]);

  const fetchProperties = async () => {
    const res = await fetch(
      "http://home00101-001-site1.ktempurl.com/admin/properties/get_properties.php"
    );
    const data = await res.json();
    if (data.status === "success") setProperties(data.properties);
  };

  const fetchAgents = async () => {
    const res = await fetch(
      "http://localhost/real_estate_api/admin/get_agents.php"
    );
    const data = await res.json();
    if (data.status === "success") setAgents(data.agents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProperty || !selectedAgent) {
      setMessage("يرجى اختيار العقار والوكيل");
      return;
    }

    const res = await fetch(
      "http://localhost/real_estate_api/admin/properties/update_property.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedProperty,
          agent_id: selectedAgent,
        }),
      }
    );

    const data = await res.json();
    setMessage(data.message);
  };

  const container = { padding: 30 };
  const card = {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    maxWidth: 400,
  };
  const input = {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginBottom: 20, textAlign: "center" }}>
          ربط وكيل مع عقار
        </h2>

        {message && (
          <p
            style={{
              background: "#e0ffe0",
              padding: 10,
              borderRadius: 5,
              color: "green",
            }}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label>اختر العقار</label>
          <select
            style={input}
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">اختر...</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} — {p.price}$
              </option>
            ))}
          </select>

          <label>اختر الوكيل</label>
          <select
            style={input}
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
          >
            <option value="">اختر...</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.NAME} — {a.phone}
              </option>
            ))}
          </select>

          <button
            type="submit"
            style={{
              padding: 10,
              width: "100%",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
            }}
          >
            حفظ الربط
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssignAgent;
