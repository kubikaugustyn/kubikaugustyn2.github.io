import React from "react";
import Box from "../img/box";
import CoinWithCount from "../img/coinWithCount"

export const trophyRoadsData = [
    {
        count: 10,
        reward: <Box boxType={0} boxCount={1} />,
    },
    {
        count: 30,
        reward: <Box boxType={1} boxCount={1} />,
    },
    {
        count: 50,
        reward: <Box boxType={2} boxCount={1} />,
    },
    {
        count: 100,
        reward: <Box boxType={3} boxCount={1} />,
    },
    {
        count: 250,
        reward: <CoinWithCount coinCount={3654556} />,
    },
];