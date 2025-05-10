import { useState } from "react";
import { StepFormProps } from "../api/type";

export default function StepForm({ formData, setFormData, handleSubmit, }: StepFormProps) {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="gift-form"
      >
        {step === 1 && (
          <div className="form-group">
            <label htmlFor="gender">Who is this for:</label>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, gender: "male" }));
                  nextStep();
                }}
              >
                <img
                  src="boy.png"
                  alt="male"
                  className="w-300 h-300 rounded-full"
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, gender: "female" }));
                  nextStep();
                }}
              >
                <img
                  src="girl.png"
                  alt="female"
                  className="w-300 h-300 rounded-full"
                />
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, gender: "unicorn" }));
                  nextStep();
                }}
              >
                <img
                  src="unicorn.png"
                  alt="unicorn"
                  className="w-300 h-300 rounded-full"
                />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-group">
            <label htmlFor="mbtiType">MBTI Type:</label>
            <select
              id="mbtiType"
              name="mbtiType"
              value={formData.mbtiType}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  mbtiType: e.target.value,
                }));
                nextStep();
              }}
              required
            >
              <option value="">Select MBTI Type</option>
              <option value="INTJ">INTJ</option>
              <option value="INTP">INTP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="ENTP">ENTP</option>
              <option value="INFJ">INFJ</option>
              <option value="INFP">INFP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENFP">ENFP</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFP">ISFP</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFP">ESFP</option>
            </select>
            <button type="button" onClick={prevStep}>
              Back
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="form-group">
            <label htmlFor="auraColor">Aura Color:</label>
            <select
              id="auraColor"
              name="auraColor"
              value={formData.auraColor}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  auraColor: e.target.value,
                }));
              }}
              required
            >
              <option value="">Select Aura Color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
            </select>

            <button type="submit" className="submit-button">
              Generate Gift Ideas
            </button>
          </div>
        )}
      </form>
    </>
  );
}
