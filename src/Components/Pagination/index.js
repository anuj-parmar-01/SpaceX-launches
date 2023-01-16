import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import style from './Pagination.module.css'
export default function PaginationSquare(props) {
    let {items} = props;
    let count = Math.ceil(items/12)
    
    const changePage = (e, page) => {
        props.setPage(page)
    }
   
  return (
    <div className={style.pagination_container}>
    <Stack>
      <Pagination page ={props.page} onChange={(e, page) => changePage(e, page)} count={count||1} variant="outlined" shape="rounded" />
    </Stack>
    </div>
  );
}