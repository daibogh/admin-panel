import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ContactsIcon from '@material-ui/icons/Contacts'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ControlCameraIcon from '@material-ui/icons/ControlCamera'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import { Router, Link } from "@reach/router"
import { HomeRoute } from '../HomeRoute'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TemplateRoute } from '../TemplateRoute'
import { NotificationMessage } from '../NotificationMessage'
import { BuildingRoute } from '../BuildingRoute'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      height: 'calc(100% - 64px)',
      width: '100%',
      paddingTop: '64px',
      // display: 'flex',
      // justifyContent: 'space-around',
      // alignItems: 'center'
    }
  })
)

interface Props {}

export default function MainLayout(props: Props) {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Divider />
      <List>
        {[
          // { label: 'План здания', Icon: ControlCameraIcon, path: '/'},
          // { label: 'Список сотрудников', Icon: ContactsIcon, path: '/employees' },
          // { label: 'Уведомления', Icon: MailIcon, path: '/notifications'},
          { label: 'Здания', Icon: MailIcon, path: '/buildings'},
          { label: 'Новый шаблон', Icon: AddCircleIcon, path: '/templates'}
        ].map(({ label, Icon, path }, index) => (
          <Link key={path} to={path}>
            <ListItem button key={label}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Инвентарь', 'Управление'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <CheckCircleIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Панель мониторинга
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Router>
          <HomeRoute path='/' />
          <TemplateRoute path='/templates' />
          <BuildingRoute path='/buildings' />
        </Router>
      </main>
      <NotificationMessage />
    </div>
  )
}
