import { useEffect, useRef, useState } from 'react';
import './App.css';
import DataList from './components/DataList';

function App() {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [show, setshow] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [doneMessage, setDoneMessage] = useState();
  const pageEnd = useRef();
  const getData = async (pageNumber) => {
    setFetching(true)
    const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`); 
    const jsonData = await response.json();
    setTotalPage(jsonData.nbPages);
    setData(d => [...d, ...jsonData.hits]);
    setFetching(false);
  }
  
  useEffect(() => { 
    getData(pageNumber);
    setTimeout(() => {
        setshow(1);

    },1000);
  }, [pageNumber]);
  
  const getMoreData = () => {
    setPageNumber(pnumber => pnumber + 1);
  }



  let times = 1;
  useEffect(() => {

      if (fetching) {
        setTimeout(() => {
          const observer = new IntersectionObserver(entries => {
            if (pageNumber <= totalPage) {
              if (entries[0].isIntersecting) {
                times++;
                getMoreData();
              }
            } else {
              setDoneMessage("End of page");
              setDisabled(true);
            }
          }, {
            threshold: 1
          })

          observer.observe(pageEnd.current);

        }, 1000);
      }
    
  },[fetching,times]);


  return (
    <div className='wrapper' >
      
      <h1 style={{textAlign:'center',color:'pupl'}}>List of data </h1>

      {data.map((item, index) => {
        return  <DataList index={index} item={item} />

      })}
      {fetching && <div className='loading'>Loading...</div> }
      {show === 1 && <div ref={pageEnd} className="page-end" ></div>}
      {!disabled && <button onClick={getMoreData}>Load more</button>}
      {doneMessage && <h3 style={{textAlign:'center'}}>{doneMessage}</h3>}
    </div>
  );
}

export default App;
