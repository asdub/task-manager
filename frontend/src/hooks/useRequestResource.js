import { useCallback, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

/* Get data from API */

export default function useRequestResource({
    endpoint, resourceLabel }) {
        const [resourceList, setResourceList] = 
        useState({
            results: []
        });
        const [resource, setResource] = useState(null);
        const { enqueueSnackbar } = useSnackbar();

        const getResourceList = useCallback(() =>
        {
            axios.get(`/api/${endpoint}/`)
                .then((res) => {
                    setResourceList({
                        results:res.data
                    })
                }).catch((err) => {
                    console.error(err);
                })
        }, [endpoint])

        const addResource = useCallback(
            (values, successCallback) => {
                axios.post(`/api/${endpoint}/`, values)
                    .then(() => {
                        enqueueSnackbar(`${resourceLabel} added.`)
                        if (successCallback) {
                            successCallback();
                        }
                    }).catch((err) => {
                        console.error(err);
                    })
            }, [endpoint, enqueueSnackbar, resourceLabel])

        const getResource = useCallback((id) => {
            axios.get(`/api/${endpoint}/${id}/`)
                .then((res) => {
                    const { data } = res;
                    setResource(data);
                }).catch((err) => {
                    console.error(err);
                })
        }, [endpoint])

        const updateResource = useCallback((id, values, successCallback) => {
            axios.patch(`/api/${endpoint}/${id}/`, values)
                .then(() => {
                    enqueueSnackbar(`${resourceLabel} updated.`)
                    if (successCallback) {
                        successCallback();
                    }
                }).catch((err) => {
                    console.error(err);
                })
        }, [endpoint, enqueueSnackbar, resourceLabel])

        const deleteResource = useCallback((id) => {
            axios.delete(`/api/${endpoint}/${id}/`)
                .then(() => {
                    enqueueSnackbar(`${resourceLabel} deleted.`)
                    const newResourceList = {
                        results: resourceList.results.filter((r) => {
                            return r.id !== id
                        })
                    }
                    setResourceList(newResourceList);
                }).catch((err) => {
                    console.error(err);
                })
        }, [endpoint, resourceList, enqueueSnackbar, resourceLabel])

        return {
            resourceList,
            getResourceList,
            addResource,
            resource,
            getResource,
            updateResource,
            deleteResource
        }
    }