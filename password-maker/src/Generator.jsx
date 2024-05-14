import { useState, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const Generator = () => {
  const [length, setLength] = useState(8);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [lowerCaseAllowed, setLowerCaseAllowed] = useState(false);
  const [upperCaseAllowed, setUpperCaseAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    if (lowerCaseAllowed) str += "abcdefghijklmnopqrstuvwxyz";
    if (upperCaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*-_~";
    if (str.length === 0) return;

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, lowerCaseAllowed, upperCaseAllowed]);

  const copyBtn = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert('Copied to clipboard');
  }, [password]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-lg font-bold">
      <div className="w-full max-w-lg p-6 mx-auto shadow-lg text-cyan-500 bg-black my-5 rounded-xl">
        <div className="flex items-center mb-4">
          <p className="mr-2 text-white">Your Password:</p>
          <input
            type="text"
            value={password}
            className="border-4 w-1/2 py-1 px-3 rounded-xl"
            placeholder=""
            readOnly
            ref={passwordRef}
          />
          <button className="bg-cyan-200 ml-2 outline-black rounded-xl py-2 px-4" onClick={copyBtn}>
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>

        <div className="flex gap-x-1 mb-4">
          <p className='text-white'>Range:</p>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer w-1/2"
            onChange={(e) => { setLength(Number(e.target.value)) }}
          />
          <p>Length: {length}</p>
        </div>

        <div className="flex gap-x-1 mb-4">
          <input
            type="checkbox"
            checked={characterAllowed}
            onChange={(e) => { setCharacterAllowed((prev) => !prev) }}
          />
          <p>Special Characters</p>
        </div>

        <div className="flex items-center gap-x-1 mb-4">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => { setNumberAllowed((prev) => !prev); }}
          />
          <p>Numbers</p>
        </div>

        <div className="flex items-center gap-x-1 mb-4">
          <input
            type="checkbox"
            checked={lowerCaseAllowed}
            onChange={() => { setLowerCaseAllowed((prev) => !prev); }}
          />
          <p>Lowercase</p>
        </div>

        <div className="flex items-center gap-x-1 mb-4">
          <input
            type="checkbox"
            checked={upperCaseAllowed}
            onChange={() => { setUpperCaseAllowed((prev) => !prev); }}
          />
          <p>Uppercase</p>
        </div>

        <button
          className="bg-cyan-200 w-full outline-black rounded-xl py-2 px-4"
          onClick={passwordGenerator}
        >
          <FontAwesomeIcon icon={faSyncAlt} /> Generate
        </button>
      </div>
    </div>
  );
}

export default Generator;
