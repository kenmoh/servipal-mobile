import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    ScrollView,
} from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface AccordionProps {
    tabs: {
        title: string;
        content: React.ReactNode;
    }[];
}

const HorizontalAccordion = ({ tabs }: AccordionProps) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const toggleTab = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveTab(index);
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.tabHeader,
                            activeTab === index && styles.activeTabHeader,
                        ]}
                        onPress={() => toggleTab(index)}
                    >
                        <Text style={[
                            styles.tabHeaderText,
                            activeTab === index && styles.activeTabHeaderText
                        ]}>
                            {tab.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.contentContainer}>
                {tabs[activeTab].content}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    tabsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    tabHeader: {
        padding: 15,
        backgroundColor: '#e0e0e0',
        marginRight: 1,
    },
    activeTabHeader: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 2,
        borderBottomColor: '#007AFF',
    },
    tabHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    activeTabHeaderText: {
        color: '#007AFF',
    },
    contentContainer: {
        padding: 15,
        backgroundColor: '#ffffff',
    },
});

export default HorizontalAccordion;