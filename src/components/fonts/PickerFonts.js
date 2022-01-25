import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import * as Font from 'expo-font'
import {Picker} from '@react-native-picker/picker';

class PickerFoolsErrand extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'FoolsErrand': require('../../../assets/fonts/FoolsErrand.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Picker style={[styles.FoolsErrand, styleProps]} {...allProps}>
                        {this.props.children}
                    </Picker>
                
            )
    }
}

class PickerMuseo900 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Museo900': require('../../../assets/fonts/Museo900-Bold.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Picker style={[styles.Museo900, styleProps]} {...allProps}>
                        {this.props.children}
                    </Picker>
                
            )
    }
}

class PickerMuseo700 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Museo700': require('../../../assets/fonts/Museo700-Bold.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Picker style={[styles.Museo700, styleProps]} {...allProps}>
                        {this.props.children}
                    </Picker>
                
            )
    }
}

class PickerMuseo500 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Museo500': require('../../../assets/fonts/Museo500-Regular.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Picker style={[styles.Museo500, styleProps]} {...allProps} >
                        {this.props.children}
                    </Picker>
                
            )
    }
}

class PickerMuseo300 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Museo300': require('../../../assets/fonts/Museo300-Regular.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Picker style={[styles.Museo300, styleProps]} {...allProps}>
                        {this.props.children}
                    </Picker>
                
            )
    }
}

class PickerMuseo100 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Museo100': require('../../../assets/fonts/Museo100-Regular.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Picker style={[styles.Museo100, styleProps]} {...allProps}>
                        {this.props.children}
                    </Picker>
                
            )
    }
}


const styles = StyleSheet.create({
    FoolsErrand: {
        fontFamily: 'FoolsErrand'
    },
    Museo900: {
        fontFamily: 'Museo900'
    },
    Museo700: {
        fontFamily: 'Museo700'
    },
    Museo500: {
        fontFamily: 'Museo500'
    },
    Museo300: {
        fontFamily: 'Museo300'
    },
    Museo100: {
        fontFamily: 'Museo100'
    },
})

export { PickerMuseo100, PickerMuseo300, PickerMuseo500, PickerMuseo700, PickerMuseo900, PickerFoolsErrand, Picker }