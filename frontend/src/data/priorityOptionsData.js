
import { lightGreen, cyan, amber, red } from "@mui/material/colors";

const priorityOptionsData = {
    1: {
        label: "Low",
        color: lightGreen[400],
    },
    2: {
        label: "Medium",
        color: cyan[300],
    },
    3: {
        label: "High",
        color: amber[300],
    },
    4: {
        label: "Urgent",
        color: red[300],
    },
};
export const priorityOptionsDataList = Object
    .keys(priorityOptionsData)
    .map(key => ({ key, ...priorityOptionsData[key], value: key }));

export default priorityOptionsData;