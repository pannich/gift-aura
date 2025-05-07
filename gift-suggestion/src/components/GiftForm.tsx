import { useState } from 'react'

interface FormData {
  gender: string
  mbtiType: string
  auraColor: string
}

export function GiftForm() {
  const [formData, setFormData] = useState<FormData>({
    gender: '',
    mbtiType: '',
    auraColor: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/generate-gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      console.log('Response:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="gift-form">
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="mbtiType">MBTI Type:</label>
        <select
          id="mbtiType"
          name="mbtiType"
          value={formData.mbtiType}
          onChange={handleChange}
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
      </div>

      <div className="form-group">
        <label htmlFor="auraColor">Aura Color:</label>
        <select
          id="auraColor"
          name="auraColor"
          value={formData.auraColor}
          onChange={handleChange}
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
      </div>

      <button type="submit" className="submit-button">
        Generate Gift Ideas
      </button>
    </form>
  )
}
