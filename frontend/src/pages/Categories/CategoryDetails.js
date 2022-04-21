import React, { useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Box, Grid, TextField, Typography, Paper, Button } from "@mui/material";
import * as yup from "yup";

import useRequestResource from 'src/hooks/useRequestResource';


export default function CategoryDetails() {
    const { addResource, resource, getResource, updateResource } = useRequestResource({ endpoint: "categories" })
    const [ initialValues, setInitialValues ] = useState({
        name: "",
        colour: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getResource(id);
        }
    }, [id, getResource]);

    useEffect(() => {
        if (resource) {
            setInitialValues({
                name: resource.name,
                colour: resource.colour
            })
        }
    }, [resource])

    const handleSubmit = values => {
        if (id) {
            updateResource(id, values, () => {
                navigate("/categories");
            })
            return;
        }
        addResource(values, () => {
            navigate("/categories")
        })
    }

  return (
    <Paper sx={{
        borderRadius: "2px",
        boxShadow: (theme) => theme.shadows[5],
        padding: (theme) => theme.spacing(2, 4, 3)
    }}>
        <Typography variant="h6" mb={2}>
            {id ? "Edit Category": "Create Category"}
        </Typography>
        <Formik onSubmit={handleSubmit} initialValues={initialValues} enableReinitialize>
            {(formik) => {
                return (
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    {...formik.getFieldProps("name")}
                                    error={formik.touched.name & Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="colour"
                                    label="Colour"
                                    {...formik.getFieldProps("colour")}
                                    error={formik.touched.colour & Boolean(formik.errors.colour)}
                                    helperText={formik.touched.colour && formik.errors.colour}
                                />
                            </Grid>
                            <Grid item>
                                <Box sx={{
                                    display: "flex",
                                    margin: (theme) => theme.spacing(1),
                                    marginTop: (theme) => theme.spacing(1)
                                }}>
                                    <Button 
                                        component={Link}
                                        to="/categories"
                                        size="medium"
                                        variant="outlined"
                                        sx={{ mr: 2 }}
                                    >
                                        Back
                                    </Button>
                                    <Button 
                                        type="submit"
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                )
            }}
        </Formik>
    </Paper>
  )
}
