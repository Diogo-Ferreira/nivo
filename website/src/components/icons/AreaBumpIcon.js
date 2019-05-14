/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { AreaBump } from '@nivo/bump'
import bumpLightNeutralImg from '../../assets/icons/bump-light-neutral.png'
import bumpLightColoredImg from '../../assets/icons/bump-light-colored.png'
import bumpDarkNeutralImg from '../../assets/icons/bump-dark-neutral.png'
import bumpDarkColoredImg from '../../assets/icons/bump-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    data: [
        {
            id: 'A',
            data: [
                {
                    x: -1,
                    y: 2,
                },
                {
                    x: 0,
                    y: 2,
                },
                {
                    x: 1,
                    y: 3,
                },
                {
                    x: 2,
                    y: 3,
                },
                {
                    x: 3,
                    y: 3,
                },
            ],
        },
        {
            id: 'B',
            data: [
                {
                    x: -1,
                    y: 1,
                },
                {
                    x: 0,
                    y: 1,
                },
                {
                    x: 1,
                    y: 1,
                },
                {
                    x: 2,
                    y: 2,
                },
                {
                    x: 3,
                    y: 2,
                },
            ],
        },
        {
            id: 'C',
            data: [
                {
                    x: -1,
                    y: 2,
                },
                {
                    x: 0,
                    y: 2,
                },
                {
                    x: 1,
                    y: 2,
                },
                {
                    x: 2,
                    y: 1,
                },
                {
                    x: 3,
                    y: 1,
                },
            ],
        },
    ],
    margin: {
        top: 8,
        right: 5,
        bottom: 8,
        left: 5,
    },
    align: 'end',
    spacing: 4,
    borderWidth: 0,
    endLabel: false,
    axisTop: null,
    axisBottom: null,
    enableGridX: false,
    isInteractive: true,
}

const AreaBumpIconItem = ({ type }) => (
    <Icon id={`area-bump-${type}`} type={type}>
        <AreaBump
            {...chartProps}
            colors={colors[type].colors}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors[type].colors[3],
                            strokeWidth: 3,
                            strokeLinecap: 'square',
                        },
                    },
                },
                grid: {
                    line: {
                        strokeWidth: 2,
                        strokeOpacity: 0.5,
                        stroke: colors[type].colors[1],
                    },
                },
            }}
        />
    </Icon>
)

const AreaBumpIcon = () => (
    <>
        <AreaBumpIconItem type="lightNeutral" />
        <IconImg url={bumpLightNeutralImg} />
        <AreaBumpIconItem type="lightColored" />
        <IconImg url={bumpLightColoredImg} />
        <AreaBumpIconItem type="darkNeutral" />
        <IconImg url={bumpDarkNeutralImg} />
        <AreaBumpIconItem type="darkColored" />
        <IconImg url={bumpDarkColoredImg} />
    </>
)

export default AreaBumpIcon
