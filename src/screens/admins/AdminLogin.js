import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { postData } from '../../services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Www.MedBazzar.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLogin() {
    var navigate = useNavigate()
    const [emailid,setEmailId]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState({})




    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))

    }
    const handleClick=async()=>{
        var submit = true
        if(emailid.length==0)
        {
            handleError("emailid","Plz Enter Emailid....")
            submit = false
        }
        if(password.length==0)
        {
            handleError("password","Plz Enter Password....")
            submit = false
        }
        if(submit)
        {
            var result = await postData("admins/check_admin_login",{emailid,password})
            console.log(result)
            if(result.status)
            {
              localStorage.setItem('ADMIN',JSON.stringify(result.data))
              navigate('/admindashboard')
            }
            else
            {
                Swal.fire({
                    icon: 'Error',
                    title: result.message,
                    timer: 1500,
                })
            }
        }
    }




//     const handleClick=async()=>{
//         var submit = true
//         if(emailid.length==0)
//         {
//             handleError("emailid","Plz Enter Emailid....")
//             submit = false
//         }
//         if(password.length==0)
//         {
//             handleError("password","Plz Enter Password....")
//             submit = false
//         }
//         var result = await postData("admins/check_admin_login",{emailid,password})
//         if(submit)
//         {
//             var result = await postData("admins/check_admin_login",{emailid,password})
//             console.log(result)
//             if(result.status)
//             {
//                 Swal.fire({
//                     icon: 'Success',
//                     title: result.message,
//                     timer: 1500,
//                     toast: true
//                 })
//             }
//             else
//             {
//                 Swal.fire({
//                     icon: 'Error',
//                     title: result.message,
//                     timer: 1500,
//                     toast: true
//                 })
//             }
//         }
//     }
// }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField value={emailid} onFocus={()=>handleError('emailid',null)} onChange={(event)=>setEmailId(event.target.value)} error={error.emailid} helperText={error.emailid}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField value={password} onFocus={()=>handleError('password',null)} onChange={(event)=>setPassword(event.target.value)} error={error.password} helperText={error.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
                onClick={handleClick}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}