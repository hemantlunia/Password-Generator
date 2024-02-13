import { useState,useCallback, useEffect,useRef } from "react"


function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState('')

  // useref hook
  const passwordref = useRef(null)

  const passwordGenerator = useCallback(()=>{
  
    let pass = ""
    let str = "ZXCVBNMLKJHGFDSAQWERTYUIOPmnbvcxzasdfghjklpoiuytrewq"

    if(numberAllowed) str += "1234567890"
    if(charAllowed) str += "!@#$%&?"
     
    for(let i = 1;i<=length;i++){
      let char =Math.floor(Math.random()*str.length+1)

      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copypaastoclip = useCallback(()=>{
    // passwordref.current?.Select();
    window.navigator.clipboard.writeText(password)
  },[password]);

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-10 my-8 text-[black] bg-[pink] text-center">
        <h1 className="text-[red] text-center my-5 font-mono underline">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
         type="text" 
         value={password}
         className="outline-none w-full py-1 px-3"
         placeholder="password"
         readOnly
         ref={passwordref}
         />
         <button
         onClick={copypaastoclip}
          className="outline-none bg-[magenta] text-white px-3 py-0.5 shrink-0 hover:bg-red-600">Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
         <div className="flex items-center gap-x-1">
          <input 
          type="range" 
          min={6}
          max={50}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length : {length}</label>
         </div>
         <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={()=>{setNumberAllowed((prev)=>!prev)}}
           />
           <label htmlFor="numberInput">Numbers</label>
         </div>
         <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={()=>{setCharAllowed((prev)=>!prev)}}
           />
           <label>Character</label>
         </div>
      </div>
    </div>
    </>
  )
}

export default App
