import React, {useRef, useState, useEffect, FC} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from 'react-native';
import {getValue, fontSizeKey, scrollingSpeedKey} from '../helpers';

const styles = StyleSheet.create({

  scrollView: {
    // backgroundColor: '#000000',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 0,
  },
  buttonText: {color: '#fffb00', fontSize: 20},
});


const PrompterContainer = (props) => {
  const refContainer = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const [fontSize, setFontSize] = useState(30);
  const [scrollSpeed, setScrollSpeed] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      const defaultFontSize = await getValue(fontSizeKey);
      if (defaultFontSize !== null) {
        setFontSize(parseInt(defaultFontSize, 10));
      }
      const defaultScrollingSpeed = await getValue(scrollingSpeedKey);
      if (defaultScrollingSpeed !== null) {
        setScrollSpeed(parseInt(defaultScrollingSpeed, 10));
      }
    };
    fetchData();
  }, []);

  const textStyle = () => {
    return {
      transform: [{rotateY: '180deg'}],
      color: '#ffffff',
      fontSize,
      textAlign: 'center'
    };
  };

  let scrollOffset = 0;

  const scroll = () => {
    refContainer.current?.scrollTo({
      x: 0,
      y: scrollOffset + scrollSpeed,
      animated: true,
    });
  };

  useEffect(() => {
    if (isScrolling) {
      const interval = setInterval(() => {
        scroll();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isScrolling]);

  const handleScroll = (event) => {
    scrollOffset = event.nativeEvent.contentOffset.y;
  };
  return (
    <SafeAreaView style={props.style}>
      <ScrollView
        ref={refContainer}
        onScroll={handleScroll}
        scrollEventThrottle={scrollSpeed / 2}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Text style={textStyle()}>{"gtrefg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdafg\ntrf\nrewdadfvfvfvfv"}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsScrolling(!isScrolling)}>
        <Text style={styles.buttonText}>{isScrolling ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PrompterContainer