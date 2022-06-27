import * as React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Fade,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik } from "formik";
import * as yup from "yup";

import useRequestAuth from 'src/hooks/useRequestAuth';
import { ReactComponent as Logo } from "src/assets/svg/task_logo.svg";
import SignUpIllustration from "src/components/Base/Illustrations/SignUpIllustration";
import Footer from "src/components/Base/Footer";

const validationSchema = yup.object({
    username: yup.string().required("Username required"),
    password: yup.string().required("Password required"),
    email: yup.string().email("Valid email required").required("Email adddress required")
})

export default function SignUp() {
    const { register, loading } = useRequestAuth();
    const navigate = useNavigate();
    const theme = useTheme()

    const handleSubmit = (values) => {
        register(values, () => {
            navigate("/signin")
        })
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
            }}
        >
            <Grid container sx={styles.gridContainer}>
                <Grid item xs={12} md={5} sx={styles.gridItem0}>
                    <Box sx={styles.logoMd}>
                        <Logo className="Logo-md" fill={theme.palette.primary.main} />
                    </Box>
                    <Box sx={styles.undrawBanner}>
                        <Fade in={true} timeout={500}>
                            <div>
                                <SignUpIllustration
                                    fillPrimary={theme.palette.primary.main}
                                    fillSecondary={theme.palette.text.secondary}
                                />
                            </div>
                        </Fade>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7} sx={styles.gridItem1}>
                    <Box sx={styles.logoSm}>
                        <Logo className="Logo-sm" fill={theme.palette.primary.main} />
                    </Box>
                    <Box sx={styles.BoxSignUpContainer}>
                        <Box sx={styles.BoxSignUp}>
                            Already have an account?
                            <Link
                                component={RouterLink}
                                color="primary"
                                to="/signin"
                                key="signin"
                                style={{ paddingLeft: '5px' }}
                                styles={styles}
                            >
                                {" Sign In"}
                            </Link>
                        </Box>
                    </Box>
                    <Fade in={true} timeout={400}>
                        <Box sx={styles.gridItem0Inner}>
                            <Box sx={styles.boxCenter}>
                                <Box sx={styles.boxCenter}>
                                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h2" variant="h4">
                                        Sign Up
                                    </Typography>
                                </Box>
                            </Box>
                            <Formik validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                validateOnBlur={false}
                                initialValues={{
                                    email: "",
                                    username: "",
                                    password: "",
                                }}
                            >
                                {(formik) => {
                                    return (
                                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="username"
                                                        label="Username"
                                                        name="username"
                                                        {...formik.getFieldProps("username")}
                                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                                        helperText={formik.touched.username && formik.errors.username}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
                                                        {...formik.getFieldProps("email")}
                                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                                        helperText={formik.touched.email && formik.errors.email}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        id="password"
                                                        autoComplete="new-password"
                                                        {...formik.getFieldProps("password")}
                                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                                        helperText={formik.touched.password && formik.errors.password}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <LoadingButton
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                loading={loading}
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Sign Up
                                            </LoadingButton>
                                            <Box sx={styles.boxSignUpBtm}>
                                                <Typography component="h3" variant="subtitle1">
                                                    Have an account?
                                                </Typography>
                                                <Link
                                                    component={RouterLink}
                                                    color="primary"
                                                    to="/signin"
                                                    key="signin-sm"
                                                    style={{ paddingLeft: '5px' }}
                                                    styles={styles}
                                                >
                                                    {"Sign In"}
                                                </Link>
                                            </Box>
                                        </Box>
                                    )
                                }}
                            </Formik>
                        </Box>
                    </Fade>
                    <Footer />
                </Grid>
            </Grid>
        </Container>
    );
}