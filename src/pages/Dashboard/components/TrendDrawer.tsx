import { useState } from "react";
import { useRef } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DownloadIcon from "@mui/icons-material/Download";

import IconButton from "@mui/material/IconButton";

import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";

import { toPng } from "html-to-image";

type CustomTooltipProps = {
    active?: boolean;
    payload?: any[];
    label?: string;
};

function CustomTooltip({
    active,
    payload,
    label,
}: CustomTooltipProps) {
    if (!active || !payload || !payload.length) {
        return null;
    }

    return (
        <Box
            sx={{
                backgroundColor: "white",
                border: "1px solid #D1D5DB",
                borderRadius: 2,
                p: 1.5,
                boxShadow: 3,
            }}
        >
            <Typography
                variant="subtitle2"
                sx={{
                    fontWeight: 700,
                    mb: 1,
                }}
            >
                Time : {label} sec
            </Typography>

            {payload.map((entry) => (
                <Typography
                    key={entry.dataKey}
                    variant="body2"
                    sx={{
                        color: entry.color,
                    }}
                >
                    {entry.name}: {Number(entry.value).toFixed(2)}
                </Typography>
            ))}
        </Box>
    );
}

import Drawer from "@mui/material/Drawer";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Chip,
} from "@mui/material";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
} from "recharts";

import { trendConfig } from "../constants/trendConfig";



import type { TrendType } from "../types/trend.types";

type TrendDrawerProps = {
    open: boolean;
    onClose: () => void;
    activeTrend: TrendType;

    electricalHistory: any[];
    currentHistory: any[];
    exciterHistory: any[];
    temperatureHistory: any[];
};

export default function TrendDrawer({
    open,
    onClose,
    activeTrend,

    electricalHistory,
    currentHistory,
    exciterHistory,
    temperatureHistory,

}: TrendDrawerProps) {

    const [timeRange, setTimeRange] =
        useState("60s");

    const rawData =
        activeTrend === "electrical"
            ? electricalHistory
            : activeTrend === "current"
                ? currentHistory
                : activeTrend === "exciter"
                    ? exciterHistory
                    : temperatureHistory;

    const chartData =
        timeRange === "60s"
            ? rawData.slice(-60)
            : timeRange === "5m"
                ? rawData.slice(-300)
                : timeRange === "15m"
                    ? rawData.slice(-900)
                    : timeRange === "1h"
                        ? rawData.slice(-3600)
                        : rawData;

    // Temporary Graph Control With Custom Tooltip
    const chartRef =
        useRef<HTMLDivElement>(null);


    const exportChart = async () => {

        if (!chartRef.current) {
            return;
        }

        const dataUrl = await toPng(
    chartRef.current,
    {
        backgroundColor: "#FFFFFF",
        pixelRatio: 10,
    }
);

        const link =
            document.createElement("a");

        link.download =
            `${activeTrend}_trend.png`;

        link.href =
            dataUrl;

        link.click();
    };


    const getMin = (arr: number[]) =>
        arr.length ? Math.min(...arr) : 0;

    const getMax = (arr: number[]) =>
        arr.length ? Math.max(...arr) : 0;



    const getRMS = (arr: number[]) =>
        arr.length
            ? Math.sqrt(
                arr.reduce(
                    (sum, value) => sum + value * value,
                    0
                ) / arr.length
            )
            : 0;

    const values =
        activeTrend === "electrical"
            ? chartData.map((d) => d.phaseA)
            : activeTrend === "current"
                ? chartData.map((d) => d.generator)
                : activeTrend === "exciter"
                    ? chartData.map((d) => d.duty)
                    : chartData.map((d) => d.temp1);

    const currentValue =
        values.length > 0
            ? values[values.length - 1]
            : 0;

    const minimumValue =
        getMin(values);

    const maximumValue =
        getMax(values);

    const averageValue =
        getRMS(values);

    const peakToPeak =
        maximumValue - minimumValue;


    const latestPoint =
        chartData.length > 0
            ? chartData[chartData.length - 1]
            : null;



    const getPeakToPeak = (
        arr: number[]
    ) =>
        getMax(arr) -
        getMin(arr);

    const getTHD = (arr: number[]) => {
        const avg = getRMS(arr);

        if (!avg) return 0;

        const ripple =
            getPeakToPeak(arr) / avg;

        return ripple * 100;
    };


    const phaseAValues =
        electricalHistory.map(
            (x) => x.phaseA
        );

    const phaseBValues =
        electricalHistory.map(
            (x) => x.phaseB
        );

    const phaseCValues =
        electricalHistory.map(
            (x) => x.phaseC
        );

    const generatorValues =
        currentHistory.map(
            (x) => x.generator
        );

    const exciterCurrentValues =
        currentHistory.map(
            (x) => x.exciter
        );

    const powerValues =
        currentHistory.map(
            (x) => x.power
        );


    const dutyValues =
        exciterHistory.map(
            (x) => x.duty
        );

    const fieldCurrentValues =
        exciterHistory.map(
            (x) => x.fieldCurrent
        );
    const temp1Values =
        temperatureHistory.map(
            (x) => x.temp1
        );

    const temp2Values =
        temperatureHistory.map(
            (x) => x.temp2
        );

    console.log(
        "TEMP HISTORY",
        temperatureHistory.slice(-3)
    );


    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    width: 900,
                    p: 3,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                    }}
                >
                    {trendConfig[activeTrend].title}
                </Typography>

                <Paper
                    elevation={1}
                    sx={{
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        backgroundColor: "#F8FAFC",
                    }}
                >
                    <Grid container spacing={2}>

                        <Grid size={{ xs: 6 }}>
                            <Typography variant="caption">
                                Current
                            </Typography>

                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: "#0F4C81",
                                }}
                            >
                                {currentValue.toFixed(2)}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography variant="caption">
                                Peak-To-Peak
                            </Typography>

                            <Typography sx={{ fontWeight: 700 }}>
                                {peakToPeak.toFixed(2)}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography variant="caption">
                                Minimum
                            </Typography>

                            <Typography>
                                {minimumValue.toFixed(2)}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography variant="caption">
                                {activeTrend === "electrical"
                                    ? "RMS"
                                    : "Maximum"}
                            </Typography>

                            <Typography>
                                {averageValue.toFixed(2)}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography variant="caption">
                                Peak
                            </Typography>

                            <Typography>
                                {maximumValue.toFixed(2)}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                            <Typography variant="caption">
                                Status
                            </Typography>

                            <Chip
                                size="small"
                                color={
                                    latestPoint
                                        ? "success"
                                        : "warning"
                                }
                                label={
                                    latestPoint
                                        ? "LIVE"
                                        : "NO DATA"
                                }
                            />
                        </Grid>

                    </Grid>
                </Paper>

                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            mb: 1,
                            fontWeight: 600,
                        }}
                    >
                        Time Window
                    </Typography>

                    <ToggleButtonGroup
                        size="small"
                        value={timeRange}
                        exclusive
                        onChange={(_, value) => {
                            if (value) setTimeRange(value);
                        }}
                    >
                        <ToggleButton value="60s">
                            60 Sec
                        </ToggleButton>

                        <ToggleButton value="5m">
                            5 Min
                        </ToggleButton>

                        <ToggleButton value="15m">
                            15 Min
                        </ToggleButton>

                        <ToggleButton value="1h">
                            1 Hour
                        </ToggleButton>

                        <ToggleButton value="24h">
                            24 Hour
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Paper
                    elevation={1}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        {trendConfig[activeTrend].chartTitle}
                    </Typography>

                    {/* Chart tooltip */}
                    <TransformWrapper
                        wheel={{ step: 0.2 }}
                    >
                        {({
                            zoomIn,
                            zoomOut,
                            resetTransform,
                        }) => (
                            <>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: 1,
                                        mb: 1,
                                    }}
                                >
                                    <IconButton onClick={() => zoomIn()}>
                                        <ZoomInIcon />
                                    </IconButton>

                                    <IconButton onClick={() => zoomOut()}>
                                        <ZoomOutIcon />
                                    </IconButton>

                                    <IconButton onClick={() => resetTransform()}>
                                        <RestartAltIcon />
                                    </IconButton>

                                    <IconButton onClick={exportChart}>
                                        <DownloadIcon />
                                    </IconButton>
                                </Box>

                                <Box
                                    ref={chartRef}
                                    sx={{
                                        width: "100%",
                                        height: 450,
                                        overflow: "hidden",
                                    }}
                                >


                                    <TransformComponent>

                                        <Box
                                            sx={{
                                                width: 1200,
                                                height: 450,
                                            }}
                                        >
                                            <ResponsiveContainer
                                                width="100%"
                                                height="100%"
                                            >
                                                <LineChart data={chartData as any}>
                                                    <CartesianGrid strokeDasharray="3 3" />

                                                    <XAxis dataKey="time" />

                                                    <Tooltip content={<CustomTooltip />} />

                                                    <Legend />

                                                    {/* ELECTRICAL */}

                                                    {activeTrend === "electrical" && (
                                                        <>
                                                            <YAxis
                                                                yAxisId="voltage"
                                                                domain={[227, 234]}
                                                                label={{
                                                                    value: "Voltage (V)",
                                                                    angle: -90,
                                                                    position: "insideLeft",
                                                                }}
                                                            />

                                                            <ReferenceLine
                                                                y={233}
                                                                stroke="#DC2626"
                                                                strokeDasharray="5 5"
                                                            />

                                                            <ReferenceLine
                                                                y={231.7}
                                                                stroke="#16A34A"
                                                                strokeWidth={2}
                                                            />

                                                            <ReferenceLine
                                                                y={230}
                                                                stroke="#2563EB"
                                                                strokeDasharray="3 3"
                                                            />

                                                            <ReferenceLine
                                                                y={227}
                                                                stroke="#DC2626"
                                                                strokeDasharray="5 5"
                                                            />

                                                            <Line
                                                                yAxisId="voltage"
                                                                type="monotone"
                                                                dataKey="phaseA"
                                                                name="Phase A Voltage"
                                                                stroke="#2563EB"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                yAxisId="voltage"
                                                                type="monotone"
                                                                dataKey="phaseB"
                                                                name="Phase B Voltage"
                                                                stroke="#059669"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                yAxisId="voltage"
                                                                type="monotone"
                                                                dataKey="phaseC"
                                                                name="Phase C Voltage"
                                                                stroke="#D97706"
                                                                dot={false}
                                                            />
                                                        </>
                                                    )}

                                                    {/* CURRENT */}

                                                    {activeTrend === "current" && (
                                                        <>
                                                            <YAxis
                                                                yAxisId="current"
                                                                orientation="left"
                                                                domain={["dataMin - 20", "dataMax + 20"]}
                                                                label={{
                                                                    value: "Current (A)",
                                                                    angle: -90,
                                                                    position: "insideLeft",
                                                                }}
                                                            />

                                                            <YAxis
                                                                yAxisId="power"
                                                                orientation="right"
                                                                domain={["dataMin - 1000", "dataMax + 1000"]}
                                                                label={{
                                                                    value: "Power (W)",
                                                                    angle: 90,
                                                                    position: "insideRight",
                                                                }}
                                                            />

                                                            <Line
                                                                yAxisId="current"
                                                                type="monotone"
                                                                dataKey="generator"
                                                                name="Generator Current"
                                                                stroke="#2563EB"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                yAxisId="current"
                                                                type="monotone"
                                                                dataKey="exciter"
                                                                name="Exciter Current"
                                                                stroke="#059669"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                yAxisId="power"
                                                                type="monotone"
                                                                dataKey="power"
                                                                name="Output Power"
                                                                stroke="#D97706"
                                                                dot={false}
                                                            />
                                                        </>
                                                    )}

                                                    {/* EXCITER */}

                                                    {activeTrend === "exciter" && (
                                                        <>
                                                            <YAxis
                                                                yAxisId="duty"
                                                                orientation="left"
                                                                domain={[0, 100]}
                                                                label={{
                                                                    value: "Duty (%)",
                                                                    angle: -90,
                                                                    position: "insideLeft",
                                                                }}
                                                            />

                                                            <YAxis
                                                                yAxisId="fieldCurrent"
                                                                orientation="right"
                                                                domain={["dataMin - 1", "dataMax + 1"]}
                                                                label={{
                                                                    value: "Current (A)",
                                                                    angle: 90,
                                                                    position: "insideRight",
                                                                }}
                                                            />

                                                            <Line
                                                                yAxisId="duty"
                                                                type="monotone"
                                                                dataKey="duty"
                                                                name="Field Duty (%)"
                                                                stroke="#2563EB"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                yAxisId="fieldCurrent"
                                                                type="monotone"
                                                                dataKey="fieldCurrent"
                                                                name="Field Current (A)"
                                                                stroke="#059669"
                                                                dot={false}
                                                            />
                                                        </>
                                                    )}

                                                    {/* TEMPERATURE */}

                                                    {activeTrend === "temperature" && (
                                                        <>
                                                            <YAxis
                                                                yAxisId="temperature"
                                                                domain={["dataMin - 2", "dataMax + 2"]}
                                                                label={{
                                                                    value: "Temperature (°C)",
                                                                    angle: -90,
                                                                    position: "insideLeft",
                                                                }}
                                                            />

                                                            <Line
                                                                yAxisId="temperature"
                                                                type="monotone"
                                                                dataKey="temp1"
                                                                name="Temperature 1"
                                                                stroke="#DC2626"
                                                                dot={false}
                                                            />

                                                            <Line
                                                                yAxisId="temperature"
                                                                type="monotone"
                                                                dataKey="temp2"
                                                                name="Temperature 2"
                                                                stroke="#EA580C"
                                                                dot={false}
                                                            />
                                                        </>
                                                    )}
                                                </LineChart>

                                            </ResponsiveContainer>
                                        </Box>

                                    </TransformComponent>
                                </Box>

                            </>
                        )}
                    </TransformWrapper>
                </Paper>

                {/* table */}
                <Paper
                    elevation={1}
                    sx={{
                        p: 2,
                        mt: 2,
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        {trendConfig[activeTrend].statTitle}
                    </Typography>

                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                {activeTrend === "electrical" && (
                                    <TableRow>
                                        <TableCell>Metric</TableCell>
                                        <TableCell>Phase A</TableCell>
                                        <TableCell>Phase B</TableCell>
                                        <TableCell>Phase C</TableCell>
                                    </TableRow>
                                )}

                                {activeTrend === "current" && (
                                    <TableRow>
                                        <TableCell>Metric</TableCell>
                                        <TableCell>Generator Current</TableCell>
                                        <TableCell>Exciter Current</TableCell>
                                        <TableCell>Output Power</TableCell>
                                    </TableRow>
                                )}

                                {activeTrend === "exciter" && (
                                    <TableRow>
                                        <TableCell>Metric</TableCell>
                                        <TableCell>Field Duty</TableCell>
                                        <TableCell>Field Current</TableCell>
                                        <TableCell>-</TableCell>
                                    </TableRow>
                                )}

                                {activeTrend === "temperature" && (
                                    <TableRow>
                                        <TableCell>Metric</TableCell>
                                        <TableCell>Temperature 1</TableCell>
                                        <TableCell>Temperature 2</TableCell>
                                        <TableCell>-</TableCell>
                                    </TableRow>
                                )}
                            </TableHead>

                            <TableBody>

                                {/* ELECTRICAL */}

                                {activeTrend === "electrical" && (
                                    <>
                                        <TableRow>
                                            <TableCell>RMS</TableCell>

                                            <TableCell>
                                                {getRMS(phaseAValues).toFixed(2)} V
                                            </TableCell>

                                            <TableCell>
                                                {getRMS(phaseBValues).toFixed(2)} V
                                            </TableCell>

                                            <TableCell>
                                                {getRMS(phaseCValues).toFixed(2)} V
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Peak</TableCell>

                                            <TableCell>
                                                {getMax(phaseAValues).toFixed(2)} V
                                            </TableCell>

                                            <TableCell>
                                                {getMax(phaseBValues).toFixed(2)} V
                                            </TableCell>

                                            <TableCell>
                                                {getMax(phaseCValues).toFixed(2)} V
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Peak-To-Peak</TableCell>

                                            <TableCell>
                                                {getPeakToPeak(phaseAValues).toFixed(2)} V
                                            </TableCell>

                                            <TableCell>
                                                {getPeakToPeak(phaseBValues).toFixed(2)} V
                                            </TableCell>

                                            <TableCell>
                                                {getPeakToPeak(phaseCValues).toFixed(2)} V
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>THD</TableCell>

                                            <TableCell>
                                                {getTHD(phaseAValues).toFixed(2)} %
                                            </TableCell>

                                            <TableCell>
                                                {getTHD(phaseBValues).toFixed(2)} %
                                            </TableCell>

                                            <TableCell>
                                                {getTHD(phaseCValues).toFixed(2)} %
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Minimum</TableCell>

                                            <TableCell>
                                                {getMin(phaseAValues).toFixed(2)} V
                                            </TableCell>

                                            <TableCell>
                                                {getMin(phaseBValues).toFixed(2)} V
                                            </TableCell>

                                            <TableCell>
                                                {getMin(phaseCValues).toFixed(2)} V
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}

                                {/* CURRENT */}

                                {activeTrend === "current" && (
                                    <>
                                        <TableRow>
                                            <TableCell>RMS</TableCell>

                                            <TableCell>
                                                {getRMS(generatorValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>
                                                {getRMS(exciterCurrentValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>
                                                {getRMS(powerValues).toFixed(2)} W
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Minimum</TableCell>

                                            <TableCell>
                                                {getMin(generatorValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>
                                                {getMin(exciterCurrentValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>
                                                {getMin(powerValues).toFixed(2)} W
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Peak</TableCell>

                                            <TableCell>
                                                {getMax(generatorValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>
                                                {getMax(exciterCurrentValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>
                                                {getMax(powerValues).toFixed(2)} W
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Peak-To-Peak</TableCell>

                                            <TableCell>
                                                {getPeakToPeak(generatorValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>
                                                {getPeakToPeak(exciterCurrentValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>
                                                {getPeakToPeak(powerValues).toFixed(2)} W
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}

                                {/* EXCITER */}

                                {activeTrend === "exciter" && (
                                    <>
                                        <TableRow>
                                            <TableCell>RMS</TableCell>

                                            <TableCell>
                                                {getRMS(dutyValues).toFixed(2)} %
                                            </TableCell>

                                            <TableCell>
                                                {getRMS(fieldCurrentValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>-</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Minimum</TableCell>

                                            <TableCell>
                                                {getMin(dutyValues).toFixed(2)} %
                                            </TableCell>

                                            <TableCell>
                                                {getMin(fieldCurrentValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>-</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Peak</TableCell>

                                            <TableCell>
                                                {getMax(dutyValues).toFixed(2)} %
                                            </TableCell>

                                            <TableCell>
                                                {getMax(fieldCurrentValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>-</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Peak-To-Peak</TableCell>

                                            <TableCell>
                                                {getPeakToPeak(dutyValues).toFixed(2)} %
                                            </TableCell>

                                            <TableCell>
                                                {getPeakToPeak(fieldCurrentValues).toFixed(2)} A
                                            </TableCell>

                                            <TableCell>-</TableCell>
                                        </TableRow>
                                    </>
                                )}

                                {/* TEMPERATURE */}

                                {activeTrend === "temperature" && (
                                    <>
                                        <TableRow>
                                            <TableCell>Minimum</TableCell>

                                            <TableCell>
                                                {getMin(temp1Values).toFixed(2)} °C
                                            </TableCell>

                                            <TableCell>
                                                {getMin(temp2Values).toFixed(2)} °C
                                            </TableCell>

                                            <TableCell>-</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Maximum</TableCell>

                                            <TableCell>
                                                {getMax(temp1Values).toFixed(2)} °C
                                            </TableCell>

                                            <TableCell>
                                                {getMax(temp2Values).toFixed(2)} °C
                                            </TableCell>

                                            <TableCell>-</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Peak</TableCell>

                                            <TableCell>
                                                {getMax(temp1Values).toFixed(2)} °C
                                            </TableCell>

                                            <TableCell>
                                                {getMax(temp2Values).toFixed(2)} °C
                                            </TableCell>

                                            <TableCell>-</TableCell>
                                        </TableRow>
                                    </>
                                )}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

            </Box>
        </Drawer>
    );
}
