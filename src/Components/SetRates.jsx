"use client"
import React from 'react'
import {
    Slider,
    SliderTrack,
    Tooltip,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Card,
    CardBody,
    CardHeader,
    Heading
} from '@chakra-ui/react'

const SetRates = () => {
    const [sliderValue, setSliderValue] = React.useState(5)
    const [showTooltip, setShowTooltip] = React.useState(false)
    return (
        <Card>
            <CardHeader
                bg="teal.500"
                borderBottomWidth="1px"
                borderColor="teal.600"
                color="white"
                textAlign="center"
                padding="4"
            >
                <Heading size="md" textTransform="uppercase">
                    Set Rates
                </Heading>
            </CardHeader>
            <CardBody>
                <Heading size='xs' textTransform='uppercase'>
                    Current Rate : {sliderValue}₹</Heading>
                <Slider
                    w='50%'
                    id='slider'
                    defaultValue={5}
                    min={0}
                    mt={3}
                    max={100}
                    colorScheme='teal'
                    onChange={(v) => setSliderValue(v)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                        25₹
                    </SliderMark>
                    <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                        50₹
                    </SliderMark>
                    <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                        75₹
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                        hasArrow
                        bg='teal.500'
                        color='white'
                        placement='top'
                        isOpen={showTooltip}
                        label={`${sliderValue}₹`}
                    >
                        <SliderThumb />
                    </Tooltip>
                </Slider>
            </CardBody>
        </Card>

    )
}

export default SetRates