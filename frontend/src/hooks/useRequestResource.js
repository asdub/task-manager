import { useCallback, useState, useContext } from "react";
import axios from "axios";
import getCommonOptions from "src/helpers/axios/getCommonOptions";
import { useSnackbar } from "notistack";

import formatHttpApiError from "src/helpers/formatHttpApiError";
import { LoadingOverlayContext } from "src/components/LoadingOverlay";

/* Get data from API */

export default function useRequestResource({
    endpoint, resourceLabel }) {
        const [resourceList, setResourceList] = 
        useState({
            results: []
        });
        const [resource, setResource] = useState(null);
        const [error, setError] = useState(null);
        const { enqueueSnackbar } = useSnackbar();
        const loadingOverlay = useContext(LoadingOverlayContext);
        const { setLoading } = loadingOverlay;

        const handleRequestResourceError = useCallback((err) => {
            const formattedError = formatHttpApiError(err);
            setError(formattedError);
            setLoading(false);
            enqueueSnackbar(formattedError);
        }, [enqueueSnackbar, setError, setLoading])

        const getResourceList = useCallback(() => {
            setLoading(true);
            axios.get(`/api/${endpoint}/`, getCommonOptions())
                .then((res) => {
                    setLoading(false);
                    if (res.data.results) {
                        setResourceList(res.data)
                    }
                    else {
                        setResourceList({
                            results:res.data
                        })
                    }
                }).catch(handleRequestResourceError)
        }, [endpoint, handleRequestResourceError, setLoading])

        const addResource = useCallback(
            (values, successCallback) => {
                setLoading(true);
                axios.post(`/api/${endpoint}/`, values, getCommonOptions())
                    .then(() => {
                        setLoading(false);
                        enqueueSnackbar(`${resourceLabel} added.`)
                        if (successCallback) {
                            successCallback();
                        }
                    }).catch(handleRequestResourceError)
            }, [endpoint, enqueueSnackbar, resourceLabel,
                handleRequestResourceError, setLoading])

        const getResource = useCallback((id) => {
            setLoading(true);
            axios.get(`/api/${endpoint}/${id}/`, getCommonOptions())
                .then((res) => {
                    setLoading(false);
                    const { data } = res;
                    setResource(data);
                }).catch(handleRequestResourceError)
        }, [endpoint, handleRequestResourceError, setLoading])

        const updateResource = useCallback((id, values, successCallback) => {
            setLoading(true);
            axios.patch(`/api/${endpoint}/${id}/`, values, getCommonOptions())
                .then(() => {
                    setLoading(false);
                    enqueueSnackbar(`${resourceLabel} updated.`)
                    if (successCallback) {
                        successCallback();
                    }
                }).catch(handleRequestResourceError)
        }, [endpoint, enqueueSnackbar, resourceLabel,
            handleRequestResourceError, setLoading])

        const deleteResource = useCallback((id) => {
            setLoading(true);
            axios.delete(`/api/${endpoint}/${id}/`, getCommonOptions())
                .then(() => {
                    setLoading(false);
                    enqueueSnackbar(`${resourceLabel} deleted.`)
                    const newResourceList = {
                        results: resourceList.results.filter((r) => {
                            return r.id !== id
                        })
                    }
                    setResourceList(newResourceList);
                }).catch(handleRequestResourceError)
        }, [endpoint, resourceList, enqueueSnackbar, resourceLabel,
            handleRequestResourceError, setLoading])

        return {
            resourceList,
            getResourceList,
            addResource,
            resource,
            getResource,
            updateResource,
            deleteResource,
            error
        }
    }