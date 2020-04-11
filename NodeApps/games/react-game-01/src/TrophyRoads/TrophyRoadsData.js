import React from "react";
import Box from "../img/box";
import CoinWithCount from "../img/coinWithCount"

export const trophyRoadsData = [
    {
        count: 10,
        reward: <Box boxType={0} />,
    },
    {
        count: 30,
        reward: <Box boxType={1} />,
    },
    {
        count: 50,
        reward: <Box boxType={2} />,
    },
    {
        count: 100,
        reward: <Box boxType={3} />,
    },
    {
        count: 10,
        reward: <CoinWithCount coinCount={3654556} />,
    },
];