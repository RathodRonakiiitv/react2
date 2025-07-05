import { useState, useCallback, useEffect } from 'react'


function App() {
    const [password, setPassword] = useState('')
    const [length, setLength] = useState(1)
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)

    const passwordGenerator = useCallback(() => {
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      let numbers = '0123456789'
      let symbols = '!)(*&^%$#@_{}:"?><'
      if(numberAllowed) str += numbers
      if(charAllowed) str += symbols
      let password = ''
      for(let i = 0; i < length; i++) {
        let char = Math.floor(Math.random() * str.length)
        password += str.charAt(char)
      }
      setPassword(password)
    }, [length, numberAllowed, charAllowed])
    const copyPasswordToClipboard = () => {
      navigator.clipboard.writeText(password)
    }
    useEffect(() => {
      passwordGenerator()
    }, [length, numberAllowed, charAllowed])


  return (
    <div>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-xl font-bold text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' 
            onChange={(e) => setLength(e.target.value)} />  
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" checked={numberAllowed} id='numberInput' 
            onChange={() => setNumberAllowed((prev) => !prev)} />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"  checked={charAllowed} id='charInput'  
            onChange={() => setCharAllowed((prev) => !prev)} />
            <label>Characters</label>
          </div>
        </div>
        <button className='w-full bg-blue-700 text-white px-3 py-2 my-3 rounded-md' onClick={() => passwordGenerator()}>Generate Password</button>
      </div>
            
    </div>
  )
}

export default App
