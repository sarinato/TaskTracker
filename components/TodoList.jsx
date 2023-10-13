import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import colors from '../Colors'
import ToDoModal from './ToDoModal'

const TodoList = ({list}) => {

    const [showListVisible, setShowListVisible] = useState(false)

    const toggleListModal = () => {
        setShowListVisible(showListVisible => !showListVisible)
    }

    const completedCount = list.todos.filter(todo => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    return (
    <View>
        <Modal 
            animationType='slide' 
            visible={showListVisible} 
            onRequestClose={toggleListModal}
        
        >
            <ToDoModal list={list} closeModal={toggleListModal}/>

        </Modal>

        <TouchableOpacity 
            style={[styles.listContainer, {backgroundColor: list.color}]}
            onPress={toggleListModal}
        >
            <Text style={styles.listTitle} numberOfLines={1}>
                {list.name}
            </Text>

            <View>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.count}>{remainingCount}</Text>
                    <Text style={styles.subtitle}>Remaining</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.count}>{completedCount}</Text>
                    <Text style={styles.subtitle}>Completed</Text>
                </View>
            </View>
        </TouchableOpacity>
    </View>
   
    )
}

export default TodoList

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 18
    },
    count:{
        fontSize: 48,
        fontWeight:'200',
        color: colors.white
    },
    subtitle:{
        fontSize:12,
        fontWeight: '700',
        color: colors.white
    }
})