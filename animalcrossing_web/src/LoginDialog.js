import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import { useMutation } from '@apollo/react-hooks';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const LOGIN_QUERY = gql`
    mutation ($username: String!, $password: String!) {
      tokenAuth(username: $username, password: $password) {
        token
      }
    }`

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

// class XXX extends React.Component {
//   render() {
//     console.log("xxx")
//     return (
//       <Query query={LOGIN_QUERY} variables={{username: 'paco', password: 'paco'}}>
//         {({ loading, error, data }) => {
//             if (loading) return <div>Fetching</div>
//             if (error) return <div>${error.message}</div>
//             console.log(data.token)
//             return <div></div>
//         }}
//       </Query>
//     )
    
//   }
// }

export default function LoginDialog(props) {
  const classes = useStyles();
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const [login, { loading, error, data }] = useMutation(LOGIN_QUERY, {variables: { username: 'paco', password: 'paco' }}
  );

  if(data) {
    localStorage.setItem('Authorization', 'JWT ' + data.tokenAuth.token)
    handleClose()
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              登入
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            label="username"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            label="password"
            type="password"
            fullWidth
          />
          <Button autoFocus color="inherit" onClick={login}>
              登入
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}