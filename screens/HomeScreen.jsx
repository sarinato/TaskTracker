import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { useContext } from 'react';
import colors from '../Colors';
import {AntDesign} from '@expo/vector-icons'
import TodoList from '../components/TodoList';
import { useState, useEffect } from 'react';
import AddListModal from '../components/AddListModal';
import { ThemeContext } from '../ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default  App = () => {

    const {lists, setLists} = useContext(ThemeContext);    

    const [addTodoVisible, setAddTodoVisible] = useState(false)

    const toggleAddTodoVisible = () => {
        setAddTodoVisible((addTodoVisible) => !addTodoVisible)
    }

    const renderList = list => {
        return(
            <TodoList list={list} updateList={updateList} />
        )
    }

    const addList = list => {
        let newData = [...lists, {...list, id:lists.length + 1, todos:[] }]
        persistDataToStorage(newData)
    }

    const updateList = list => {
    
        let newData = lists.map(item => {
            return item.id === list.id ? list : item
        })

        persistDataToStorage(newData)
    }


    const persistDataToStorage = async (newData) => {
    try {
            await AsyncStorage.setItem('storedData', JSON.stringify(newData));
            setLists(newData);

    } catch (error) {
            console.error('Error persisting data to AsyncStorage:', error);
        }
    };
    
    useEffect(() => {        
        const loadData = async () => {
            try {
                // Check if data has been stored before
                const storedData = await AsyncStorage.getItem('storedData');
            if (storedData !== null) {
                // Data exists, load it
                
                setLists(JSON.parse(storedData));
            } else {
                // Data doesn't exist, initialize and store it for the first time
                const initialData = lists;                
                persistDataToStorage(initialData);
            }
            } catch (error) {
            console.error('Error loading data from AsyncStorage:', error);
            }
        };

        loadData();
    }, []);
  
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
                Task <Text style={{ fontWeight: '300', color: colors.blue }}>Tracker</Text>
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
        paddingHorizontal:34
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
