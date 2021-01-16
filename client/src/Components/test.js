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
