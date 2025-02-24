const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function registerUser(data: { name: string; email: string; password: string; role: string }) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseText = await response.text(); // Get response as text

    try {
      return JSON.parse(responseText); // Ensure valid JSON
    } catch (error) {
      throw new Error(`Invalid JSON response: ${responseText}`);
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Registration failed");
  }
}

export async function fetchProperties() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/properties");
    
    // Check if response is valid JSON
    const text = await response.text();
    console.log("API Response:", text);

    // Ensure response is JSON
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

// export async function fetchApprovedProperties() {
//   const res = await fetch("/api/properties/approved");
//   return res.json();
// }

// export async function markPropertyAsSpam(id: number) {
//   const res = await fetch(`/api/properties/${id}/spam`, { method: "PATCH" });
//   return res.json();
// }


export async function createProperty(data: { title: string; location: string; price: number }) {
  const response = await fetch(`${API_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to create property: ${errorMessage}`);
  }

  return response.json();
}


export const updateProperty = async (id: number, data: any) => {
  const res = await fetch(`${API_URL}/properties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update property");
  return res.json();
};

export const deleteProperty = async (id: number) => {
  const res = await fetch(`${API_URL}/properties/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete property");
};
