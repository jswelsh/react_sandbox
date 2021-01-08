import { makeStyles } from '@material-ui/core/styles'
import { /* useLocation */Link } from "react-router-dom"
import {
  Button,
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  toolbarButtons: {
    marginLeft: 'auto'
  },
}))

const Nav = () => {
  const classes = useStyles()
  // const location = useLocation()
  
  return (
  <AppBar position="static" color="primary">
    <Toolbar>
        <Button
          children={
          <Typography
            children='MERN Todo'
            variant="h6"/>}
          component={Link}
          to={'/'}
          // startIcon={}
          color="inherit"
          />
      <div className={classes.toolbarButtons}>
        <Button
          children='create'
          // startIcon={<SvgCart />}
          component={Link}
          variant="outlined"
          color='inherit'
          to={'/create'}/>
      </div>
    </Toolbar>
  </AppBar>
  )
}
export default Nav
/* 
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <Link className="navbar-brand" to="/">
        MERN Todo
      </Link>
      <div className="" id="navbarText">
        <ul className="navbar-nav ml-auto" style={{ display: "inline-block" }}>
          <li className="nav-item mr-4" style={{ display: "inline-block" }}>
            <Link className="nav-link" to="/create">
              Create
            </Link>
          </li>
        </ul>
      </div>
    </nav>
*/