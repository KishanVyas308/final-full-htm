import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IoIosSend } from 'react-icons/io';
import ReactLoading from 'react-loading';
import { IoClose } from 'react-icons/io5';
import { FaCross } from 'react-icons/fa';

const InputFieldStyle: React.CSSProperties = {
  padding: '8px',
  width: '100%',
  fontSize: '16px',
  borderRadius: '8px',
  borderColor: '#252746',
  borderWidth: '1.5px',
  outline: 'none',
  transition: 'border-color 0.3s',
  //@ts-ignore
  outline: '2px solid transparent',
};

interface Message {
  type: 'user' | 'bot';
  content: string | JSX.Element;
}

interface Props {
  setShowChatBot: (show: boolean) => void;
}

function ChatBot({ setShowChatBot }: Props) {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI('AIzaSyAMUABPSMqboagI-T8iv9_wqTumacsHld8');
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages]);

  const handleGenerate = async () => {
    setMessages([
      ...messages,
      { type: 'user', content: userInput },
      {
        type: 'bot',
        content: (
          <ReactLoading
            type={'bubbles'}
            height={22}
            className="transition -translate-y-[20px]"
            color="#fff"
          />
        ),
      },
    ]);
    const tempInp = userInput;
    setUserInput('');
    setLoading(true);
    const result = await model.generateContent(userInput);
    const response = await result.response;
    const text = await response.text();

    // Update messages state with user input and generated content
    setMessages([
      ...messages,
      { type: 'user', content: tempInp },
      { type: 'bot', content: text },
    ]);
    setLoading(false);

    // Clear userInput
  };

  return (
    <div
      className="absolute bottom-0 right-0 m-8  z-20 w-[360px] bg-primary rounded-2xl ring-[6px]  justify-end ring-mid-purple shadow-2xl shadow-extra-dark-purple"
    >
      <div className="absolute right-3 top-3">
        <IoClose
          className="text-[22px] cursor-pointer"
          onClick={() => setShowChatBot(false)}
        />
      </div>
      <div
        className="chat-box flex-1 mx-3 mt-2 h-[calc(100vh-225px)] overflow-y-auto justify-end"
        style={{ scrollbarWidth: 'none' }}
      >
        {messages.length === 0 ? (
          <div
            className="h-[calc(100vh-225px)] flex flex-col items-center justify-center text-[20px] font-montserrat font-semibold "
          >
            <div className="flex flex-col items-center justify-center">
              <div>
                <span className="text-white mr-3">Cain-Learn</span>
                <span className="text-light-purple">ChatBot</span>
              </div>
              <span className="text-light-purple">Powerd by</span>
            </div>
            <iframe
              className="mb-3"
              src="https://lottie.host/embed/3a3b3e83-1c92-4748-8b81-352a32ae0a60/vageNuhXof.json"
            ></iframe>
          </div>
        ) : (
          <></>
        )}

        {messages.map((message, index) => (
          <div key={index}>
            {message.type === 'user' ? (
              <div
                className="ml-16 my-3 p-2 text-white bg-mid-purple rounded-md"
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                {message.content}
              </div>
            ) : (
              <div
                className="mr-14 my-2 p-2 bg-dark-purple text-white rounded-md"
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                {message.content}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex mx-4 mt-1 gap-2 mb-3 items-center">
        <input
          type="text"
          value={userInput}
          className="focus:bg-dark-purple text-wrap text-white bg-mid-purple focus:ring-2 ring-purple"
          style={InputFieldStyle}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            loading ? '' : e.key === 'Enter' ? handleGenerate() : '';
          }}
        />
        <div className="text-[26px] text-white justify-center flex ">
          {loading ? (
            // <ReactLoading className='cursor-wait' type={'bars'} color="" width={40} height={35} />
            <IoIosSend className="cursor-pointer" />
          ) : (
            <IoIosSend onClick={handleGenerate} className="cursor-pointer" />
          )}
        </div>
      </div>
      <div className="absolute top-[10px] right-[10px] ">
        {/* <IoClose className='text-[24px] text-white'/> */}
      </div>
    </div>
  );
}

export default ChatBot;