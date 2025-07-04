// client/src/components/asktutor.jsx
import React, { useState } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AskTutor = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleAsk = async () => {
    try {
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY` // Replace with your key
        }
      });
      setAnswer(res.data.choices[0].message.content);
    } catch (err) {
      console.error(err);
      setAnswer('Sorry, I could not fetch an answer.');
    }
  };

  const handleMic = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  React.useEffect(() => {
    setQuestion(transcript);
  }, [transcript]);

  return (
    <div className="text-center my-8 px-4">
      <img src="/default-avatar.png" className="mx-auto w-20" alt="Tutor Avatar" />
      <h2 className="text-green-400 font-bold text-2xl mb-4">EduTutor AI 🎓</h2>

      <input
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full md:w-1/2 p-2 text-black rounded"
      />
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleAsk}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Ask Tutor
        </button>
        <button
          onClick={handleMic}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          🎤 Speak
        </button>
      </div>

      {answer && (
        <div className="bg-black mt-6 p-4 rounded border border-green-400 max-w-2xl mx-auto">
          <h3 className="text-pink-400 font-semibold">Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskTutor;
