import React, { useState, useRef } from "react";

export default function VoiceInputButton({ onTranscript }) {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognitionRef.current = recognition;
    recognition.onstart = () => setRecording(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onTranscript(text);
    };

    recognition.onend = () => setRecording(false);
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <button
        onClick={recording ? stopRecording : startRecording}
        className={`
            px-4 py-2 
            rounded-lg 
            text-white 
            cursor-pointer 
            mb-3
            transition 
            mt-10
            ${recording ? "bg-red-600" : "bg-black hover:bg-gray-800"}
        `}
    >
        {recording ? "🎤 Recording..." : "🎙 Speak Task"}
    </button>
  );
}