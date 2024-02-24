import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import moment from 'moment';
const Table = () => {


    // const [time, setTime] = useState(0);
    // const [isTiming, setIsTiming] = useState(false);
    // const [isStopTiming, setIsStopTiming] = useState(false);
    // const [pausedTime, setPausedTime] = useState(0);

    // function toggerTimer() {
    //     setIsTiming((prev) => !prev);
    //     setIsStopTiming(false);
    // }
    // function resetTime() {
    //     setTime(null);
    //     setStartTime(null);
    //     setPausedTime(null);
    // }
    // function stopTiming() {
    //     setIsTiming(false);
    //     setIsStopTiming(true);
    // }

    // useEffect(() => {
    //     let interval;
    //     if (isTiming) {
    //         setTime(Date.now());
    //         if (!pausedTime) {
    //             setStartTime(Date.now());
    //         } else {
    //             setStartTime(Date.now() - pausedTime);
    //         }
    //         interval = setInterval(() => {
    //             setTime(Date.now());
    //         }, 10);
    //     } else if (!isTiming) {
    //         setPausedTime(Number(time) - Number(startTime));
    //     }
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [isTiming])
    // console.log(time);
    //---------------------------------------------
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapTime, setElapTime] = useState(0);

    const [saveTime, setSaveTime] = useState([])

    // useEffect(() => {
    //     let timer;
    //     if (isRunning) {
    //         timer = setInterval(() => {
    //             const now = new Date().getTime();
    //             setElapTime(now - startTime);
    //         }, 100);
    //     } else {
    //         clearInterval(timer);
    //     }
    //     return () => clearInterval(timer);
    // }, [isRunning, startTime]);
    useEffect(() => {
        let timer;
        const updateElapsedTime = () => {
            const now = new Date().getTime();
            setElapTime(now - startTime);
            timer = setTimeout(updateElapsedTime, 1);
        };
        if (isRunning) {
            updateElapsedTime();
        } else {
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [isRunning, startTime]);

    const handleRun = async () => {
        if (isRunning) {
            await setIsRunning(false);
            const now = new Date().getTime();
            setElapTime(now - startTime);
        } else {
            const now = new Date().getTime();
            setStartTime(now - elapTime);
            await setIsRunning(true);
        }
    };
    const handleResetTime = () => {
        setIsRunning(false)
        setElapTime(0)
        setSaveTime([])
    }
    const handleSaveTimeVA = () => {
        if (isRunning) {
            const currentElapsedTime = new Date().getTime() - startTime;
            const formattedTimeValue = formattedTime(currentElapsedTime);
            setSaveTime((prevSaveTime) => [
                ...prevSaveTime,
                { name: 'VA', value: formattedTimeValue },
            ]);
        }
    };
    console.log(saveTime);
    //Định dạng kiểu 00:00:00
    const formattedTime = (time) => {
        const minutes = format(time, "mm");
        const seconds = format(time, "ss");
        const milliseconds = format(time, "SS");
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <View style={{ height: '100%', backgroundColor: '#ffffff' }}>
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', height: 40, flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', fontWeight: 'bold', width: '50%', height: '100%', paddingHorizontal: 10, borderRightWidth: 2, borderColor: '#ffffff', backgroundColor: '#27a9ff', alignItems: 'center' }}><Text style={{ color: '#ffffff', fontWeight: 'bold' }}>NVA</Text></View>
                    <View style={{ justifyContent: 'center', fontWeight: 'bold', width: '50%', height: '100%', paddingHorizontal: 10, borderRightWidth: 2, borderColor: '#ffffff', backgroundColor: '#27a9ff', alignItems: 'center' }}><Text style={{ color: '#ffffff', fontWeight: 'bold' }}>VA</Text></View>
                </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <View style={{ height: 400, flexDirection: 'column', marginTop: 2, width: '50%' }}>
                            {saveTime.map((value, index) => {
                                return (
                                    <View key={index} style={{ marginTop: 1, justifyContent: 'center', fontWeight: 'bold', height: 40, width: '100%', paddingHorizontal: 10, borderRightWidth: 2, borderColor: '#ffffff', backgroundColor: '#d1d1d1', alignItems: 'center' }}><Text style={{ color: '#202020', fontWeight: 'bold' }}>{formattedTime(value)}</Text></View>
                                )
                            })}
                        </View> */}
                        {/* <View style={{ height: 400, flexDirection: 'column', marginTop: 2, width: '50%' }}>
                            {saveTimeVA.map((value, index) => {
                                return (
                                    <View key={index} style={{ marginTop: 1, justifyContent: 'center', fontWeight: 'bold', height: 40, width: '100%', paddingHorizontal: 10, borderRightWidth: 2, borderColor: '#ffffff', backgroundColor: '#d1d1d1', alignItems: 'center' }}><Text style={{ color: '#202020', fontWeight: 'bold' }}>{formattedTime(value)}</Text></View>
                                )
                            })}
                        </View> */}

                    </View>
                </ScrollView>
            </View >
            <View style={{ height: 500 }}>
                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 36 }}>{formattedTime(elapTime)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, gap: 10 }}>
                    <View>
                        <TouchableOpacity onPress={() => handleRun()} style={{ backgroundColor: '#d1d1d1', padding: 5, borderRadius: 5, width: 50 }}>
                            <Text style={{ textAlign: 'center' }}>{!isRunning ? "Chạy" : "Dừng"}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View><TouchableOpacity onPress={handleSaveTimeNVA} style={{ backgroundColor: '#d1d1d1', padding: 5, borderRadius: 5, width: 50 }}><Text style={{ textAlign: 'center' }}>NVA</Text></TouchableOpacity></View> */}
                    <View><TouchableOpacity onPress={handleSaveTimeVA} style={{ backgroundColor: '#d1d1d1', padding: 5, borderRadius: 5, width: 50 }}><Text style={{ textAlign: 'center' }}>VA</Text></TouchableOpacity></View>
                    <View><TouchableOpacity onPress={handleResetTime} style={{ backgroundColor: '#d1d1d1', padding: 5, borderRadius: 5, width: 50 }}><Text style={{ textAlign: 'center' }}>Reset</Text></TouchableOpacity></View>
                </View>
            </View>
        </View >
    )
}

export default Table