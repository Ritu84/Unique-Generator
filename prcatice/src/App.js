import { useState , useCallback, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [length, setlength] =useState(8);
  const [numallow, setnumallow] =useState(false);
  const [charallow, setcharallow] =useState(false);
  const [password, setpassword] =useState("");
  const passref=useRef(null);

  const passwordGenerate = useCallback(()=>{
    let pass="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    if(numallow) str +="0123456789";
    if(charallow) str +="~`!@#$%^&*()[]{}/|";
     
    for (let i = 0;i <= length;i++) {
      let char= Math.floor(Math.random()*str.length+1);

      pass +=str.charAt(char);
      
    }
    setpassword(pass);

  },[length,numallow,charallow ]);

 
  const copytoclipboard=(()=>{
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
  })

useEffect(()=>{ passwordGenerate()}
,[length,numallow,charallow, passwordGenerate]);

  return (
    <div className='hero-sec'>
      <h1 className='heading'>Password generator</h1>

      <div  >
        <input className='input-field'
        type='text'
        value={password}
        placeholder='Password'
        readOnly
        ref={passref}
         />
         <button className='Button' onClick={copytoclipboard}>copy</button>
        </div  >
        <div className='conatiner'>
          <div>
            <input
            type='range'
            min={6}
            max={50}
            value={length}
            className='cursor-slider'
            onChange={e => setlength(e.target.value)}
            />
            <label >Length:{length}</label>
          </div>
          <div>
            <input
            type='checkbox'
            defaultChecked={numallow}
            id='numInput'
            onChange={(e)=>{setnumallow((prev)=> !prev); }}
            />
            <label htmlFor='numInput'>Numbers</label>
          </div>
          <div>
            <input
            type='checkbox'
            defaultChecked={charallow}
            id='charInput'
            onChange={(e)=>{setcharallow((prev)=> !prev); }}
            />
            <label htmlFor='numInput'>Characters</label>
          </div>

        </div>

    </div>
  );
}

export default App;
