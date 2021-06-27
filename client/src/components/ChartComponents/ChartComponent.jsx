import React, { useEffect, useState } from 'react';
import {
	VictoryAxis,
	VictoryBoxPlot,
	VictoryTheme,
	VictoryZoomContainer,
} from 'victory';
import { VictoryChart } from 'victory';
import './chart.css';

export const ChartComponent = ({
	xvalues,
	index,
	dataPoints,
	width,
	setStationDetails,
	allStationInfo,
	getKeyValue,
}) => {
	return (
		<>
			<VictoryChart
				padding={{
					bottom: 100,
					left: 60,
					right: 50,
				}}
				domainPadding={20}
				theme={VictoryTheme.material}
				width={width}
				domain={{ x: [0, 18], y: [5, 10] }}
				containerComponent={
					<VictoryZoomContainer
						zoomDomain={{ x: [0, 18], y: [5, 10] }}
					/>
				}
			>
				<VictoryAxis
					label="Station Names (Pinch in to zoom and move)"
					style={{
						tickLabels: {
							fontSize: 12,
							padding: 1,
							angle: 25,
							verticalAnchor: 'middle',
							textAnchor: 'start',
							width: 0,
							height: 0,
							fill: 'rgba(255, 211, 156, 1)',
						},
						axis: { stroke: 'rgba(255, 99, 99, 0.6)' },
						grid: { stroke: 'rgba(255, 99, 99, 0.3)' },
						ticks: { stroke: 'rgba(255, 211, 156, 0.8)' },
						axisLabel: {
							fill: 'rgba(255, 99, 99, 1)',
							padding: 150,
							fontSize: 15,
							fontStyle: 'italic',
						},
					}}
					tickValues={xvalues.slice(index.start, index.end)}
					theme={VictoryTheme.material}
				/>
				<VictoryAxis
					dependentAxis
					label="CGPA"
					style={{
						tickLabels: {
							fontSize: 12,
							padding: 5,
							fill: 'rgba(255, 211, 156, 1)',
						},
						axis: { stroke: 'rgba(255, 99, 99, 0.6)' },
						grid: { stroke: 'rgba(255, 99, 99, 0.3)' },
						ticks: { stroke: 'rgba(255, 211, 156, 0.8)' },
						axisLabel: {
							fill: 'rgba(255, 99, 99, 1)',
							padding: 38,
							fontSize: 15,
							fontStyle: 'italic',
						},
					}}
					theme={VictoryTheme.material}
				/>
				<VictoryBoxPlot
					animate={{
						duration: 2000,
						onLoad: { duration: 1000 },
					}}
					boxWidth={10}
					whiskerWidth={6}
					data={dataPoints.slice(index.start, index.end)}
					style={{
						min: { stroke: '#ff6363', strokeWidth: 2.5 },
						max: { stroke: '#ff6363', strokeWidth: 2.5 },
						q1: { fill: '#ff6363' },
						q3: { fill: '#ff6363' },
						median: { stroke: '#ff6363' },
						minLabels: { fill: 'tomato' },
						maxLabels: { fill: 'orange' },
					}}
					events={[
						{
							target: 'max',
							eventHandlers: {
								onMouseEnter: () => {
									return [
										{
											target: 'q1',
											mutation: (props) => {
												setStationDetails({
													name: props.datum.x,
													min: getKeyValue(
														allStationInfo
													)(props.datum.x).min,
													max: getKeyValue(
														allStationInfo
													)(props.datum.x).max,
													median: getKeyValue(
														allStationInfo
													)(props.datum.x).avg,
													count: getKeyValue(
														allStationInfo
													)(props.datum.x).count,
												});

												return {
													style: Object.assign(
														props.style,
														{
															fill: '#bbe1fa',
														}
													),
												};
											},
										},
										{
											target: 'q3',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#bbe1fa',
														}
													),
												};
											},
										},
										{
											target: 'min',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
										{
											target: 'max',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
										{
											target: 'median',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
									];
								},
								onMouseLeave: () => {
									return [
										{
											target: 'q1',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#ff6363',
														}
													),
												};
											},
										},
										{
											target: 'q3',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#ff6363',
														}
													),
												};
											},
										},
										{
											target: 'min',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
										{
											target: 'max',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
										{
											target: 'median',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
									];
								},
							},
						},
						{
							target: 'min',
							eventHandlers: {
								onMouseEnter: () => {
									return [
										{
											target: 'q1',
											mutation: (props) => {
												setStationDetails({
													name: props.datum.x,
													min: getKeyValue(
														allStationInfo
													)(props.datum.x).min,
													max: getKeyValue(
														allStationInfo
													)(props.datum.x).max,
													median: getKeyValue(
														allStationInfo
													)(props.datum.x).avg,
													count: getKeyValue(
														allStationInfo
													)(props.datum.x).count,
												});

												return {
													style: Object.assign(
														props.style,
														{
															fill: '#bbe1fa',
														}
													),
												};
											},
										},
										{
											target: 'q3',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#bbe1fa',
														}
													),
												};
											},
										},
										{
											target: 'min',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
										{
											target: 'max',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
										{
											target: 'median',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
									];
								},
								onMouseLeave: () => {
									return [
										{
											target: 'q1',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#ff6363',
														}
													),
												};
											},
										},
										{
											target: 'q3',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#ff6363',
														}
													),
												};
											},
										},
										{
											target: 'min',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
										{
											target: 'max',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
										{
											target: 'median',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
									];
								},
							},
						},
						{
							target: 'q1',
							eventHandlers: {
								onMouseEnter: () => {
									return [
										{
											target: 'q1',
											mutation: (props) => {
												setStationDetails({
													name: props.datum.x,
													min: getKeyValue(
														allStationInfo
													)(props.datum.x).min,
													max: getKeyValue(
														allStationInfo
													)(props.datum.x).max,
													median: getKeyValue(
														allStationInfo
													)(props.datum.x).avg,
													count: getKeyValue(
														allStationInfo
													)(props.datum.x).count,
												});

												return {
													style: Object.assign(
														props.style,
														{
															fill: '#bbe1fa',
														}
													),
												};
											},
										},
										{
											target: 'q3',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#bbe1fa',
														}
													),
												};
											},
										},
										{
											target: 'min',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
										{
											target: 'max',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
										{
											target: 'median',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
									];
								},
								onMouseLeave: () => {
									return [
										{
											target: 'q1',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#ff6363',
														}
													),
												};
											},
										},
										{
											target: 'q3',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#ff6363',
														}
													),
												};
											},
										},
										{
											target: 'min',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
										{
											target: 'max',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
										{
											target: 'median',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
									];
								},
							},
						},
						{
							target: 'q3',
							eventHandlers: {
								onMouseEnter: () => {
									return [
										{
											target: 'q1',
											mutation: (props) => {
												setStationDetails({
													name: props.datum.x,
													min: getKeyValue(
														allStationInfo
													)(props.datum.x).min,
													max: getKeyValue(
														allStationInfo
													)(props.datum.x).max,
													median: getKeyValue(
														allStationInfo
													)(props.datum.x).avg,
													count: getKeyValue(
														allStationInfo
													)(props.datum.x).count,
												});

												return {
													style: Object.assign(
														props.style,
														{
															fill: '#bbe1fa',
														}
													),
												};
											},
										},
										{
											target: 'q3',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#bbe1fa',
														}
													),
												};
											},
										},
										{
											target: 'min',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
										{
											target: 'max',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
										{
											target: 'median',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
									];
								},
								onMouseLeave: () => {
									return [
										{
											target: 'q1',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#ff6363',
														}
													),
												};
											},
										},
										{
											target: 'q3',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#ff6363',
														}
													),
												};
											},
										},
										{
											target: 'min',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
										{
											target: 'max',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
										{
											target: 'median',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
									];
								},
							},
						},
						{
							target: 'median',
							eventHandlers: {
								onMouseEnter: () => {
									return [
										{
											target: 'q1',
											mutation: (props) => {
												setStationDetails({
													name: props.datum.x,
													min: getKeyValue(
														allStationInfo
													)(props.datum.x).min,
													max: getKeyValue(
														allStationInfo
													)(props.datum.x).max,
													median: getKeyValue(
														allStationInfo
													)(props.datum.x).avg,
													count: getKeyValue(
														allStationInfo
													)(props.datum.x).count,
												});

												return {
													style: Object.assign(
														props.style,
														{
															fill: '#bbe1fa',
														}
													),
												};
											},
										},
										{
											target: 'q3',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#bbe1fa',
														}
													),
												};
											},
										},
										{
											target: 'min',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
										{
											target: 'max',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
										{
											target: 'median',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#bbe1fa',
													},
												};
											},
										},
									];
								},
								onMouseLeave: () => {
									return [
										{
											target: 'q1',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#ff6363',
														}
													),
												};
											},
										},
										{
											target: 'q3',
											mutation: (props) => {
												return {
													style: Object.assign(
														props.style,
														{
															fill: '#ff6363',
														}
													),
												};
											},
										},
										{
											target: 'min',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
										{
											target: 'max',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
										{
											target: 'median',
											mutation: (props) => {
												return {
													style: {
														...props.style,
														stroke: '#ff6363',
													},
												};
											},
										},
									];
								},
							},
						},
					]}
				/>
			</VictoryChart>
		</>
	);
};
