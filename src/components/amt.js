import React from 'react'

function Amt() {
  return (
    <div className='flex bg-[#101720] flex-col w-full h-[100%] p-5'>
      <div className={'w-full h-[30%]   flex flex-row gap-5'}>

        <div className="card w-[50%] h-[90%] flex flex-col justify-evenly items-center bg-[#0B1215] shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-[18px]">card title</h2>

            <div className="card-actions justify-center">
              <button className="btn btn-error btn-sm" disabled >Sell</button>
            </div>
          </div>
        </div>



        <div className="card w-[50%]  h-[90%] flex flex-col justify-evenly items-center bg-[#0B1215] shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-[18px]">Card title!</h2>

            <div className="card-actions justify-center">
              <button className="btn btn-success btn-sm " disabled>Buy</button>
            </div>
          </div>
        </div>




      </div>

      <input type="number" min={0.01} placeholder="Type here" className="input input-bordered w-full max-w-xs mt-10" />

    </div>
  )
}

export default Amt