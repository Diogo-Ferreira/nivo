/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useMemo, useState, Fragment } from 'react'
import { withContainer, useDimensions, SvgWrapper } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { Grid, Axes } from '@nivo/axes'
import { useScales, useLineGenerator, useLineWidth, useSerieOpacity, usePointSize } from './hooks'
import { BumpPropTypes, BumpDefaultProps } from './props'
import Line from './Line'
import LineLabels from './LineLabels'
import Points from './Points'

const Bump = props => {
    const {
        data,

        xOuterPadding,
        yOuterPadding,

        width,
        height,
        margin: partialMargin,

        layers,

        lineInterpolation,
        lineCurvaturePadding,
        lineWidth,
        lineOpacity,
        activeLineWidth,
        activeLineOpacity,
        inactiveLineWidth,
        inactiveLineOpacity,

        startLabel,
        startLabelPadding,
        startLabelTextColor,
        endLabel,
        endLabelPadding,
        endLabelTextColor,

        pointSize,
        activePointSize,
        inactivePointSize,
        pointColor,

        axisTop,
        axisRight,
        axisBottom,
        axisLeft,
        enableGridX,
        enableGridY,

        colors,
    } = props

    const [currentSerie, setCurrentSerie] = useState(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { xScale, yScale } = useScales({
        width: innerWidth,
        height: innerHeight,
        data,
        xOuterPadding,
        yOuterPadding,
    })
    const linePadding = xScale.step() * lineCurvaturePadding

    const getColor = useOrdinalColorScale(colors, 'id')

    const { series, points } = useMemo(() => {
        const allPoints = []
        const series = data.map(rawSerie => {
            const serie = {
                ...rawSerie,
                color: getColor(rawSerie),
                points: [],
                linePoints: [],
            }
            rawSerie.data.forEach((datum, i) => {
                const point = {
                    ...datum,
                    id: `${datum.x}.${datum.y}`,
                    x: xScale(datum.x),
                    y: yScale(datum.y),
                    serie,
                }
                allPoints.push(point)
                serie.points.push(point)
                if (i === 0) {
                    serie.linePoints.push([0, point.y])
                    serie.linePoints.push([point.x, point.y])
                    serie.linePoints.push([point.x + linePadding, point.y])
                } else if (i === rawSerie.data.length - 1) {
                    serie.linePoints.push([point.x - linePadding, point.y])
                    serie.linePoints.push([point.x, point.y])
                    serie.linePoints.push([innerWidth, point.y])
                } else {
                    serie.linePoints.push([point.x - linePadding, point.y])
                    serie.linePoints.push([point.x, point.y])
                    serie.linePoints.push([point.x + linePadding, point.y])
                }
            })

            return serie
        })

        return { series, points: allPoints }
    }, [data, xScale, yScale, linePadding, getColor])

    const lineGenerator = useLineGenerator()
    const getLineWidth = useLineWidth({
        lineWidth,
        activeLineWidth,
        inactiveLineWidth,
        current: currentSerie,
    })
    const getSerieOpacity = useSerieOpacity({
        opacity: lineOpacity,
        activeOpacity: activeLineOpacity,
        inactiveOpacity: inactiveLineOpacity,
        current: currentSerie,
    })
    const getPointSize = usePointSize({
        size: pointSize,
        activeSize: activePointSize,
        inactiveSize: inactivePointSize,
        current: currentSerie,
    })

    const layerById = {
        grid: (
            <Grid
                key="grid"
                width={innerWidth}
                height={innerHeight}
                xScale={enableGridX ? xScale : null}
                yScale={enableGridY ? yScale : null}
            />
        ),
        axes: (
            <Axes
                key="axes"
                xScale={xScale}
                yScale={yScale}
                width={innerWidth}
                height={innerHeight}
                top={axisTop}
                right={axisRight}
                bottom={axisBottom}
                left={axisLeft}
            />
        ),
        labels: [],
        lines: (
            <Fragment key="lines">
                {series.map(serie => (
                    <Line
                        key={serie.id}
                        serie={serie}
                        currentSerie={currentSerie}
                        setCurrentSerie={setCurrentSerie}
                        lineGenerator={lineGenerator}
                        getOpacity={getSerieOpacity}
                        getLineWidth={getLineWidth}
                        yScale={yScale}
                        margin={margin}
                    />
                ))}
            </Fragment>
        ),
        points: null,
    }

    if (startLabel !== false) {
        layerById.labels.push(
            <LineLabels
                key="start"
                series={series}
                yScale={yScale}
                position="start"
                padding={startLabelPadding}
                margin={margin}
                color={startLabelTextColor}
                currentSerie={currentSerie}
                setCurrentSerie={setCurrentSerie}
                getOpacity={getSerieOpacity}
            />
        )
    }
    if (endLabel !== false) {
        layerById.labels.push(
            <LineLabels
                key="end"
                series={series}
                yScale={yScale}
                position="end"
                padding={endLabelPadding}
                margin={margin}
                color={endLabelTextColor}
                currentSerie={currentSerie}
                setCurrentSerie={setCurrentSerie}
                getOpacity={getSerieOpacity}
            />
        )
    }

    layerById.points = (
        <Points key="points" points={points} getSize={getPointSize} color={pointColor} />
    )

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
            {layers.map((layer, i) => {
                if (typeof layer === 'function') {
                    return (
                        <Fragment key={i}>
                            {layer({
                                innerWidth,
                                innerHeight,
                                xScale,
                                yScale,
                            })}
                        </Fragment>
                    )
                }

                return layerById[layer]
            })}
        </SvgWrapper>
    )
}

Bump.propTypes = BumpPropTypes
Bump.defaultProps = BumpDefaultProps

export default memo(withContainer(Bump))
