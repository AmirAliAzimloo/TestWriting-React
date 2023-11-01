import { useState, useEffect } from 'react';

export const useFetch = async(url) => {
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(false);

 const fetchData = async (url) => {
  setLoading(true)
  setData([])
  
  await fetch(url)
  .then((res) => res.json())
  .then((json) => {
     setData(json);
    setLoading(false)
  });
}

 useEffect(() => {
  fetchData(url)
 }, []);

 return { data ,loading}; 
};