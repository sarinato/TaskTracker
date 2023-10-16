import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity,TextInput } from 'react-native'
import React,{useState} from 'react'
import {AntDesign} from '@expo/vector-icons'
import colors from '../Colors'
import tempData from '../tempData'


const AddListModal = ({closeModal, addList}) => {

    const backgroundColors = [
        '#FF5733',  // Coral
        '#3498DB',  // Dodger Blue
        '#2ECC71',  // Emerald
        '#E74C3C',  // Alizarin Crimson
        '#9B59B6',  // Amethyst
        '#F39C12',  // Orange
        '#1ABC9C'   // Turquoise
      ];

    const [name, setName] = useState('');
    const [color, setColor] = useState(backgroundColors[0]);

    const createTodo = () => {

        const list = {name, color}
        addList(list)

        closeModal()
    }

    const renderColors = () => {
        return(
            backgroundColors.map((color, index) => (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, {backgroundColor:color}]}
                    onPress={() => setColor(color)}
                >
                    
                </TouchableOpacity>
            ))
        )
    }

    return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <TouchableOpacity style={{position: 'absolute', top:64, right:32}} onPress={closeModal}>
            <AntDesign name='close' size={24} color={colors.black} />
        </TouchableOpacity> 

        <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
            <Text style={styles.title}>Create ToDO List</Text>

            <TextInput style={styles.input}  placeholderTextColor={colors.gray} placeholder='List Name ?' onChangeText={text => setName(text)} />

            <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 12}}>
                {renderColors()} 
            </View>

            <TouchableOpacity style={[styles.create, {backgroundColor: color}]} onPress={createTodo} >
                <Text style={{color: colors.white, fontWeight: '600'}}>Create!</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    )
    }

export default AddListModal

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize: 28,
        fontWeight: '800',
        color: colors.black,
        alignSelf: 'center',
        marginBottom: 16
    },
    input:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height:50,
        marginTop:8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create:{
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems:'center',
        justifyContent:'center'

    },
    colorSelect:{
        width: 30,
        height:30,
        borderRadius: 4
    }

})