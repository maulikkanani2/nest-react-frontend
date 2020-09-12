import React from 'react';
import { BrowserRouter,Switch , Route  } from 'react-router-dom'
import  Products  from './Products'
import AddProduct from './AddProduct'
class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact  component={Products} />
                    <Route path="/add"   component={AddProduct} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App