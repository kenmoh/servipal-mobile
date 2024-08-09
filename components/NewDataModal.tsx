import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';

interface NewDataModalProps {
    visible: boolean;
    newDataCount: number;
    onPress: () => void;
}

const NewDataModal: React.FC<NewDataModalProps> = ({ visible, newDataCount, onPress }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(-50);

    useEffect(() => {
        if (visible) {
            opacity.value = withTiming(1, { duration: 500, easing: Easing.ease });
            translateY.value = withTiming(0, { duration: 500, easing: Easing.ease });
        } else {
            opacity.value = withTiming(0, { duration: 500, easing: Easing.ease });
            translateY.value = withTiming(-50, { duration: 500, easing: Easing.ease });
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <TouchableOpacity style={styles.content} onPress={onPress}>
                <Text style={styles.text}>
                    {newDataCount} new item{newDataCount !== 1 ? 's' : ''} available
                </Text>
                <Text style={styles.subText}>Tap to refresh</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#007AFF',
        padding: 10,
        zIndex: 1000,
    },
    content: {
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subText: {
        color: 'white',
        fontSize: 14,
    },
});

export default NewDataModal;