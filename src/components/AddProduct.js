import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {url} from './config'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddProduct(props) {
  const classes = useStyles();
  
  const [ state , setState ] = useState({
    product_name : '',
    price : '',
    description : '',
    quantity : '',
  
  })

  const handleChange = (e) =>{
    setState({
      ...state, [e.target.name] : e.target.value
    })
  }
  const apiUrl = url();
  
  const submitProduct = e =>{
    e.preventDefault()
    if(state.product_name === ''){
      alert('product name is required!')
      return
    }else if(state.price === ''){
      alert('price is required!')
      return
    }else if (state.quantity === ''){
      alert('quantity is required!')
      return
    }
    else if(state.description === '') {
      alert('description is required!')
      return
    }
    else{

      const data = {
        product_name : state.product_name,
        price : state.price,
        description : state.description,
        quantity : state.quantity
      }
      Axios.post(`${apiUrl}product`,data)
      .then(res => props.history.push('/'))
    }
  }



  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <ValidatorForm className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextValidator
               validators={['required']}
               errorMessages={['this field is required']}
                name="product_name"
                variant="outlined"
                required
                fullWidth
                label="Product Name"
                autoFocus
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextValidator
                variant="outlined"
                required
                fullWidth
                label="Price"
                name="price"
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                label="Quantity"
                name="quantity"
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
              rows={5}
              id="outlined-multiline-static"
                variant="outlined"
                required
                fullWidth
                multiline
                name="description"
                label="Description"
                onChange={e => handleChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e =>  submitProduct(e)}
          >
          Add Product
          </Button>
        </ValidatorForm>
      </div>
      <Box mt={5}>

      </Box>
    </Container>
  );
}
