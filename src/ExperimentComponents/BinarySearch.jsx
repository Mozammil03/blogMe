import React from 'react'

const nums = []; 
let i = 10;
while (i!=0) {
    nums.push(Math.floor(Math.random() * 10))
    i--;
}






const BinarySearch = () => {
  return (
    <div className='h-[100vh] w-[100%]'>
          <div>BinarySearch</div>
          <div className='flex gap-2 '>{nums.map((num) => <div className='w-fit rounded-2xl h-fit p-2 bg-green-500'>{ num }</div>)}</div>
    </div>
  );
}

export default BinarySearch