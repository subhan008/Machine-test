import {useState,useEffect} from 'react'
import axios from "axios";
import Navbar from "./navbar";


export function Tabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [table_menu_list, setTable_menu_list] = useState([]);
  const [category_dishes, setCategory_dishes] = useState([]);
  console.log(table_menu_list,'11111 ');
  console.log(category_dishes,'activeindxxx');

  useEffect(()=>{
    axios.get('https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099').then((res)=>{
      setTable_menu_list(res.data[0].table_menu_list)
      setCategory_dishes(res.data[0].table_menu_list[0].category_dishes)
    })
  },[])

  const onHandleMinus = (element , index)=>{
    console.log('ccccc111',index);
    if(count != 0){
      setCount(count-1)
      if (element.count) {
        setCategory_dishes([...category_dishes,category_dishes[index].count = category_dishes[index].count-1])
      }else{
        setCategory_dishes([...category_dishes,category_dishes[index].count = 1])
      }
    }
  }
              
  const onHandlePlus = (element , index)=>{
    setCount(count+1)
    if (element.count) {
      setCategory_dishes([...category_dishes, category_dishes[index].count = category_dishes[index].count+1])
    }else{
      setCategory_dishes([...category_dishes, category_dishes[index].count = 1])
    }
  }
  return (
    <>
    <Navbar count={count}/>    
    <div className=" "> 
      <div className="ml-14 mt-4" style={{width:"89rem"}}>
      
      <div className="flex space-x-3 border-b-2 border-slate-900 overflow-x-auto " style={{width:"89rem"}}>
        {/* Loop through tab data and render button for each. */}
        {table_menu_list.map((tab, idx) => {
          return (
            <button
            style={{width:"20rem"}}
              key={idx}
              className={`py-2 border-b-4  transition-colors duration-300 ${
                idx === activeTabIndex
                  ? "border-teal-500"
                  : "border-transparent hover:border-gray-200"
              }`}
              // Change the active tab on click. 
              onClick={() =>{ setCategory_dishes(tab.category_dishes), setActiveTabIndex(idx)} }>
              {tab.menu_category}
            </button>
          );
        })}
      </div>
      { /* Show active tab content. */}   
      {category_dishes.map((element, idx)=>{
        return typeof element == "object"? <div className="flex justify-between mt-3 border-b border-slate-900"> 
        <div>
          <div className="" >
            <h1 className="text-left font-bold text-xl w-auto font-serif " style={{marginRight:"468px"}} > {element.dish_name} </h1>
            <h1 className="text-left font-medium text-base w-20 " style={{marginRight:"535px"}} > {element.dish_currency} {element.dish_price} </h1>
             <p className="text-left float-left font-medium font-serif text-zinc-500" style={{width:"auto",maxWidth:'46rem'}} >{element.dish_description}</p>
          </div>

          <div className="flex bg-green-600 w-28 h-7 rounded-full mt-9 text-slate-50 ">
             <button onClick={()=>{onHandleMinus(element, idx)}} className="w-12">-</button>
             <h1 className="w-12" style={{paddingTop:"2px"}}>{element.count?element.count:0}</h1>
             <button onClick={()=>{onHandlePlus(element, idx)}} className="w-12">+</button>
          </div>
          <div className="m-3">
            {element.addonCat.length>0 && <p className="text-left text-red-500 ">customization available</p>}
          </div>
        </div> 
        <div className="flex w-80 justify-between"> 
          <p className="mt-10 ml-5" >calarios {element.dish_calories}</p>
          <img className="w-32 h-28 rounded-lg" src={`${element.dish_image}`} alt="" />
        </div> 
        
      </div>:null
      })}
      
    </div>
    </div>
    </>
  );
}

export default Tabs
