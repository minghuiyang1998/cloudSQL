import React, { useState, useEffect } from 'react';
import mitt from 'mitt';

const emitter = mitt();

export default function Message() {
  const [messages, setMessages] = useState([]);

  function onMessage(message) {
    setMessages(messages => [...messages, message]);
    setTimeout(() => setMessages(messages => messages.slice(1)), 3000);
  }

  useEffect(() => {
    emitter.on('message', onMessage);
    return () => emitter.off('message', onMessage);
  }, []);
  
  return null;
}

