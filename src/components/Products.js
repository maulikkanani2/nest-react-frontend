import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
import {url } from './config'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
  },
  container: {
    width: '95%',
    margin: '0 auto',
  },
  btndel: {
    marginLeft: 10,
    background: '#d93749',
    color: '#fff',
  },
  btnedit: {
    background: '#fdc02e',
  },
  head:{
    fontWeight: 600,
    fontSize: '19px',
  },
  des:{
    fontSize: '19px',
  },
  btnitem:{
    background: '#30a54a',
    color : '#fff',
    margin: '20px 0' 
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Products(props) {
  const classes = useStyles();
  const [Products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [Id, setId] = useState('');
  const [DeleteId, setDeleteId] = useState('');

  const [state, setState] = useState({
    product_name: '',
    price: '',
    description: '',
    quantity: '',
  });
  const apiUrl = url();

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = () => {
    fetch(`${apiUrl}product`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  };

  
  const edit = (data, id, e) => {
    setId(id);
    setState({
      product_name: data.product_name,
      price: data.price,
      description: data.description,
      quantity: data.quantity,
    });
    setOpen(true);
  };
  

  const update = () => {
    
    Axios.put(`${apiUrl}product/${Id}`, state)
      .then((res) => {
        setOpen(false);
        
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = ()  =>{
    Axios.delete(`${apiUrl}product/${DeleteId}/delete`)
    .then((res) => {
      setOpenD(false);
      fetchData();
    })
    .catch((err) => console.log(err));
  }

  const del = (id) =>{
    setDeleteId(id)
    setOpenD(true);
  }
  const handleCloseD = () => {
    setOpenD(false);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const openAddForm  = () =>{
    props.history.push('/add')
  } 

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <h1>CRUD Database</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>ID</TableCell>
                <TableCell className={classes.head}>Product Name</TableCell>
                <TableCell align="left" className={classes.head}>Price</TableCell>
                <TableCell align="left" className={classes.head}>Quantity</TableCell>
                <TableCell align="left" className={classes.head}>Description</TableCell>
                <TableCell align="left" className={classes.head}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Products.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left" className={classes.head}>{row.id}</TableCell>
                  <TableCell component="th" scope="row" className={classes.des}>
                    {row.product_name}
                  </TableCell>
                  <TableCell align="left" className={classes.des}>{row.price}</TableCell>
                  <TableCell align="left" className={classes.des}>{row.quantity}</TableCell>
                  <TableCell align="left" className={classes.des}>{row.description}</TableCell>
                  <TableCell align="left" >
                    <Button
                      variant="contained"
                      className={classes.btnedit}
                      onClick={(e) => edit(row, row.id, e)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.btndel}
                      onClick={(e) => del(row.id)}
                    >
                      Del
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button 
        variant="contained"
        onClick={e => openAddForm(e)}
        className={classes.btnitem}
        >Add Item</Button>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Product</DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="product_name"
                    variant="outlined"
                    required
                    fullWidth
                    label="Product Name"
                    autoFocus
                    defaultValue={state.product_name}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Price"
                    name="price"
                    defaultValue={state.price}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    defaultValue={state.quantity}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    rows={5}
                    id="outlined-multiline-static"
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    name="description"
                    label="Description"
                    defaultValue={state.description}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => update(e)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
       maxWidth={'lg'}
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="form-dialog-title"
        style={{     width: '100%'}}
      >
        <DialogContent>
         <h3>Are you sure to delete? </h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseD} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => deleteProduct(e)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
