import React, {useRef, useState, useEffect, FC} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {getValue, fontSizeKey, scrollingSpeedKey} from '../helpers';
import Slider from '@react-native-community/slider';
import { Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({

  scrollView: {
    // backgroundColor: MainColor,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00000080',
    marginBottom: 5,
    marginTop: 10,
    marginHorizontal: "40%",
    borderRadius: 30
  },
  buttonText: {color: '#fffb00', fontSize: 20},
});


const PrompterContainer = (props) => {
  const {t, i18n} = useTranslation();

  console.log(props)
  const MainColor = props.color;

  const refContainer = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const [fontSize, setFontSize] = useState(props.fontSize);
  const [scrollSpeed, setScrollSpeed] = useState(props.scrollSpeed);

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
      color: MainColor,
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
      <View 
        style={{ position: 'absolute', top: "50%",  zIndex: 100}}
        accessibilityLabel={t("translation.text-size")}
      >
        <View style={{width: 150, height: 40, position: 'absolute', left: -40, zIndex: 100, transform: [{ rotate: '-90deg' }]}}>
          <Slider
          accessibilityLabel={t("translation.text-size")}
            minimumValue={30}
            maximumValue={100}
            minimumTrackTintColor={MainColor}
            maximumTrackTintColor={MainColor}
            onValueChange={(props) => setFontSize(props)}
            value={props.fontSize}
          />
        </View>
          <Icon
            style={{width: 50, height: 150, position: 'relative', top: 100, left: 10}}
            name={"format-size"}
            type='material'
            color={MainColor}
            size={30}
          />
        </View>
        <View 
          style={{ position: 'absolute', top: "50%",right: 0,  zIndex: 100}}
        >
          <View style={{width: 150, height: 40, position: 'absolute', right: -40, zIndex: 100, transform: [{ rotate: '-90deg' }]}}>
            <Slider
              accessibilityLabel={t("translation.scroll-speed")}
              minimumValue={10}
              maximumValue={150}
              minimumTrackTintColor={MainColor}
              maximumTrackTintColor={MainColor}
              onValueChange={(props) => setScrollSpeed(props)}
              value={props.scrollSpeed}
            />
          </View>
          <Icon
            style={{width: 50, height: 150, position: 'relative', top: 100, right: 10}}
            name={"speed"}
            type='material'
            color={MainColor}
            size={30}
          />
        </View>
      <ScrollView
        ref={refContainer}
        onScroll={handleScroll}
        scrollEventThrottle={scrollSpeed / 2}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Text style={textStyle()} >{props.text}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsScrolling(!isScrolling)}>
        <Text style={styles.buttonText}>{isScrolling ? t("translation.pause-scrolling") : t("translation.play-scrolling")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PrompterContainer