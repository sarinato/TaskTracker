import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, KeyboardAvoidingView, TextInput, Keyboard, Animated } from 'react-native'
import React,{useState} from 'react'
import colors from '../Colors'
import {AntDesign, Ionicons} from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {GestureHandlerRootView} from "react-native-gesture-handler";

const ToDoModal = ({list, closeModal, updateList}) => {

    const [newTodo, setNewTodo] = useState('')

    const taskCount = list.todos.length
    const completedCount = list.todos.filter(todo => todo.completed).length

    const toggleTodoCompleted = index => {
        let updatedList = list;
        updatedList.todos[index].completed = !updatedList.todos[index].completed

        updateList(updatedList)
    }

    const addTodo = () => {
        let updatedList = list
        updatedList.todos.push({title: newTodo, completed:false})
        
        setNewTodo('') //Empty the input
        updateList(updatedList)

        

        Keyboard.dismiss()
    }

    const deleteTodo = index => {
        let updatedList = list
        list.todos.splice(index, 1)

        updateList(updatedList)
    }


    const renderTodo = (todo, index) => {
        return(
            <GestureHandlerRootView>
                <Swipeable renderRightActions={(_, dragX) => rightActions(dragX, index)}>
                    <View style={styles.todoContainer}>
                        <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
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
                </Swipeable>
            </GestureHandlerRootView>
        )
    }

    const rightActions = (dragX, index) => {
        return(
            <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Animated.View style={styles.deleteButton}>
                    <Animated.Text style={{color: colors.white, fontWeight:"800"}}>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    return (
        <KeyboardAvoidingView style={{flex:1}} behavior='padding'>
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

                <View style={[styles.section, {flex: 3, marginVertical:16}]}>
                    <FlatList 
                        data={list.todos} 
                        renderItem={({item, index}) => renderTodo(item, index)}
                        keyExtractor={item => item.title}                        
                        showsVerticalScrollIndicator={false}
                    >

                    </FlatList>
                </View>

                <View style={[styles.section, styles.footer]} behavior='padding'>
                    <TextInput style={[styles.input, {borderColor: list.color}]} onChangeText={text => setNewTodo(text) } value={newTodo}/>

                    <TouchableOpacity style={[styles.addTodo, {backgroundColor: list.color}]} onPress={addTodo}>
                        <AntDesign  name='plus' size={16} color={colors.white}/>
                    </TouchableOpacity>                
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
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
        alignSelf:'stretch'
    },
    header:{
        justifyContent:'flex-end',
        marginLeft: 64,
        borderBottomWidth:3,
        paddingTop:16
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
        alignItems:'center',
        paddingVertical: 16
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
        alignItems: 'center',
        paddingLeft: 32
    },
    todo:{
        color: colors.black,
        fontWeight: '700',
        fontSize: 16
    },
    deleteButton:{
        flex:1,
        backgroundColor: colors.red,
        justifyContent:'center',
        alignItems:'center',
        width: 80
    }
})