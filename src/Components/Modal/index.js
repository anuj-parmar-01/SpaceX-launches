import style from './Modal.module.css'
import nasa_img from '../nasa_img.png'
import wiki_img from '../wiki_img.png'
import youtube_img from '../youtube_img.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(key, value) {
  return [key, value]
}



export default function Modal(props) {
  let { launch } = props
  let data = [
    createData('flight Number', launch.flight_number),
    createData('Mission Name', launch.name),
    createData('Manufacturer', 'SpaceX'),
    createData('Nationality', 'SpaceX'),
    createData('Launch Date', new Date(launch.date_utc).toUTCString().split(' ').slice(0, 5).join(' ')),
    createData('Orbit', 'ISS')
  ]

  return (
    <>
      <div className={style.bg} />
      <div className={style.modal_container}>
        <div style={{ position: 'relative' }}>
          <div className={style.head_container}>
            <div className={style.img_container}>
              <img src={launch.links.patch.small || 'https://images2.imgbox.com/53/22/dh0XSLXO_o.png'} alt='img' />
            </div>
            <div className={style.head_desc}>
              <div style={{ maxWidth: '160px' }}>{launch.name}</div>
              <div>Mission</div>
              <div className={style.link_container}>
                <a href={launch.links.article}><img src={nasa_img} alt='nasa img' /></a>
                <a href={launch.links.wikipedia}><img src={wiki_img} alt='wiki img' /></a>
                <a href={launch.links.webcast}><img src={youtube_img} alt='youtube img' /></a>
              </div>
            </div>
            <div
              className={launch.success ? `${style.success} ${style.status_cell}` : launch.upcoming ? `${style.upcoming} ${style.status_cell}`
                : `${style.failed} ${style.status_cell}`}
            >{launch.success ? 'Success' : launch.upcoming ? 'Upcoming' : 'failed'}</div>
          </div>
          <button onClick={() => props.closeModal([false])} className={style.close_btn}>&#10006;</button>
          <div className={style.desc}>
            {launch.details || `Details Not available`}
            {launch.details && <a href={launch.links.wikipedia} style={{ textDecoration: "none" }}>. Wikipedia</a>}
          </div>

          <TableContainer component={Paper} sx={{ boxShadow: 'none', marginTop: '25px' }}>
            <Table size="small" aria-label="a dense table">

              <TableBody>
                {data.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ padding: '6px 0', width: '50%', fontSize: '15px', color: '#7b6c6c' }} align='left' component="th" scope="row">
                      {row[0]}
                    </TableCell>
                    <TableCell sx={{ padding: '6px 0', fontSize: '15px', color: '#7b6c6c' }} align="center">{row[1].toString()}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}