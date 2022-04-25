import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack';
import axios from 'axios';

import formatHttpApiError from 'src/helpers/formatHttpApiError';
import getCommonOptions from 'src/helpers/axios/getCommonOptions';
import StatChart from './StatChart';
import Filters from './Filters';

const generateChartData = (data = []) => {
    let chartData = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }
        ]
    }
    data.forEach(d => {
        chartData.labels.push(d.name);
        chartData.datasets[0].data.push(d.count);
        chartData.datasets[0].backgroundColor.push(`#${d.color}`);
        chartData.datasets[0].borderColor.push(`#${d.color}`);
    })
    return chartData;
}

const generateTableData = (data = []) => {
    const dataForTable = data.map((d) => {
        return {
            label: d.name,
            color: `#${d.color}`,
            count: d.count
        }
    })
    return dataForTable;
}

 const baseApiURL = "/api/dashboard/tasks-category-distribution/"

export default function TaskByCategory() {
    const { enqueueSnackbar } = useSnackbar();
    const [queries, setQueries] = useState({
        completed: "False",
    });
    const [apiURL, setApiURL] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (queries.completed === "True" || queries.completed === "False") {
            setApiURL(`${baseApiURL}?completed=${queries.completed}`)
            return;
        }
        setApiURL(baseApiURL);
    }, [queries]);

    useEffect(() => {
        if (!apiURL) {
            return;
        }
        setIsLoading(true);
        axios.get(apiURL, getCommonOptions())
            .then((res) => {
                const { data } = res;
                if (data) {
                    setTableData(generateTableData(data));
                    setChartData(generateChartData(data));
                }
                setIsLoading(false);
            }).catch((err) => {
                const formattedError = formatHttpApiError(err);
                enqueueSnackbar(formattedError);
                setIsLoading(false);
            })
    }, [enqueueSnackbar, setIsLoading, setTableData, setChartData, apiURL])

    return (
        <StatChart
            tableData={tableData}
            chartData={chartData}
            isLoading={isLoading}
            filters={<Filters setQueries={setQueries} />}
        />
    )
}
