import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import colors from '../Colors';
import {AntDesign} from '@expo/vector-icons'
import tempData from '../tempData'
import TodoList from '../components/TodoList';
import { useState, useEffect } from 'react';
import AddListModal from '../components/AddListModal';

export default  App = () => {

  const [addTodoVisible, setAddTodoVisible] = useState(false)
  const [lists, setLists] = useState(tempData)

  const toggleAddTodoVisible = () => {
    setAddTodoVisible((addTodoVisible) => !addTodoVisible)
  }

  const renderList = list => {
    return(
        <TodoList list={list} updateList={updateList} />
    )
  }

  const addList = list => {
    setLists([...lists, {...list, id:lists.length + 1, todos:[] }])
  }

  const updateList = list => {
   
    setLists( lists.map(item => {
        return item.id === list.id ? list : item
    }))
  }
  
  return (
    <View style={styles.container}>

        <Modal 
            animationType='slide' 
            visible={addTodoVisible}
            onRequestClose={() => toggleAddTodoVisible()}
        >
            <AddListModal closeModal={toggleAddTodoVisible} addList={addList} />
      </Modal>

      <View style={{flexDirection: 'row'}}>
        <View style={ styles.divider}/>

        <Text style={styles.title}>
            Todo <Text style={{ fontWeight: '300', color: colors.blue }}>Lists</Text>
        </Text>        

        <View style={ styles.divider}/>
      </View>

      <View style={{marginVertical: 48}}>
        <TouchableOpacity style={styles.addList} onPress={() => toggleAddTodoVisible()}>
          <AntDesign name='plus' size={16} color={colors.blue}/>
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{height:275, paddingLeft:32}}>
        <FlatList 
            data={lists} 
            keyExtractor={item => item.name} 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem = {({item}) => renderList(item)}
            keyboardShouldPersistTaps='always'
        />
      </View>
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
  divider: {
    backgroundColor: colors.blue,
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },

  title:{
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal:64
  },

  addList:{
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding:16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  add:{

    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop:8
  }
});
