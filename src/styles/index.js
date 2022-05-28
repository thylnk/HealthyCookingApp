'use strict';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F2ED',
  },

  baseText: {
    fontSize: 20,
  },

  btnIcon: {
    width: 160,
    height: 60,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FF9A00',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 4,
    borderRadius: 50,
  },


  btnPrimary: {
    width: 120,
    height: 50,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9A00',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    borderRadius: 50,
  }

});