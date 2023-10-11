import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, TouchableOpacity  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';


const {width, height} = Dimensions.get('screen');



const bgs = ['#20bf6b', '#20bf6b', '#20bf6b', '#20bf6b', '#20bf6b'];
const DATA = [
  {
    "key": "3571572",
    "title": "COMMENT UTILISER MOVA",
    "description": "Dites-nous quoi, où et quand vous avez besoin d'aide, chosissez un ou deux assistants et obtenez un prix d'avance.",
    "source": require('../assets/images/couch.png')
  },
  { 
    "key": "3571747",
    "title": "COMMANDER UNE MOVA",
    "description": "Dites-nous quoi, où et quand vous avez besoin d'aide, chosissez un ou deux assistants et obtenez un prix d'avance.",
    "source": require('../assets/images/couch.png')
  },
  {
    "key": "3571603",
    "title": "CONFIANCE ET SÉCURITÉ",
    "description": "Tous nos chauffeurs sont des professionels du domaine, qui ont passé par un processus selectif.",
    "source": require('../assets/images/couch.png')
  },
  {
    "key": "3571606",
    "title": "ASSISTANTS À LA DEMANDE",
    "description": "Vous pouvez désormais réserver des assistants pour vos taches lourdes, et arrivent jusqu'à chez vous.",
    "source": require('../assets/images/couch.png')
  },
  {
    "key": "3571601",
    "title": "PAYEZ, ET ÉVALUEZ",
    "description": "Payez, évaluer et laisser même un pourboire à votre chauffeur ou assistant, une fois la commande est terminée.",
    "source": require('../assets/images/couch.png')
  }
]


const LoginButton = ({navigation}) =>{
  
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
            <View style={{ flex: 0.2, marginTop: 10 }}>
              <LoginButton navigation={navigation} />
            </View>
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