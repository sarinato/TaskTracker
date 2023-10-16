import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, TouchableOpacity  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';


const {width, height} = Dimensions.get('screen');



const bgs = ['#24A6D9', '#24A6D9', '#24A6D9', '#24A6D9', '#24A6D9'];
const DATA = [
  {
    "key": "3571572",
    "title": "Task Tracker",
    "description": "Effortlessly manage your daily tasks and to-do list for enhanced productivity",
    "source": require('../assets/images/slide1.png')
  },
  { 
    "key": "3571747",
    "title": "Quick Tasks",
    "description": "Stay organized and focused. Easily track your tasks, set priorities, and accomplish more throughout the day.",
    "source": require('../assets/images/slide2.png')
  },
  {
    "key": "3571603",
    "title": "Easy Productivity",
    "description": "A straightforward app to manage tasks effortlessly. Enhance your daily routine and achieve your goals with ease.",
    "source": require('../assets/images/slide3.png')
  },
]


const GetStarted = ({navigation}) =>{
  
  return(
  <TouchableOpacity
      onPress={()=>navigation.navigate('Home')}
      style={{flex:1,alignItems:'center', justifyContent: 'center',}}
  >
      <View style={{width:120, height:50}}>
          <LinearGradient
              style={{flex:1, alignItems:'center', justifyContent: 'center',borderRadius:20,flexDirection:'row'}}
              colors={["#FFF","#FFF"]}
              start={{x:0, y:0}}
              end={{x:0, y:1}}              
          >                                           
            <Text>Get Started</Text>
            <AntDesign name="arrowright" size={24} color="black" />         
          </LinearGradient>
      </View>            
  </TouchableOpacity>    
  )
}


const Indicator = ({scrollX}) => {
  return( 
  <View style={{position:'absolute', bottom:50 ,flexDirection:'row'}}>
    {DATA.map((_, i)=>{
      const inputRange =  [(i-1) * width, i * width, (i+1) * width ];
      const scale = scrollX.interpolate({
        inputRange,
        outputRange:[0.6, 1.4, 0.6],
        extrapolate: 'clamp'
      })
      return <Animated.View 
        key={`indicator-${i}`}
        style={{
          width:10,
          height:10,
          borderRadius:5,
          backgroundColor:'#333',
          margin:10,
          transform:[
            {
              scale,
            }            
          ]
        }}
      />
    })}
  </View>
  )
}

const BackDrop = ({scrollX}) => {  
  const backgroundColor = scrollX.interpolate({
    inputRange : bgs.map((_,i) => i * width),
    outputRange: bgs.map((bg)=> bg)
  })
  return <Animated.View 
    style={[{backgroundColor},StyleSheet.absoluteFillObject]}
  />
}

const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX,width), new Animated.Value(width)),1
  );
  const rotate = YOLO.interpolate({
    inputRange:[0, 0.5, 1],
    outputRange:['35deg', '0deg', "35deg"]
  })

  const translateX = YOLO.interpolate({
    inputRange:[0, 0.5, 1],
    outputRange:[0, -height, 0]
  })
  return(
    <Animated.View
      style={{
        height:height,
        width:height,
        backgroundColor:"#FFF",
        borderRadius:86,
        position:'absolute',
        top:-height * 0.68,
        left:-height * 0.3,
        transform:[
          {
            rotate          
          },
          {
            translateX
          }
        ]
      }}
    />
  )
}

export default function IntroScreen({navigation}) {
  const scrollX = React.useRef(new Animated.Value(0)).current
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX}/>
      <Animated.FlatList
        scrollEventThrottle={32}
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        contentContainerStyle={{paddingBottom:100}}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset:{x: scrollX}}}],
          {useNativeDriver:false}
        )}
        renderItem={({item,index})=>{
          return(
            <View style={{ width, alignItems: 'center', padding: 20 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={item.source} />
            </View>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
              <Text style={{ color: "#FFF", fontWeight: '800', fontSize: 28, fontFamily: 'Poppins-SemiBold', textAlign:'center' }}>{item.title}</Text>
              <Text style={{ fontWeight: '300', color: "#FFF", fontFamily: 'Poppins-Regular', fontSize: 16, textAlign:'center' }}>{item.description}</Text>
            </View>
            {index===2 &&<View style={{ flex: 0.2, marginTop: 10 }}>
              <GetStarted navigation={navigation} />
            </View>}
          </View>
          
          )
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});