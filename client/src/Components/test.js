<div className="App">
{(user.email !== '')
  ? (
    <div className ="Welcome">
        <h2 className="text-center"> Welcome  </h2>
        <Button className="btn-lg btn-dark btn-block" onClick={Logout}> Logout  </Button>
       
    </div>
    )
  : (
 <LoginForm Login={Login} error={error}/>
//     <RegisterForm Register={Register} error={error}/>


    )}
</div>


<div className="container">
<div className="row">
    <div className="col-md-6 offset-md-3">
        <Route path="/login" component={LoginForm} />
    </div>
</div>
</div>



<Link to="/register" className="nav-item nav-link">Home</Link>



<nav className="navbar navbar-expand navbar-dark bg-dark">
<div className="navbar-nav">
    <Link to="/" className="nav-item nav-link">Home</Link>
    <Link to="/login" className="nav-item nav-link">Home</Link>
    <Link to="/register" className="nav-item nav-link">Home</Link>
</div>
</nav>




return (
  <Router >
  <div className="container">

  <Link to="/register">
   <Button type="button">
        Click Me!
   </Button>
  </Link>
    <Switch >
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/" component={Welcome} />

    </Switch>
  </div>

</Router>
);

}






//
export default function Nav(props) {


  return (

                ( props.profile !== '') ? (
                <div className ="container">
                   <nav className="navbar navbar-expand navbar-dark bg-dark">
                              <div className="navbar-nav">
                                    <Link to="/home-client-profile" className="nav-item nav-link">Home</Link>
                                    <Link to="/client-profile" className="nav-item nav-link">Profile</Link>
                                    <Link to="/surveys" className="nav-item nav-link">Surveys</Link>
                              </div>
                          </nav>   
                  
                </div> )
                 :   
                  (<div className="container">   
                          <nav className="navbar navbar-expand navbar-dark bg-dark">
                              <div className="navbar-nav">
                                    <Link to="/" className="nav-item nav-link">Home</Link>
                                    <Link to="/login" className="nav-item nav-link">Log in</Link>
                                    <Link to="/register" className="nav-item nav-link">Sign Up</Link>
                              </div>
                          </nav>                  
                  
                    </div>
                   )
  )

}
//