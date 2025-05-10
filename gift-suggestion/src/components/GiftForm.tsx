import { useState } from "react";
import StepForm from "./StepForm";
import { FormData } from "../api/type";

export function GiftForm() {
  type PageState = "form" | "loading" | "result";

  const [pageState, setPageState] = useState<PageState>("form");
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    mbtiType: "",
    auraColor: "",
  });
  const [giftIdea, setGiftIdea] = useState<string>("");

  const generateGifts = async () => {
    setPageState("loading");
    try {
      const response = await fetch("http://localhost:8000/api/generate-gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setGiftIdea(data[0].generated_text);
      setPageState("result");
    } catch (error) {
      console.error("Error:", error);
      setGiftIdea("An error occurred while generating gift ideas.");
      setPageState("result");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateGifts();
  };

  if (pageState === "loading") {
    return <p>Generating gift ideas...</p>;
  }

  if (pageState === "form") {
    return (
      <StepForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
    );
  }

    // ---- Render gift idea page ----
    if (pageState === "result") {
      return (
        <div
          className="result-box"
          style={{
            maxWidth: "400px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Gift Ideas:</h2>
          <p>{giftIdea}</p>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button onClick={() => setPageState("form")}>Back</button>
            <button onClick={generateGifts}>Generate New Gifts</button>
          </div>
        </div>
      );
    }

}
