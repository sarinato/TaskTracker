import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
import React from 'react'
import colors from '../Colors'
import {AntDesign, Ionicons} from '@expo/vector-icons'

const ToDoModal = ({list, closeModal}) => {

    const taskCount = list.todos.length
    const completedCount = list.todos.filter(todo => todo.completed).length

    const renderTodo = (todo) => {
        return(
            <View style={styles.todoContainer}>
                <TouchableOpacity>
                    <Ionicons 
                        name={todo.completed ? 'ios-square' : 'ios-square-outline' }
                        size={24} 
                        color={colors.gray} 
                        style={{width:32}} 
                    />
                </TouchableOpacity>                

                <Text style={[styles.todo, {color:todo.completed ? colors.gray : colors.black, 
                    textDecorationLine: todo.completed ? 'line-through' : 'none'}]}>
                        {todo.title}
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{position: 'absolute', top:64, right:32, zIndex:10}} onPress={closeModal}>
                <AntDesign name='close' size={24} color={colors.black} />
            </TouchableOpacity>

            <View style={[styles.section, styles.header ,{borderBottomColor: list.color}]}>
                <View>
                    <Text style={styles.title}>{list.name}</Text>
                    <Text style={styles.taskCount}>
                        {completedCount} of {taskCount} Tasks
                    </Text>
                </View>

            </View>

            <View style={[styles.section, {flex: 3}]}>
                <FlatList 
                    data={list.todos} 
                    renderItem={({item}) => renderTodo(item)}
                    keyExtractor={item => item.title}
                    contentContainerStyle={{paddingHorizontal:32, paddingVertical:64}}
                    showsVerticalScrollIndicator={false}
                >

                </FlatList>
            </View>

            <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior='padding'>
                <TextInput style={[styles.input, {borderColor: list.color}]}/>

                <TouchableOpacity style={[styles.addTodo, {backgroundColor: list.color}]}>
                    <AntDesign  name='plus' size={16} color={colors.white}/>
                </TouchableOpacity>                
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ToDoModal

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    },
    section:{
        flex:1,
        alignSelf:'stretch'
    },
    header:{
        justifyContent:'flex-end',
        marginLeft: 64,
        borderBottomWidth:3
    },
    title:{
        fontSize:30,
        fontWeight:'800',
        color:colors.black
    },
    taskCount:{
        marginTop:4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight:'600'
    },
    footer:{
        paddingHorizontal: 32,
        flexDirection:'row',
        alignItems:'center'
    },
    input:{
        flex:1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius:6,
        marginRight:8,
        paddingHorizontal:8
    },
    addTodo:{
        borderRadius:4,
        padding:16,
        alignItems:'center',
        justifyContent:'center'
    },

    todoContainer:{
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todo:{
        color: colors.black,
        fontWeight: '700',
        fontSize: 16
    }
})