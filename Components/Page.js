import React, { Component } from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { Formik } from 'formik';
import * as Yup from 'yup';

const screenWidth = Dimensions.get('screen').width;

const validationSchema = Yup.object().shape({
  fileName: Yup.string().required('File name is required'),
  filePath: Yup.string().required('Folder name is required'),
});

const styles = StyleSheet.create({
  // ... (keep the existing styles)
});

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      isStopButtonDisabled: true,
      recordTime: '00:00:00',
      filetempPath: '',
      isConfirmationModalVisible: false,
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1);
  }

  componentDidMount() {
    this.setState({ isConfirmationModalVisible: true });
  }

  componentWillUnmount() {
    this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
  }

  onStartRecord = async () => {
    // ... (keep the existing logic for permissions and starting the recorder)

    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition)
        ),
      });
    }).then(result => {
      this.setState({ filetempPath: result });
    }).catch(error => {
      console.error('Error starting recorder:', error);
    });
  };

  onStopRecord = async () => {
    // ... (keep the existing logic for stopping the recorder)
  };

  hideConfirmationModal = () => {
    this.setState({ isConfirmationModalVisible: false });
  };

  handleConfirm = async (values) => {
    // ... (update the file management logic with proper error handling)
  };

  render() {
    return (
      <View style={styles.container}>
        {/* ... (keep the existing rendering logic) */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isConfirmationModalVisible}
          onRequestClose={this.hideConfirmationModal}
        >
          <View style={styles.modalBackground}>
            <Formik
              initialValues={{ fileName: '', filePath: '' }}
              onSubmit={this.handleConfirm}
              validationSchema={validationSchema}
            >
              {/* ... (update the Formik form rendering with validation errors) */}
            </Formik>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Page;
