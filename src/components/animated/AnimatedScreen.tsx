import React, { ReactNode, useEffect, useRef } from "react";
import { View, StyleSheet, SafeAreaView, Animated, Image } from "react-native";
import theme from "../../theme/theme";
import { RegisterHeader } from "../header/RegisterHeader";

type AnimatedBackgroundProps = {
  children: ReactNode;
  showAnimation?: boolean;
  onAnimationComplete?: () => void;
};

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  showAnimation = false,
  onAnimationComplete,
}) => {
  const topDecorationAnim = useRef(new Animated.Value(0)).current;
  const bottomDecorationAnim = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showAnimation) {
      topDecorationAnim.setValue(0);
      bottomDecorationAnim.setValue(0);
      iconOpacity.setValue(0);

      Animated.sequence([
        Animated.parallel([
          Animated.timing(topDecorationAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(bottomDecorationAnim, {
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
      translateY: topDecorationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-150, -50],
      }),
    },
  ];

  const bottomDecorationTransform = [
    { rotate: "315deg" },
    {
      translateY: bottomDecorationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0],
      }),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {!showAnimation && <RegisterHeader />}
      <Animated.View
        style={[styles.topDecoration, { transform: topDecorationTransform }]}
      />
      <View style={styles.content}>{children}</View>
      <Animated.View
        style={[
          styles.bottomDecoration,
          { transform: bottomDecorationTransform },
        ]}
      />
      {showAnimation && (
        <Animated.View style={[styles.iconContainer, { opacity: iconOpacity }]}>
          <Image
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
    top: -40,
    left: -100,
    width: 450,
    height: 300,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.big,
    zIndex: 0,
    opacity: 0.2,
  },
  bottomDecoration: {
    position: "absolute",
    bottom: -70,
    right: -160,
    width: 450,
    height: 300,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.big,
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
