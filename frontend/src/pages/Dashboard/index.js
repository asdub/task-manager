import React from 'react'

import TaskCompletion from './TaskCompletion';
import TaskByCategory from './TaskByCategory';

export default function Dashboard() {
    return (
        <div>
            <TaskCompletion />
            <TaskByCategory />
        </div>
    )
}
