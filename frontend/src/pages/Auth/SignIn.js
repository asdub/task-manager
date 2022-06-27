import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import {
    Avatar,
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    TextField,
    Link,
    Typography,
    useTheme
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik } from "formik";
import * as yup from "yup";

import useRequestAuth from "src/hooks/useRequestAuth";
import { ReactComponent as Logo } from "src/assets/svg/task_logo.svg";
import SignUpIllustration from "src/components/Base/Illustrations/SignUpIllustration";
import Footer from "src/components/Base/Footer";

const validationSchema = yup.object({
    username: yup.string().required("Username/ Email Address required."),
    password: yup.string().required("Password required.")
})


export default function SignIn() {
    const { login, loading } = useRequestAuth();
    const theme = useTheme();

    const handleSubmit = (values) => {
        login(values)
    };

    const styles = {
        gridContainer: {
            height: '100vh',
            minHeight: '810px',
            justifyContent: 'flex-start',
        },
        gridItem0: {
            position: 'relative',
            height: '100%',
            zIndex: '0',
            display: {
                xs: 'none',
                md: 'block',
            },
        },
        gridItem1: {
            backgroundColor: 'background.paper',
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            px: '1.5rem',
            justifyContent: 'center',
        },
        gridItem0Inner: {
            flex: '1 1 auto',
            maxWidth: '480px',
            p: 2,
        },
        boxCenter: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        BoxSignUpContainer: {
            top: 0,
            right: 0,
            width: '100%',
            position: 'absolute',
            display: {
                xs: 'none',
                md: 'block',
            },
        },
        BoxSignUp: {
            width: '100%',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            pr: theme.spacing(3),
            justifyContent: 'flex-end',
        },
        boxSignUpBtm: {
            width: '100%',
            alignItems: 'center',
            pt: 3,
            display: {
                xs: 'flex',
                md: 'none',
            },
        },
        undrawBanner: {
            top: -80,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            zIndex: -1,
            position: 'absolute',
            backgroundColor: 'background.default',
            backgroundImage: 
                `radial-gradient(${theme.palette.primary.main} 0.5px, transparent 0.5px), \
                    radial-gradient(${theme.palette.primary.main} 0.5px, transparent 0.5px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0,20px 20px',
        },
        logoSm: {
            width: '100%',
            height: '80px',
            alignItems: 'center',
            pl: theme.spacing(3),
            display: {
                xs: 'flex',
                md: 'none',
            },
            top: 0,
            left: 0,
            position: 'absolute',
        },
        logoMd: {
            width: '100%',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            pl: theme.spacing(3),
        },
    };

    return (
        <Container
            disableGutters
            component="main"
            maxWidth={false}
            sx={{
                height: '100vh',
                // backgroundColor: theme.palette.secondary.main,
                // backgroundImage: `radial-gradient(${theme.palette.secondary.main} 0.5px, ${theme.palette.background.default} 0.5px)`,
            }}
        >
            <Grid container sx={styles.gridContainer}>
                <Grid item xs={12} md={5} sx={styles.gridItem0}>
                    <Box sx={styles.logoMd}>
                        <Logo className="Logo-md" fill={theme.palette.primary.main} />
                    </Box>
                    <Box sx={styles.undrawBanner}>
                    <SignUpIllustration 
                        fillPrimary={theme.palette.primary.main}
                        fillSecondary={theme.palette.text.secondary} 
                    />
                        {/* <Box
                            component="img"
                            sx={styles.img}
                            src={undraw_vs6q}
                            alt="Sign Up"
                        /> */}
                    </Box>
                </Grid>
                <Grid item xs={12} md={7} sx={styles.gridItem1}>
                    <Box sx={styles.logoSm}>
                        <Logo className="Logo-sm" fill={theme.palette.primary.main} />
                    </Box>
                    <Box sx={styles.BoxSignUpContainer}>
                        <Box sx={styles.BoxSignUp}>
                            Don't have an account?
                            <Link
                                component={RouterLink}
                                color="primary"
                                to="/signup"
                                key="signup"
                                style={{ paddingLeft: '5px' }}
                                styles={styles}
                            >
                                {" Sign Up"}
                            </Link>
                        </Box>
                    </Box>
                    <Box sx={styles.gridItem0Inner}>
                        <Box sx={styles.boxCenter}>
                            <Box sx={styles.boxCenter}>
                                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h2" variant="h4">
                                    Sign in
                                </Typography>
                            </Box>
                        </Box>
                        <Formik
                            validationSchema={validationSchema}
                            validateOnBlur={false}
                            onSubmit={handleSubmit}
                            initialValues={{
                                username: "",
                                password: ""
                            }}
                        >
                            {(formik) => {
                                return (
                                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            color="primary"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username/ Email Address"
                                            name="username"
                                            autoFocus
                                            {...formik.getFieldProps("username")}
                                            error={formik.touched.username && Boolean(formik.errors.username)}
                                            helperText={formik.touched.username && formik.errors.username}
                                        />
                                        <TextField
                                            color="primary"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            {...formik.getFieldProps("password")}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}

                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                        <LoadingButton
                                            color="primary"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            loading={loading}
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign In
                                        </LoadingButton>
                                        <Box>
                                            <Link
                                                color="text.secondary"
                                                component={RouterLink}
                                                to="/password-reset"
                                                key="reset-password">
                                                Forgot password?
                                            </Link>
                                        </Box>
                                        <Box sx={styles.boxSignUpBtm}>
                                            <Typography component="h3" variant="h6">
                                                Not Registered?
                                            </Typography>
                                            <Link
                                                component={RouterLink}
                                                color="primary"
                                                to="/signup"
                                                key="signup-sm"
                                                style={{ paddingLeft: '5px' }}
                                                styles={styles}
                                            >
                                                {" Sign Up today!"}
                                            </Link>
                                        </Box>
                                    </Box>
                                )
                            }}
                        </Formik>
                    </Box>
                    <Footer />
                </Grid>
            </Grid>
        </Container>
    );
}