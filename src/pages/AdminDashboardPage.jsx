import React, { useState, useEffect, useContext } from "react";
import MkdSDK from "../utils/MkdSDK";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import Videos from "../components/Videos";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function getDate() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec']
  const todayDate = new Date()
  const date = todayDate.getDate()
  const year = todayDate.getFullYear()
  const month = months[todayDate.getMonth()]
  return {
    date,
    month,
    year
  }
}

function getTime() {
  const date = new Date()
  let hours = date.getHours()
  hours = (hours % 12) || 12
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`
}

const date = getDate()

const AdminDashboardPage = () => {
  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const logout = () => {
  dispatch({ type: 'LOGOUT' })
  navigate('/admin/login')
  }

  useEffect(() => {
    let sdk = new MkdSDK();
    setLoading(true)
    const loadVideos = async () => {
      try {
        const payload = {
          page,
          limit
        }

        const data = await sdk.callRestAPI(payload, 'PAGINATE')
        if (data) {
          setVideos(data.list)
          setLoading(false)
        }
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    loadVideos()
  }, [page])

  const loadPrevVideos = () => {
    setPage(prevSate => {
      if (prevSate === 1) {
        return
      } else {
        return prevSate - 1
      }
    })
  }

  const loadNextVideos = () => {
    setPage(prevSate => prevSate + 1)
  }

  return (
    <>
      <div style={{ backgroundColor: '#111111' }} className="container mx-auto text-gray-700 p-8">
        {/* Navigation */}
        <nav className="flex justify-between mx-8 my-0 p-4 pt-0 text-white">
          <h1 className="text-4xl font-extrabold">APP</h1>
          <button onClick={logout} style={{ backgroundColor: '#9BFF00' }} className='text-black px-6 font-thin rounded-full flex items-center justify-between'>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
</svg>

            </span>
            Logout</button>
        </nav>

        <div className="mx-8 mt-4 my-0 p-4 flex justify-between text-xs">
          <p className="text-4xl font-thin text-white">Today's Leaderboard</p>
          <div style={{backgroundColor: '#1D1D1D'}} className='flex items-center justify-center p-3 rounded-lg'>
            <span>{`${date.date} ${date.month} ${date.year}`}</span>
            <span style={{ backgroundColor: '#9BFF00'}} className="p-1 mx-3 rounded-lg">SUMISSIONS OPEN</span>
            <span>{getTime()}</span>
          </div>
        </div>

        {!loading ?  <table style={{width:'100%'}}  className='mt-4 my-0 p-4 table mx-auto'>
            <thead className="mt-4">
            <tr className='text-xs'>
              <th className="text-left">Title</th>
              <th>Author</th>
              <th>Most Liked</th>
            </tr>
          </thead>
            <DndProvider backend={HTML5Backend}>
            <Videos videos={videos}/>
            </DndProvider>
          </table> : ''}
         

        {!loading ? <div className="buttons mt-4">
         {page !== 1 ? <button onClick={loadPrevVideos} style={{ backgroundColor: '#9BFF00' }} className="text-black px-6 font-thin rounded-full">Prev</button> : ''}
         {page !== 12 ? <button onClick={loadNextVideos} style={{ backgroundColor: '#9BFF00' }} className="text-black px-6 font-thin rounded-full">Next</button> : ''}
        </div> : ''}
      </div>
    </>
  );
};

export default AdminDashboardPage;
