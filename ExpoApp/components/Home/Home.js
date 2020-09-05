import React from 'react';
import { Image, Text, View, StyleSheet, Animated, Easing } from 'react-native';
import { Icon } from 'react-native-elements';

const Home = (props) => {
  // useEffect(() => {
  //   props.hideCart();
  // });

  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true, // To make use of native driver for performance
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const styles = StyleSheet.create({
    pokeball: {
      height: 100,
      width: 100,
      alignSelf: 'center',
      transform: [{ rotate: spin }],
    },

    quote: {
      padding: 60,
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
    },

    image: {
      height: 400,
      width: 400,
    },

    home: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
    },

    description: {
      fontFamily: 'Roboto, serif',
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
    },
  });

  return (
    <View style={styles.home}>
      <Animated.Image
        style={styles.pokeball}
        source={require('../../assets/pokeball.png')}
      />
      <View style={styles.quote}>
        <Icon type={'font-awesome'} name={'quote-left'} />
        <Text className={styles.description}>
          Pick your favorite pokemon, add them to your cart and they will be
          delivered to you, all free !!!
        </Text>
        <Icon type={'font-awesome'} name={'quote-right'} />
      </View>
      <Image
        source={{
          uri:
            'https://www.freepngimg.com/thumb/pokemon/37470-6-pikachu-transparent-background.png',
        }}
        style={styles.image}
      />
    </View>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     hideCart: () => dispatch(hideCart()),
//   };
// };

// Home.propTypes = {
//   hideCart: PropTypes.func,
// };

// export default Section(connect(null, mapDispatchToProps)(Home));

export default Home;
