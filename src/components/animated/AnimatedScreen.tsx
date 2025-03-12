import React, { ReactNode, useEffect, useRef } from "react";
import { View, StyleSheet, SafeAreaView, Animated, Image } from "react-native";
import theme from "../../theme/theme";
import { RegisterHeader } from "../header/RegisterHeader";

type AnimatedBackgroundProps = {
  children: ReactNode;
  showAnimation?: boolean;
  onAnimationComplete?: () => void;
  showHeader?: boolean;
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  showAnimation = false,
  onAnimationComplete,
  showHeader = true,
}) => {
  const topPositionAnim = useRef(new Animated.Value(0)).current;
  const bottomPositionAnim = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;

  const topScaleX = useRef(new Animated.Value(1)).current;
  const bottomScaleX = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showAnimation) {
      topPositionAnim.setValue(0);
      bottomPositionAnim.setValue(0);
      iconOpacity.setValue(0);
      topScaleX.setValue(1);
      bottomScaleX.setValue(1);

      Animated.sequence([
        Animated.parallel([
          Animated.timing(topPositionAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(bottomPositionAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(topScaleX, {
            toValue: 400 / 350,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bottomScaleX, {
            toValue: 450 / 350,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      });
    }
  }, [showAnimation]);

  const topDecorationTransform = [
    { rotate: "315deg" },
    {
      translateY: topPositionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-150, -50],
      }),
    },
    { scaleX: topScaleX },
  ];

  const bottomDecorationTransform = [
    { rotate: "315deg" },
    {
      translateY: bottomPositionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0],
      }),
    },
    { scaleX: bottomScaleX },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {!showAnimation && showHeader && <RegisterHeader />}
      <Animated.View
        style={[
          styles.topDecoration,
          {
            transform: topDecorationTransform,
          },
        ]}
      />
      <View style={styles.content}>{children}</View>
      <Animated.View
        style={[
          styles.bottomDecoration,
          {
            transform: bottomDecorationTransform,
          },
        ]}
      />
      {showAnimation && (
        <Animated.View style={[styles.iconContainer, { opacity: iconOpacity }]}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            source={require("../../../assets/images/icon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginHorizontal: 32,
  },
  topDecoration: {
    position: "absolute",
    top: -5,
    left: -30,
    width: 350,
    height: 300,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    zIndex: 0,
    opacity: 0.2,
  },
  bottomDecoration: {
    position: "absolute",
    bottom: -5,
    right: -30,
    width: 350,
    height: 300,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    zIndex: 0,
    opacity: 0.2,
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  icon: {
    width: 80,
    height: 80,
  },
});
