import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import linkedinlogo from '../assets/linkedin-logo.png';
import myImage from "../public/background.png";

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),

  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div>
      
      <div className="root">
      <div className="bg-image">
        <Image src={myImage} alt="background image" />
        </div>
        <Head>
          <title>GPT-3 Writer </title>
          <meta name="description" content="Generated by create next app" />
          
        </Head>
        
          
       <div className="container">
         <div className="header">
            <div className="header-title">
              <h1>Explain complex topics in cat terms🐾</h1>
            </div>
            <div className="header-subtitle">
              <h2>What complex topics do you want a cat to explain?</h2>
            </div>
          </div>
      
          <div className="prompt-container">
            <textarea  
             placeholder="start typing here" className="prompt-box" value={userInput} onChange={onUserChangedText}/>
             <div className="prompt-buttons">
             <a
      className={isGenerating ? 'generate-button loading' : 'generate-button'}
      onClick={callGenerateEndpoint}
    >      <div className="generate">
    {isGenerating ? <span className="cat-loader"></span> : <p>Generate</p>}
    </div>
    </a>
    </div>

    {apiOutput && (
    <div className="output">
      
      <div className="output-header-container">
        <div className="output-header">
          <h3>Output</h3>
        </div>
      </div>
      <div className="output-content">
        <p>{apiOutput}</p>
      </div>
    </div>
    )}



          </div>
        </div>
        
        <div className="badge-container grow">
          <a
            href="https://www.linkedin.com/in/hansi-sharma-0b4a87230"
            target="_blank"
            rel="noreferrer"
          >
            <div className="badge">
              <Image src={linkedinlogo} alt="linkedin logo" />
              <p>hansi-sharma</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    
  );
};

export default Home;
