import Image from "next/image";
import { useState } from "react";

interface ICategory {
    title: string
    image: string
}

export const CategoryItem = (props: ICategory) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
       setIsHover(true);
    };
    const handleMouseLeave = () => {
       setIsHover(false);
    };
    const boxStyle = {maxWidth:'700px'   ,backgroundColor: isHover ? '#a561bf'  : '#170b0e', color:'white',
  }     
    return(
        <div key={props.title} style={{margin: '2px', marginBottom: '25px'}}>
        <button
          className='shadow-xl font-extrabold '
  
          style={{ maxWidth: '200px', color: 'white' }}
        >
          <Image
            alt=""
            src={props.image}
            width={200}
            height={120}
         />
            <div style={boxStyle} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            className='max-w-1/2 min-h-50 flex justify-center ml-40 text-20 items-center '
            >     
                {props.title}
            </div>
        </button>
        </div>
    )
}