import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [time, setTime] = useState('00:00:00');
  const [lastTime, setLastTime] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  const go = () => {
    if (timer) {
      setIsStarted(false);
      clearInterval(timer);
      timer = null;
      return;
    }

    setIsStarted(true);

    timer = setInterval(() => {
      ss += 1;

      if (ss === 60) {
        ss = 0;
        mm += 1;
      }

      if (mm === 60) {
        mm = 0;
        hh += 1;
      }

      const format = `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${
        ss < 10 ? `0${ss}` : ss
      }`;

      setTime(format);
    }, 1000);
  };

  const clear = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    setLastTime(time);

    setTime('00:00:00');
    ss = 0;
    mm = 0;
    hh = 0;
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./src/images/crono.png')} />
      <Text style={styles.timer}>{time}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={go}>
          <Text style={styles.buttonText}>
            {isStarted ? 'PARAR' : 'INICIAR'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clear}>
          <Text style={styles.buttonText}>ZERAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lastTimeContainer}>
        <Text style={styles.lastTimeText}>
          {lastTime ? `Último tempo: ${lastTime}` : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111213',
  },
  timer: {
    fontSize: 45,
    color: '#fff',
    marginTop: -160,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111213',
  },
  lastTimeContainer: {
    marginTop: 40,
  },
  lastTimeText: {
    fontSize: 23,
    color: '#fff',
    fontStyle: 'italic',
  },
});
