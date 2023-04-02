import {createContext} from "react";
import {baseUrl} from "../baseUrl";
import {useState } from 'react';

// there are total three steps to use context api
// 1. creating context
export const AppContext = createContext();

// 2.Provision of data(Provider)
export default function AppContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    // data filling pending

    async function fetchBlogPosts(page = 1) {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        console.log("Printing the final URL");
        console.log(url);
        try{
            const result = await fetch(url);
            const data = await result.json();
            console.log(data);
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        }
        catch(error) {
            console.log("Error in fetching data");
            setPage(1);
            setPosts([]);
            setTotalPages(null);

        }
        setLoading(false);
    }
     

    function handlePageChange(page) {
        setPage(page);
        fetchBlogPosts(page);
    }


    const value = {
       posts,
       setPosts,
       loading,
       setLoading,
       page,
       setPage,
       totalPages,
       setTotalPages,
       fetchBlogPosts,
       handlePageChange
    };

    //2.  return appcontext i.e. provider
    return <AppContext.Provider value = {value}>
        {children}
    </AppContext.Provider>;
}
