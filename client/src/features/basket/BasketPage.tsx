import { useFetchBasketQuery } from './basketApi'
import { Button, Grid2, Typography } from '@mui/material';
import BasketItem from './BasketItem';

export default function BasketPage() {
  const {data, isLoading} = useFetchBasketQuery();

  if(isLoading) return <Typography>!!!Loading!!!</Typography>

  if(!data) return <Typography variant='h3'> Your Basket is Empty </Typography>


  return (
    <>
    <Button variant="contained" onClick={() => console.log(data)}>Log Basket Data</Button>
    <div>{data.basketId}</div>
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {data.items.map(item => (
            <BasketItem item={item} key={item.productId}/>
        ))}
      </Grid2>
    </Grid2>

    </>
  )
}
