import React from "react";
import {
    Link as RouterLink,
    useParams,
    useNavigate
} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Avatar,
    Box,
    Container,
    Grid,
    Fade,
    Link,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik } from "formik";
import * as yup from "yup";

import useRequestAuth from "src/hooks/useRequestAuth";
import { ReactComponent as Logo } from "src/assets/svg/task_logo.svg";
import PasswordResetIllustration from "src/components/Base/Illustrations/PasswordResetIllustration";
import Footer from "src/components/Base/Footer";

const validationSchema = yup.object({
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Passwords didn't match, please try again")
});

export default function SignUp() {
    const navigate = useNavigate();
    const { loading, resetPassword } = useRequestAuth();
    const { uid, token } = useParams();
    const theme = useTheme();

    const successCallback = () => {
        navigate("/signin");
    }

    const handleSubmit = (values) => {
        resetPassword({
            uid,
            token,
            new_password: values.password,
            re_new_password: values.confirmPassword
        }, successCallback)
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
            pt: 4,
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
                                <PasswordResetIllustration
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
                            Remembered your password?
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
                                        Password Recovery
                                    </Typography>
                                </Box>
                            </Box>
                            <Formik
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                                validateOnBlur={false}
                                initialValues={{
                                    confirmPassword: "",
                                    password: "",
                                }}
                                validateOnChange={false}
                            >
                                {(formik) => {
                                    return (
                                        <form
                                            style={{
                                                width: "100%", // Fix IE 11 issue.
                                            }}
                                            noValidate
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="password"
                                                label="Password"
                                                type="password"
                                                {...formik.getFieldProps("password")}
                                                error={
                                                    formik.touched.password && Boolean(formik.errors.password)
                                                }
                                                helperText={formik.touched.password && formik.errors.password}
                                            />
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="confirmPassword"
                                                label="Confirm Password"
                                                type="password"
                                                {...formik.getFieldProps("confirmPassword")}
                                                error={
                                                    formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                                                }
                                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                            />
                                            <LoadingButton
                                                loading={loading}
                                                variant="contained"
                                                fullWidth
                                                type="submit"
                                                color="primary"
                                                sx={{ margin: (theme) => theme.spacing(3, 0, 2) }}
                                            >
                                                Reset Password
                                            </LoadingButton>
                                        </form>
                                    );
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
