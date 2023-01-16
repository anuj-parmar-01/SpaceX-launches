import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState , useEffect} from 'react'
import { fetchLaunches, getPastLaunch } from '../../Utilities';
import style from './Table.module.css'
import Modal from '../Modal'
import { createPortal } from 'react-dom';
import PaginationSquare from '../Pagination';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#eeeeeec2',
    color: '#323131'

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 0
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





const types = ['Upcoming Launch', 'Successful Launch', 'All Launches', 'Failed Launches']

export default function LaunchTable() {
  let [dropDownOpen, setDropDownStatus] = useState(false)
  let [launches, setLaunches] = useState([])
  let [isModalOpen, setModalStatus] = useState([false])
  let [launchTypeSelected, setLaunchType] = useState('All Launches')
  let [activePage, setPage] = useState(1)
  let [loading, setLoading] = useState(false)

  async function getLaunches(type){
    setLoading(true)
    let data =   await fetchLaunches(type)
    setLoading(false)
    setLaunches(data)
  }

  const filterData = async (e) => {   
    setPage(1)
    setLaunchType(e.target.innerText)
    setDropDownStatus(!dropDownOpen)
    getLaunches(e.target.innerText)
  }
 
  useEffect( ()=> {  
   getLaunches('All Launches')
  },[])

const pastLaunches= async() => {
  setLoading(true)
   let data = await getPastLaunch()
   setLoading(false)
   setLaunches(data)
}

  return (
    <>
      <div className='filter_container'>
        <div className={style.past_launch} onClick={pastLaunches}>
          <DateRangeIcon fontSize='small'
            style={{ verticalAlign: '-3px', height: '15px', width: '15px', padding: '0 10px' }}
          />
          Past 6 Months
        </div>
        <div className={style.launch_list_container}>
          <button onClick={() => setDropDownStatus(!dropDownOpen)}>
            <FilterAltIcon style={{ verticalAlign: '-3px', height: '15px', width: '15px', padding: '0 10px' }} fontSize='small' />
            {launchTypeSelected}
          </button>
          {
            dropDownOpen && <ul onClick={(e) => filterData(e)} className='launch_list'>
              {
                types.map((type, i) => {
                  return  <li id={type === 'Upcoming Launch' ? 'upcoming' : ''}
                    key={i}  >
                    {type}
                  </li> 
                })
              }
            </ul>
          }
        </div>
      </div>
      <TableContainer sx={{ width: '75%', margin: '0 auto', minHeight: '680px' }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No:</StyledTableCell>
              <StyledTableCell align="center">Launched(UTC)</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Mission</StyledTableCell>
              <StyledTableCell align="center">Orbit</StyledTableCell>
              <StyledTableCell align="center">Launch Status</StyledTableCell>
              <StyledTableCell align="center">Rocket</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && launches.length === 0 && <div className={style.empty}>No results Found for Specified Filter</div>}
            {loading ?
              <Box sx={{ display: 'flex', position: 'absolute', top: '50%', left: '50%' }}>
                <CircularProgress />
              </Box> : launches.slice(12 * (activePage - 1), 12 * activePage).map((row, i) => (
                <StyledTableRow key={i} onClick={() => setModalStatus([true, row])} >
                  <StyledTableCell component="th" scope="row">
                    {i + (activePage - 1) * 12 + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{new Date(row.date_utc).toUTCString().split(' ').slice(0, 5).join(' ')}</StyledTableCell>
                  <StyledTableCell align="center">{row.name} - SpaceX</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">ISS</StyledTableCell>
                  <StyledTableCell align="center">
                    <div
                      className={row.success ? `${style.success} ${style.status_cell}` : row.upcoming ? `${style.upcoming} ${style.status_cell}`
                        : `${style.failed} ${style.status_cell}`}
                    >
                      {row.success ? 'Success' : row.upcoming ? 'Upcoming' : 'Failed'}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {launches.length > 0 && <PaginationSquare page={activePage} setPage={setPage} items={launches.length} />}
      {
        isModalOpen[0] && createPortal(
          <Modal closeModal={setModalStatus} launch={isModalOpen[1]} />
          , document.getElementById('root')
        )
      }
    </>
  );
}