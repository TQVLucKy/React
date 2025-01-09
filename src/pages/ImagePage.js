import { useState } from "react"
import LinkList from "../components/Link";
const ImagePage=({})=>{
const [img,setImg]= useState([]);


const handleImageChange = (event)=>{
    const files= Array.from(event.target.files);
    const imageUrls= files.map(file =>  URL.createObjectURL(file));
    setImg(imageUrls);
}
return (
    <>
    <LinkList/>
    <div>
        <h1>ImagePage</h1>
        <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleImageChange}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
            {img.map((img, index) => (
                <img 
                    key={index} 
                    src={img} 
                    alt={`Selected ${index}`} 
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                />
            ))}
        </div>
    </div>
    </>
);
}
export default ImagePage