'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const SymptomChecker = () => {
  const cookie_email = Cookies.get('email');
  console.log(cookie_email);
  const token = Cookies.get('token');
  const [fetchedData, setFetchedData] = useState([]);

  const [symptomsOpen, setSymptomsOpen] = useState(false);
  const [symptoms, setSymptoms] = useState({
    fever: false,
    cough: false,
    shortnessOfBreath: false,
    soreThroat: false,
    sneezing: false,
    chestPain: false,
    weightLoss: false,
    fatigue: false,
    headache: false
  });
  const [symptomList, setSymptomList] = useState([]);
  const [predictedSymptomList, setPredictedSymptomList] = useState([]);
  const [viewSymptoms, setViewSymptoms] = useState(false);

  const handleCheckboxChange = (event) => {
    setSymptoms({ ...symptoms, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const symptomNames = Object.keys(symptoms).filter(symptom => symptoms[symptom]);
    setSymptomList([...symptomList, symptomNames]);
    setSymptomsOpen(false);
  

    try {
      const response = await axios.post('http://localhost:4000/symptom-checker/add-symptoms', {
        patient_email: cookie_email,
        symptoms: symptomNames,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting symptoms:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/symptom-checker/find/${cookie_email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFetchedData(result.data);
        console.log(result.data)
      } catch (error) {
        console.error('Error fetching health tracker data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="symptomChecker-main-area bg-gray-600 h-screen">
        <div className="symptomChecker-area bg-indigo-400 h-auto">
          <div className="symptomChecker-title-area">
            <p className="symptomChecker-title text-4xl text-black p-14 font-bold">
              Symptom Checker Panel
            </p>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white rounded px-6 py-1 ml-5 mb-5" onClick={() => setSymptomsOpen(!symptomsOpen)}>Add Symptoms</button>
          {symptomsOpen && (
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col " onSubmit={handleSubmit}>
              {Object.keys(symptoms).map(symptom => (
                <label key={symptom} className='text-black capitalize mb-2 ml-12'>
                  <input type="checkbox" name={symptom} checked={symptoms[symptom]} onChange={handleCheckboxChange} />
                  {symptom}
                </label>
              ))}
              <button type="submit" className='bg-green-500 hover:bg-gray-700 text-white rounded px-2 py-1 w-32 ml-8 mt-5'>Submit</button>
            </form>
          )}
          <button className="bg-blue-500 hover:bg-blue-700 text-white rounded px-6 py-1 ml-5 mb-5" onClick={() => setViewSymptoms(!viewSymptoms)}>View Symptoms</button>
          {viewSymptoms && (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className='text-white text-xl'>
                    <th></th>
                    {Object.keys(symptoms).map((symptom, index) => (
                      <th key={index}>Symptom {index + 1}</th>
                    ))}
                    <th>Predicted Symptom</th>
                  </tr>
                </thead>
                // ...
                    <tbody>
                    {fetchedData.map(detail => (
                   <tr className='hover:bg-blue-500 text-white text-lg' key={detail.id}>
                    <th>{detail.id}</th>
                     {Object.keys(symptoms).map((symptom, index) => (
                    <td key={index}>{String(detail[`symptoms_${index + 1}`])}</td>
                      ))}
                    <td>{detail.symptom_Status}</td>
                  </tr>
                  ))}
                </tbody>
              // ...
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SymptomChecker;