// import React, { useState, useEffect } from 'react';
// import styles from './index.scss';
// import mitt from 'mitt';

// const emitter = mitt();

// export default function Message() {
//   const [messages, setMessages] = useState([]);

//   function onMessage(message) {
//     setMessages(messages => [...messages, message]);
//     setTimeout(() => setMessages(messages => messages.slice(1)), 3000);
//   }

//   useEffect(() => {
//     emitter.on('message', onMessage);
//     return () => emitter.off('message', onMessage);
//   }, []);

//   if (messages && messages.length > 0) {
//     const msg = messages[messages.length - 1];
//     const classNames = [styles.message];
//     if (msg.type === 'error') {
//       classNames.push(styles.error);
//     }
//     return <div className={classNames.join(' ')}>{msg.message}</div>;
//   }

//   return null;
// }

