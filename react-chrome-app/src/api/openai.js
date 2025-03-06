const API_URL = "http://localhost:3001/api";  // TODO use the production URL in production

// Function to interact with the backend to get chat responses
export const getChatResponse = async (messages) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chat response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error communicating with backend:", error);
    throw error;
  }
};
