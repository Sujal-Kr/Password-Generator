
import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Toaster,toast } from 'sonner'
function App() {
  const [password, setPassword] = useState("ubeffbdsoc84230bASC")
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*():<>,./?"
    if (number == true) str += numbers
    if (symbol == true) str += symbols
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length)
      pass += str.charAt(index)
    }
    setPassword(pass)
  }, [number, symbol, length])

  const handleClipboard =()=>{
    window.navigator.clipboard.writeText(password)
    toast.success("Copied to clipboard")
  }

  useEffect(() => {
    passwordGenerator()
  }, [number, symbol, length])



  return (
    <>
      <Toaster/>
      <div className='p-2 md:p-20  text-white '>
        <h1 className='text-3xl text-center   '>Password Generator </h1>
        <div className='w-full max-w-5xl  mx-auto my-20 md:my-0 shadow-lg'>
          <div className=' flex flex-col gap-2 my-4 relative '>
            <label htmlFor="pass" className='uppercase text-slate-600 text-bold'>generated password</label>
            <input type="text" className='text-center bg-[#001d3d] px-2 py-4  text-xl outline-none' value={password} readOnly onClick={handleClipboard}/>
          </div>
          <div className='flex flex-col my-4 py-3 gap-2'>
            <label htmlFor="length" className='uppercase text-slate-600'>length- {length}</label>
            <input className="bg-[#001d3d]  h-1" type="range" min="0" max="24" step="2" onChange={(e) => setLength(e.target.value)} name="length" value={length} />
          </div>
          <div className='uppercase flex justify-between items-center py-3 bg-[#001d3d] px-2 my-3'>
            <label htmlFor='num-check'>include numbers</label>
            <input type="checkbox" checked={number} id='num-check' onChange={() => setNumber(!number)} />
          </div>
          <div className='uppercase flex justify-between items-center py-3 bg-[#001d3d] px-2'>
            <label htmlFor='symbol-check'>include symbols</label>
            <input type="checkbox" checked={symbol} id='symbol-check' onChange={(() => setSymbol(!symbol))} />
          </div>
          <div className='my-20'>
            <input className='px-2 py-4 bg-[#4361ee] w-full uppercase' type="button" value='generate' onClick={passwordGenerator} />
          </div>
        </div>

      </div>
    </>
  )
}

export default App
