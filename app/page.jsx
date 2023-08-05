"use client";
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {
  
  const [mainCategory, setMainCategory] = useState({
    cars: [
      {id: 0, subcat: "BMW", type: [2020, 2021, 2015, "other"]},
      {id: 1, subcat: "Honda", type: [2002, 2019, 2015, "other"]},
      {id: 2, subcat: "Tesla", type: [2000, 2013, 2012, "other"]},
    ],
    animals: [

      {id: 0, subcat: "Cats", type: ["Persian cat", "Sphynx", "Bengal cat", "other"]},
      {id: 1, subcat: "Dogs", type: ["Labrador Retriever", "German Shepherd", "Boston Terrier", "other"]},
      {id: 2, subcat: "Eagles", type: ["Bald eagle", "Golden eagle", "White-tailed eagle", "other"]},
    ],
    movies: [
      {id: 0, subcat: "Adventure", type: ["The Flash", "Transformers: Rise of the Beasts", "The Little Mermaid", "other"]},
      {id: 1, subcat: "Comedy", type: ["Horrible Bosses", "Drillbit Taylor ", "Bad Teacher", "other"]},
      {id: 2, subcat: "Horror", type: ["Haunted Mansion ", "Insidious: The Red Door ", "Five Nights at Freddy's", "other"]},
    ],
  })

  const [subCategory, setSubCategory] = useState(mainCategory.cars);
  const [selectedMainCategory, setSelectedMainCategory] = useState("")
  const [type, setType] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [isOther, setIsOther] = useState(false);
  const [userValue, setUserValue] = useState('');
  const [data, setData] = useState({Maincategory: "", Subcategory: "", Type: ""});
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({Maincategory: selectedMainCategory, Subcategory: selectedSubCategory, Type: selectedType}) 
    console.log(userValue);
  }
  const handleType = (e) => {
    setSelectedSubCategory(e.target.value);
    setType(subCategory.find(ele=> ele.subcat == e.target.value).type);
  }

  const handleSubcategry = (e) => {
    setSelectedMainCategory(e.target.value);
    setType([]);
    setSubCategory(mainCategory[e.target.value]);
  }

  const handleOther = (e) => {
    if(e.target.value == "other") {
      setIsOther(true);
      
    } else {
      setIsOther(false);
      setSelectedType(e.target.value);
    }
  }

  const handleUserInput = (e) => {
    setUserValue(e.target.value);
    setSelectedType(e.target.value)
  }

  return (
    <main className="flex min-h-screen  items-center justify-center flex-col">
      <form onSubmit={handleSubmit} className='flex flex-col border border-[1px solid black] rounded-[10px] p-8 w-[600px]'>
        <div>
          <label htmlFor="mainCategory">Main Category</label>
          <select name="mainCategory" value={selectedMainCategory} id="mainCategory" className='w-full' onChange={handleSubcategry}>
            {Object.keys(mainCategory).map((category,index)=>(
              <option value={category} key={index}>{category}</option>
            ))}
          </select>
        </div>

        <div>
        <label htmlFor="subCategory">Subcategory</label>
          <select name="mainCategory" value={selectedSubCategory} className='w-full' id="mainCategory" onChange={handleType}>
            {subCategory.map((subCategory)=>(
              <option value={subCategory.subcat} key={subCategory.id}>{subCategory.subcat}</option>
            ))}
          </select>
        </div>

        <div>
        <label htmlFor="type">Type</label>
          <select name="type" value={selectedType} id="type" className='w-full' onChange={handleOther}>
            {type.map((item, index)=>(
              <option value={item} key={index}>{item}</option>
            ))}
          </select>
        </div>

        <div>{isOther && <input type='text' className='w-full' placeholder='type your answer' onChange={handleUserInput}/>}</div>
        <button onSubmit={handleSubmit}>Submit</button>
      </form>
      <div className='mt-4'>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key, index)=>(
            <tr key={index}>
              <td>{key}</td>
              <td>{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  )
}