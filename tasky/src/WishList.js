import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
 
  List, 
  ListItem, 
  TextField } from "@material-ui/core";
  import React, {useState} from "react";
  

  function WishList({
    title
  }) {
    const [wishList, setWishList] = useState(['hello']);
    const [text, setText] = useState('');
    const handleChange = (e) => setText(e.target.value);

    const addWishListItem = (e) => {
      e.preventDefault();
      setWishList([...wishList, text])
    }
    const handleDelete = (e) => {
      const array = [...wishList];

      console.log(array);
      
      const index = array.indexOf(e);
      if (index > -1) {
        array.splice(index, 1)
      }
      setWishList(array)
    }
    return (
    <Card>
      <CardHeader
      title={title}
      titleTypographyProps={{ align: 'center',variant: "h4" }}
      />
      <CardContent>
        <Card>
          <List>
            {wishList && wishList.length !== 0 && wishList.map(WishListItem => {
            return (
            <ListItem button onClick={()=>{handleDelete(WishListItem)}}>
              {WishListItem}
            </ListItem>)
            }
            )
            }

          </List>
        </Card>
        <form 
          onSubmit={(e)=>{
            addWishListItem(e) 
          console.log(wishList)}} >
          <TextField 
          id="wishItem" 
          label="wishItem" 
          name='wishItem'
          onChange={handleChange}
          />
          <Button variant="contained" type="submit" color="primary">Add</Button>
         {/*  <Button variant="contained" color="primary">Submit</Button> */}
        </form>
        
      </CardContent>
    </Card>
    );
  }
  
  export { WishList }